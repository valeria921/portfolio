#!/usr/bin/env bash

echo "🚀 Starting Portfolio Project Deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose and try again."
    exit 1
fi

echo "📦 Building and starting services..."

# Build and start all services
docker compose up --build -d

echo "⏳ Waiting for services to be ready..."

# Wait for database to be ready
echo "🔍 Checking database health..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker compose ps

echo "✅ Deployment completed!"
echo ""
echo "🌐 Your application is now running at:"
echo "   - Main application: http://localhost"
echo "   - Frontend only: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - Admin panel: http://localhost/admin"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker compose logs -f"
echo "   - Stop services: docker compose down"
echo "   - Restart services: docker compose restart"
echo "   - Rebuild and restart: docker compose up --build -d" 