# Stage 1: Python dependencies
FROM tensorflow/tensorflow:latest AS python-builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt /app/
# Remove tensorflow and keras (already in base image)
RUN sed -i '/tensorflow==/d' requirements.txt && \
    sed -i '/keras==/d' requirements.txt && \
    pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Production
FROM tensorflow/tensorflow:latest

RUN useradd -m -r appuser && mkdir /app && chown -R appuser /app

COPY --from=python-builder /usr/local/lib/python3.11/dist-packages/ /usr/local/lib/python3.11/dist-packages/
COPY --from=python-builder /usr/local/bin/ /usr/local/bin/

WORKDIR /app/backend
COPY --chown=appuser:appuser . .

RUN mkdir -p /app/backend/staticfiles && chown -R appuser:appuser /app/backend/staticfiles && chmod -R 755 /app/backend/staticfiles
RUN mkdir -p /app/media && chown -R appuser:appuser /app/media

USER appuser
EXPOSE 8000

RUN chmod +x /app/backend/entrypoint.prod.sh
CMD ["/app/backend/entrypoint.prod.sh"]
