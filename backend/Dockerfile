FROM tensorflow/tensorflow:latest

# Create app user
RUN useradd -m -r appuser && mkdir /app && chown -R appuser /app

WORKDIR /app/backend

# Copy dependencies
COPY requirements.txt .
RUN sed -i '/tensorflow==/d' requirements.txt && \
    sed -i '/keras==/d' requirements.txt && \
    pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY --chown=appuser:appuser . .

# Debug: List what was copied to resources
RUN ls -la ./resources/ || echo "resources directory not found"

# Prepare static & media
RUN mkdir -p /app/backend/staticfiles /var/www/media && \
    chown -R appuser:appuser /app/backend/staticfiles /var/www/media

USER appuser
EXPOSE 8000

# Make entrypoint executable
RUN chmod +x /app/backend/entrypoint.prod.sh
CMD ["/app/backend/entrypoint.prod.sh"]
