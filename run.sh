#!/bin/bash
set -e

echo "Starting docker-compose services..."
docker-compose up --build -d

echo "Waiting for services to be healthy..."
sleep 30

echo ""
echo "=========================================="
echo "  Services are running!"
echo "=========================================="
echo "  Backend:  http://localhost:8000"
echo "  Frontend:  http://localhost:5173"
echo "  Health:   http://localhost:8000/health"
echo "=========================================="
echo ""
echo "To stop services: docker-compose down"
