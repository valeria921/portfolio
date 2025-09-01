# backend/Dockerfile
FROM tensorflow/tensorflow:latest

# Create app user
RUN useradd -m -r appuser && mkdir /app && chown -R appuser /app

WORKDIR /app/backend

# Install Python dependencies (exclude tensorflow/keras)
COPY backend/requirements.txt .
RUN sed -i '/tensorflow==/d' requirements.txt && \
    sed -i '/keras==/d' requirements.txt && \
    pip install --no-cache-dir -r requirements.txt

COPY --chown=appuser:appuser backend/ .

# Static and media
RUN mkdir -p /app/backend/staticfiles /var/www/media && \
    chown -R appuser:appuser /app/backend/staticfiles /var/www/media && chmod -R 755 /app/backend/staticfiles

USER appuser
EXPOSE 8000
RUN chmod +x /app/backend/entrypoint.prod.sh
CMD ["/app/backend/entrypoint.prod.sh"]
