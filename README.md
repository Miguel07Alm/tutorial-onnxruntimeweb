# Implementación de IA en el Navegador con ONNX Runtime Web

En este proyecto, aprenderás a implementar un modelo de inteligencia artificial (IA) en tu navegador usando ONNX Runtime Web. Utilizaremos el modelo **ResNet**, conocido por su capacidad para la clasificación de imágenes.

## ¿Qué Aprenderás?

- **Introducción a ONNX:** Descubre qué es ONNX y por qué es un formato clave para el intercambio de modelos de IA.
- **Configuración del Entorno:** Aprende a configurar tu entorno de desarrollo para trabajar con ONNX Runtime sin complicaciones.
- **Carga del Modelo ResNet:** Aprende a cargar el modelo ResNet en tu proyecto.
- **Preprocesamiento de Imágenes:** Cómo preparar imágenes para el modelo, incluyendo redimensionamiento y normalización.
- **Ejecutando Inferencias:** Ejecuta inferencias en imágenes y obtén resultados.
- **Visualización de Resultados:** Aprende a visualizar los resultados de la clasificación de manera clara.

## Requisitos Previos

Para ejecutar este proyecto de manera local, necesitarás lo siguiente:

- **Node.js** (opcional, si deseas usar `http-server` para servir la aplicación)
- Navegador moderno compatible con JavaScript
- Conexión a internet para descargar las bibliotecas de ONNX Runtime Web.

## Estructura del Proyecto

El proyecto incluye los siguientes archivos:

- `index.html`: Página principal que carga la interfaz del usuario.
- `categories_places365.txt`: Archivo que contiene las etiquetas de categorías para el modelo de clasificación.
- `README.md`: Este archivo, que explica cómo ejecutar el proyecto.
- `resnet.onnx`: El modelo preentrenado de ResNet para clasificación de imágenes.
- `script.js`: Contiene la lógica para cargar el modelo y ejecutar inferencias.

## Cómo Iniciar el Proyecto

### Opción 1: Servir la Web Localmente usando `http-server`

Si tienes `Node.js` instalado, puedes utilizar el paquete `http-server` para servir el proyecto localmente.

1. Instala `http-server` si no lo tienes:
    ```bash
    npm install -g http-server
    ```

2. Inicia el servidor en la carpeta del proyecto:
    ```bash
    http-server
    ```

3. Abre tu navegador y visita la dirección que te indica la consola, normalmente `http://127.0.0.1:8080`.

### Opción 2: Ejecutar Directamente en tu Navegador

Si prefieres no utilizar `http-server`, también puedes abrir el archivo `index.html` directamente en tu navegador. Para ello:

1. Navega a la carpeta del proyecto.
2. Haz doble clic en el archivo `index.html` para abrirlo en tu navegador.

### Pasos para Ejecutar el Proyecto

1. **Carga del Modelo**: El archivo `script.js` cargará el modelo ResNet (`resnet.onnx`) y preparará todo para su ejecución en el navegador.
2. **Selecciona una Imagen**: Usa el botón de carga de archivos para subir una imagen.
3. **Inferencia y Resultados**: El modelo clasificará la imagen subida y mostrará el resultado en pantalla.

## Visualización de Resultados

Cuando subas una imagen, la IA realizará una predicción de la clase a la que pertenece la imagen utilizando el modelo ResNet. La imagen será redimensionada y normalizada para cumplir con los requisitos del modelo.