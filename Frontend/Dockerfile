# Usa una imagen base de Node para el entorno de desarrollo
FROM node:20 as BUILD_IMAGE

# Establece el directorio de trabajo en el contenedor
WORKDIR /app/react-app

# Copia los archivos de configuración de Vite (package.json, yarn.lock si usas Yarn)
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

RUN npm run build

FROM node:20 as PRODUCTION_IMAGE

WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
# Expone el puerto en el que Vite sirve la aplicación (5173)
EXPOSE 5173

COPY package.json .
COPY vite.config.ts .
RUN npm install typescript

EXPOSE 5173
# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "preview"]
