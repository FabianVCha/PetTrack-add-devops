# =============================
# Etapa 1: Construcción del proyecto
# =============================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar e instalar dependencias (con cache inteligente)
COPY package*.json ./
RUN npm ci --silent

# Copiar el resto del código
COPY . .
# opción: instalar vite globalmente para evitar "vite: not found"
RUN npm install -g vite@latest
# Compilar el proyecto para producción
RUN npm run build

# =============================
# Etapa 2: Servir con Nginx
# =============================
FROM nginx:1.25-alpine

# Elimina archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos generados en la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
