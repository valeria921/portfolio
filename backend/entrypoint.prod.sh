#!/usr/bin/env bash
set -e

echo "Waiting for database..."
python << END
import time
import psycopg2
import os

while True:
    try:
        conn = psycopg2.connect(
            host=os.getenv('DATABASE_HOST', 'db'),
            port=os.getenv('DATABASE_PORT', '5432'),
            user=os.getenv('DATABASE_USERNAME', 'postgres'),
            password=os.getenv('DATABASE_PASSWORD', 'postgres'),
            database=os.getenv('DATABASE_NAME', 'django_db')
        )
        conn.close()
        print("Database is ready!")
        break
    except psycopg2.OperationalError:
        print("Database not ready, waiting...")
        time.sleep(1)
END

echo "Database is ready"

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear || echo "Static files collection failed, continuing..."

echo "Copying media files to static..."
mkdir -p /app/staticfiles/media
cp -r /app/media/* /app/staticfiles/media/ 2>/dev/null || echo "Media files copy failed, continuing..."

echo "Seeding database..."
python manage.py seed

echo "Starting Gunicorn server..."
python -m gunicorn --bind 0.0.0.0:8000 --workers 1 --timeout 300 --max-requests 1000 backend.wsgi:application
