# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Set very aggressive Node.js memory limits for 1GB server
ENV NODE_OPTIONS="--max-old-space-size=256"
ENV GENERATE_SOURCEMAP=false
ENV CI=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV FAST_REFRESH=false

# Copy package files first
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies with maximum optimization
RUN npm install --omit=dev --no-audit --no-fund --prefer-offline --no-optional --production

# Copy source code
COPY . .

# Build with maximum optimization
RUN npm run build:ultra

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 