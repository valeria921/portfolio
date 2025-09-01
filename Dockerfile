# Stage 1: Build React app
FROM node:18-alpine AS react-builder

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --omit=dev --no-audit --no-fund --prefer-offline --no-optional --production

# Copy source code
COPY frontend/ .

# Build React app
RUN npm run build:ultra

# Stage 2: Python dependencies (using TensorFlow with Python 3.11)
FROM tensorflow/tensorflow:latest AS python-builder
 
# Create the app directory
RUN mkdir /app
 
# Set the working directory
WORKDIR /app
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Install Django dependencies (TensorFlow already included)
RUN pip install --upgrade pip 
COPY backend/requirements.txt /app/ 
# Remove tensorflow from requirements since it's in base image
RUN sed -i '/tensorflow==/d' requirements.txt && \
    sed -i '/keras==/d' requirements.txt && \
    pip install --no-cache-dir -r requirements.txt
 
# Stage 3: Production stage
FROM tensorflow/tensorflow:latest
 
RUN useradd -m -r appuser && \
   mkdir /app && \
   chown -R appuser /app
 
# Copy the Python dependencies from the builder stage
COPY --from=python-builder /usr/local/lib/python3.11/dist-packages/ /usr/local/lib/python3.11/dist-packages/
COPY --from=python-builder /usr/local/bin/ /usr/local/bin/
 
# Set the working directory
WORKDIR /app/backend
 
# Copy Django application code
COPY --chown=appuser:appuser backend/ .
 
# Copy React build from react-builder stage into a directory collected by Django
COPY --from=react-builder --chown=appuser:appuser /app/frontend/build /app/backend/reactbuild

# Copy media files to Nginx accessible location
RUN mkdir -p /var/www/media && chown -R appuser:appuser /var/www/media

# Ensure Django static root exists with proper permissions
RUN mkdir -p /app/backend/staticfiles && chown -R appuser:appuser /app/backend/staticfiles && chmod -R 755 /app/backend/staticfiles
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Switch to non-root user
USER appuser
 
# Expose the application ports
EXPOSE 8000
EXPOSE 8443 

# Make entry file executable
RUN chmod +x  /app/backend/entrypoint.prod.sh
 
# Start the application using Gunicorn
CMD ["/app/backend/entrypoint.prod.sh"] 