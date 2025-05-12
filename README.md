## Cómo ejecutar en entorno local

### Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

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

3.  **Configuración de variables de entorno:**

    - Crea un archivo `.env` en la raíz del proyecto
    - Agrega la siguiente variable:
      ```
      VITE_API_URL=http://localhost:4000/dev
      ```
    - Asegúrate de que esta URL coincida con la dirección donde se está ejecutando tu backend

4.  **Inicia el servidor de desarrollo:**
    Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con Vite:
    ```bash
    npm run dev
    ```
    o si usas yarn:
    ```bash
    yarn dev
    ```
    Esto iniciará la aplicación en modo de desarrollo, generalmente en `http://localhost:5173` (la URL exacta se mostrará en la consola).

### Solución de problemas comunes

- **Error de conexión a la API:** Verifica que el backend esté corriendo en la URL especificada en `.env`
- **Error de dependencias:** Si hay problemas al instalar, intenta borrar `node_modules` y ejecutar `npm install` nuevamente

### Estructura del proyecto

- `/src`: Código fuente
- `/public`: Archivos estáticos
- `/src/components`: Componentes de React
- `/src/pages`: Vistas principales

### Comandos adicionales

- **Build para producción:**
  ```bash
  npm run build
  ```
