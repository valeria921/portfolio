# Stage 1: Build React
FROM node:18-alpine AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=256"
ENV GENERATE_SOURCEMAP=false
ENV CI=false

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
