# Stage 1: Python dependencies (using TensorFlow with Python 3.11)
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
 
# Stage 2: Production stage
FROM tensorflow/tensorflow:latest
 
RUN useradd -m -r appuser && \
   mkdir /app && \
   chown -R appuser /app
 
# Copy the Python dependencies from the builder stage
COPY --from=python-builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=python-builder /usr/local/bin/ /usr/local/bin/
 
# Set the working directory
WORKDIR /app/backend
 
# Copy Django application code
COPY --chown=appuser:appuser backend/ .
 
# Ensure Django static root exists with proper permissions
RUN mkdir -p /app/backend/staticfiles && chown -R appuser:appuser /app/backend/staticfiles && chmod -R 755 /app/backend/staticfiles
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Switch to non-root user
USER appuser
 
# Expose the application port
EXPOSE 8000 

# Make entry file executable
RUN chmod +x  /app/backend/entrypoint.prod.sh
 
# Start the application using Gunicorn
CMD ["/app/backend/entrypoint.prod.sh"]