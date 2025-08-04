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

# Stage 2: Python dependencies
FROM python:3.11-slim AS python-builder
 
# Create the app directory
RUN mkdir /app
 
# Set the working directory
WORKDIR /app
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Install dependencies first for caching benefit
RUN pip install --upgrade pip 
COPY backend/requirements.txt /app/ 
RUN pip install --no-cache-dir -r requirements.txt
 
# Stage 3: Production stage
FROM python:3.11-slim
 
RUN useradd -m -r appuser && \
   mkdir /app && \
   chown -R appuser /app
 
# Copy the Python dependencies from the builder stage
COPY --from=python-builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=python-builder /usr/local/bin/ /usr/local/bin/
 
# Set the working directory
WORKDIR /app
 
# Copy Django application code
COPY --chown=appuser:appuser backend/ .
 
# Copy React build from react-builder stage
COPY --from=react-builder --chown=appuser:appuser /app/frontend/build /app/staticfiles/react

# Copy frontend public images to static files
COPY --chown=appuser:appuser frontend/public/images /app/staticfiles/images
 
# Create staticfiles directory with proper permissions
RUN mkdir -p /app/staticfiles && chown -R appuser:appuser /app/staticfiles && chmod -R 755 /app/staticfiles
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Switch to non-root user
USER appuser
 
# Expose the application port
EXPOSE 8000 

# Make entry file executable
RUN chmod +x  /app/entrypoint.prod.sh
 
# Start the application using Gunicorn
CMD ["/app/entrypoint.prod.sh"] 