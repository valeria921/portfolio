# Stage 1: Build React
FROM node:18-alpine AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=256"
ENV GENERATE_SOURCEMAP=false
ENV CI=false

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund --prefer-offline --no-optional --production

COPY . .
RUN npm run build:ultra

# Stage 2: Nginx
FROM nginx:alpine

# Copy React build
COPY --from=build /app/build /usr/share/nginx/html

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
