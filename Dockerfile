# ===================================
# Binary-Brain | Dockerfile
# ===================================

# ── Etapa 1: Build ──
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar primero los manifiestos de dependencias (capa de caché)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el código fuente y hacer build
COPY . .
RUN npm run build

# ── Etapa 2: Servir con Nginx ──
FROM nginx:alpine AS production

# Configuración personalizada de nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar assets construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
