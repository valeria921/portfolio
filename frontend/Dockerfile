# frontend/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=256"
ENV GENERATE_SOURCEMAP=false
ENV CI=false

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund --prefer-offline --no-optional --production

COPY . .

# Build React
RUN npm run build:ultra

# Stage 2: Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
