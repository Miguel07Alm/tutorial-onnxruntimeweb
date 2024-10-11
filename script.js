const input = document.getElementById('upload');
const imgElement = document.getElementById('inputImage');

input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imgElement.src = reader.result;
  };
  reader.readAsDataURL(file);
});

async function loadImageAndPreprocessFromElement() {
  const width = 224;
  const height = 224;
  const channels = 3;

  const image = document.getElementById('inputImage');

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const pixelData = imageData.data;

  let minValue = Infinity;
  let maxValue = -Infinity;
  for (let i = 0; i < pixelData.length; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];
    minValue = Math.min(minValue, r, g, b);
    maxValue = Math.max(maxValue, r, g, b);
  }

  const rgbArray = new Uint8Array(pixelData.length / 4 * channels);
  const range = maxValue - minValue;
  for (let i = 0, j = 0; i < pixelData.length; i += 4, j += 3) {
    rgbArray[j] = Math.round(((pixelData[i] - minValue) / range) * 255); // R
    rgbArray[j + 1] = Math.round(((pixelData[i + 1] - minValue) / range) * 255); // G
    rgbArray[j + 2] = Math.round(((pixelData[i + 2] - minValue) / range) * 255); // B
  }

  const transposedRgbArray = new Uint8Array(channels * width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < channels; c++) {
        const originalIndex = (y * width + x) * channels + c;
        const transposedIndex = c * width * height + y * width + x;
        transposedRgbArray[transposedIndex] = rgbArray[originalIndex];
      }
    }
  }

  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];

  const normalizedPixelData = new Float32Array(transposedRgbArray.length);
  for (let i = 0; i < transposedRgbArray.length; i++) {
    normalizedPixelData[i] =
      (transposedRgbArray[i] / 255.0 - mean[i % 3]) / std[i % 3];
  }

  return normalizedPixelData;
}

async function loadLabels() {
  const response = await fetch('categories_places365.txt');
  const text = await response.text();
  const lines = text.split('\n');
  const classes = lines.map(line => line.split(' ')[0].substring(3));
  return { classes };
}

function getPath(fileName) {
  return `./${fileName}`;
}

async function runModel() {
  function compareFn(a, b) {
    return b - a;
  }

  try {
    const modelPath = getPath('resnet.onnx');
    const { classes } = await loadLabels();

    const session = await ort.InferenceSession.create(modelPath);
    const inputInfo = session.inputNames[0];
    const outputInfo = session.outputNames[0];

    const input = await loadImageAndPreprocessFromElement();
    const inputTensor = new ort.Tensor('float32', input, [1, 3, 224, 224]);

    const feeds = {
      [inputInfo]: inputTensor,
    };

    const outputMap = await session.run(feeds);
    const probs = outputMap[outputInfo].data;

    const idx = {};
    for (let i = 0; i < classes.length; i++) {
      idx[probs[i].toString()] = classes[i];
    }

    const probsOrdered = [...probs].sort(compareFn);

    const result = {};
    for (let i = 0; i < 5; i++) {
      result[idx[probsOrdered[i].toString()]] = probsOrdered[i];
    }

    console.log(result);
    return result;
  } catch (e) {
    console.error('ERROR: ' + e);
  }
}

input.addEventListener('change', async () => {
  try {
    await runModel();
  } catch (err) {
    console.error(err);
  }
});