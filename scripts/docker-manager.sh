#!/bin/bash

# FinBridge Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed."
}

# Start development environment
start_dev() {
    print_info "Starting FinBridge Development Environment..."
    docker-compose -f docker-compose.dev.yml up --build -d
    
    print_info "Waiting for services to be ready..."
    sleep 10
    
    # Check if services are running
    if docker-compose -f docker-compose.dev.yml ps | grep -q "Up"; then
        print_success "Development environment started successfully!"
        print_info "Frontend: http://localhost:5173"
        print_info "Backend API: http://localhost:5000"
        print_info "Database Admin: http://localhost:8080"
        print_info "Database: localhost:5432"
        print_info "Redis: localhost:6379"
    else
        print_error "Failed to start development environment."
        exit 1
    fi
}

# Start production environment
start_prod() {
    print_info "Starting FinBridge Production Environment..."
    docker-compose up --build -d
    
    print_info "Waiting for services to be ready..."
    sleep 15
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        print_success "Production environment started successfully!"
        print_info "Frontend: http://localhost:3000"
        print_info "Backend API: http://localhost:5000"
        print_info "Database Admin: http://localhost:8080"
    else
        print_error "Failed to start production environment."
        exit 1
    fi
}

# Stop all containers
stop_all() {
    print_info "Stopping all FinBridge containers..."
    docker-compose down 2>/dev/null || true
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    print_success "All containers stopped."
}

# Clean up everything
clean_all() {
    print_warning "This will remove all containers, volumes, and images. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
        print_info "Cleaning up..."
        docker-compose down -v 2>/dev/null || true
        docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
        docker system prune -f
        docker volume prune -f
        print_success "Cleanup completed."
    else
        print_info "Cleanup cancelled."
    fi
}

# View logs
view_logs() {
    local service=$1
    if [ -z "$service" ]; then
        print_info "Showing logs for all services..."
        docker-compose logs -f
    else
        print_info "Showing logs for $service..."
        docker-compose logs -f "$service"
    fi
}

# Database operations
db_migrate() {
    print_info "Running database migrations..."
    docker-compose exec backend npx prisma migrate deploy
    print_success "Database migrations completed."
}

db_seed() {
    print_info "Seeding database..."
    docker-compose exec backend npx prisma db seed
    print_success "Database seeded successfully."
}

db_reset() {
    print_warning "This will reset the database. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
        print_info "Resetting database..."
        docker-compose exec backend npx prisma migrate reset --force
        print_success "Database reset completed."
    else
        print_info "Database reset cancelled."
    fi
}

# Health check
health_check() {
    print_info "Checking service health..."
    
    # Check frontend
    if curl -s http://localhost:5173 > /dev/null 2>&1 || curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend is healthy"
    else
        print_error "Frontend is not responding"
    fi
    
    # Check backend
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        print_success "Backend is healthy"
    else
        print_error "Backend is not responding"
    fi
    
    # Check database
    if docker-compose exec postgres pg_isready > /dev/null 2>&1; then
        print_success "Database is healthy"
    else
        print_error "Database is not responding"
    fi
    
    # Check redis
    if docker-compose exec redis redis-cli ping > /dev/null 2>&1; then
        print_success "Redis is healthy"
    else
        print_error "Redis is not responding"
    fi
}

# Backup database
backup_db() {
    local backup_file="backup_$(date +%Y%m%d_%H%M%S).sql"
    print_info "Creating database backup: $backup_file"
    docker-compose exec postgres pg_dump -U finbridge finbridge_dev > "$backup_file"
    print_success "Database backup created: $backup_file"
}

# Show usage
show_usage() {
    echo "FinBridge Docker Management Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  dev           Start development environment"
    echo "  prod          Start production environment"
    echo "  stop          Stop all containers"
    echo "  restart       Restart all containers"
    echo "  clean         Clean up all containers and volumes"
    echo "  logs [service] View logs (optional: specify service)"
    echo "  health        Check service health"
    echo "  db:migrate    Run database migrations"
    echo "  db:seed       Seed database with sample data"
    echo "  db:reset      Reset database"
    echo "  backup        Backup database"
    echo "  shell [service] Open shell in container"
    echo "  build         Build containers without starting"
    echo "  status        Show container status"
    echo ""
    echo "Examples:"
    echo "  $0 dev              # Start development environment"
    echo "  $0 logs backend     # View backend logs"
    echo "  $0 shell backend    # Open shell in backend container"
}

# Open shell in container
open_shell() {
    local service=$1
    if [ -z "$service" ]; then
        print_error "Please specify a service name."
        print_info "Available services: frontend, backend, postgres, redis"
        exit 1
    fi
    
    print_info "Opening shell in $service container..."
    if [ "$service" = "postgres" ]; then
        docker-compose exec "$service" psql -U finbridge -d finbridge_dev
    else
        docker-compose exec "$service" sh
    fi
}

# Build containers
build_containers() {
    print_info "Building containers..."
    docker-compose build
    print_success "Containers built successfully."
}

# Show status
show_status() {
    print_info "Container status:"
    docker-compose ps
}

# Restart containers
restart_containers() {
    print_info "Restarting containers..."
    docker-compose restart
    print_success "Containers restarted."
}

# Main script logic
main() {
    check_docker
    
    case "$1" in
        "dev")
            start_dev
            ;;
        "prod")
            start_prod
            ;;
        "stop")
            stop_all
            ;;
        "restart")
            restart_containers
            ;;
        "clean")
            clean_all
            ;;
        "logs")
            view_logs "$2"
            ;;
        "health")
            health_check
            ;;
        "db:migrate")
            db_migrate
            ;;
        "db:seed")
            db_seed
            ;;
        "db:reset")
            db_reset
            ;;
        "backup")
            backup_db
            ;;
        "shell")
            open_shell "$2"
            ;;
        "build")
            build_containers
            ;;
        "status")
            show_status
            ;;
        *)
            show_usage
            ;;
    esac
}

# Run main function with all arguments
main "$@"
