## Cómo ejecutar en entorno local

Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo local:

1.  **Clona el repositorio (si aún no lo has hecho):**
    ```bash
    git clone https://github.com/IsaacNavarro-0206/to-do-list-frontend.git
    cd to-do-list-frontend
    ```

2.  **Instala las dependencias:**
    Asegúrate de tener Node.js y npm (o yarn) instalados. Luego, ejecuta:
    ```bash
    npm install
    ```
    o si usas yarn:
    ```bash
    yarn install
    ```

3.  **Inicia el servidor de desarrollo:**
    Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con Vite:
    ```bash
    npm run dev
    ```
    o si usas yarn:
    ```bash
    yarn dev
    ```
    Esto iniciará la aplicación en modo de desarrollo, generalmente en `http://localhost:5173` (la URL exacta se mostrará en la consola).

    **Nota Importante:** La URL de la API se configura mediante una variable de entorno llamada `VITE_API_URL`. Debes crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
    ```
    VITE_API_URL=http://localhost:4000/dev
    ```
    Asegúrate de que esta URL coincida con la dirección donde se está ejecutando tu backend.

