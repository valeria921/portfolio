# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build

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