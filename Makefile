.PHONY: help dev prod stop restart clean logs health build status shell backup

# Default target
help:
	@echo "FinBridge Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev          Start development environment"
	@echo "  make dev-logs     View development logs"
	@echo ""
	@echo "Production:"
	@echo "  make prod         Start production environment"
	@echo "  make prod-logs    View production logs"
	@echo ""
	@echo "Management:"
	@echo "  make stop         Stop all containers"
	@echo "  make restart      Restart containers"
	@echo "  make clean        Clean up everything"
	@echo "  make build        Build containers"
	@echo "  make status       Show container status"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate   Run database migrations"
	@echo "  make db-seed      Seed database"
	@echo "  make db-reset     Reset database"
	@echo "  make backup       Backup database"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs         View all logs"
	@echo "  make health       Check service health"
	@echo "  make shell-backend    Open backend shell"
	@echo "  make shell-db         Open database shell"

# Development environment
dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up --build -d
	@echo "Development environment started!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:5001"
	@echo "Admin: http://localhost:8080"

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Production environment
prod:
	@echo "Starting production environment..."
	docker-compose up --build -d
	@echo "Production environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:5001"
	@echo "Admin: http://localhost:8080"

prod-logs:
	docker-compose logs -f

# Management commands
stop:
	@echo "Stopping all containers..."
	docker-compose down 2>/dev/null || true
	docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
	@echo "All containers stopped."

restart:
	docker-compose restart

clean:
	@echo "Cleaning up..."
	docker-compose down -v 2>/dev/null || true
	docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
	docker system prune -f
	docker volume prune -f
	@echo "Cleanup completed."

build:
	docker-compose build

status:
	docker-compose ps

# Database operations
db-migrate:
	docker-compose exec backend npx prisma migrate deploy

db-seed:
	docker-compose exec backend npx prisma db seed

db-reset:
	docker-compose exec backend npx prisma migrate reset --force

backup:
	docker-compose exec postgres pg_dump -U finbridge finbridge_dev > backup_$(shell date +%Y%m%d_%H%M%S).sql

# Utility commands
logs:
	docker-compose logs -f

health:
	@echo "Checking service health..."
	@curl -s http://localhost:5001/api/health || echo "Backend not responding"
	@docker-compose exec postgres pg_isready || echo "Database not responding"
	@docker-compose exec redis redis-cli ping || echo "Redis not responding"

shell-backend:
	docker-compose exec backend sh

shell-db:
	docker-compose exec postgres psql -U finbridge -d finbridge_dev

shell-redis:
	docker-compose exec redis redis-cli

# Quick setup for new developers
setup:
	@echo "Setting up FinBridge development environment..."
	@chmod +x scripts/docker-manager.sh
	@echo "Run 'make dev' to start development environment"
