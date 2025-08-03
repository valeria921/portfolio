# 🚀 Portfolio Project - Docker Deployment

## Quick Start

### Prerequisites

-   Docker and Docker Compose installed

### Deploy

```bash
# Clone and navigate
cd portfolio

# Deploy
./deploy.sh
```

### Access

-   **Main app:** http://localhost
-   **Frontend:** http://localhost:3000
-   **Backend API:** http://localhost:8000
-   **Admin panel:** http://localhost/kushums921/

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx     │    │   React     │    │   Django    │
│  (Port 80)  │◄──►│  Frontend   │◄──►│  Backend    │
│             │    │ (Port 3000) │    │ (Port 8000) │
└─────────────┘    └─────────────┘    └─────────────┘
                           │                   │
                           └─────────┬─────────┘
                                     │
                           ┌─────────▼─────────┐
                           │   PostgreSQL      │
                           │   Database        │
                           └───────────────────┘
```

## Services

| Service    | Port | Description                 |
| ---------- | ---- | --------------------------- |
| Nginx      | 80   | Reverse proxy, static files |
| React      | 3000 | Frontend application        |
| Django     | 8000 | Backend API                 |
| PostgreSQL | 5432 | Database                    |

## Common Commands

```bash
# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Restart services
docker compose restart

# Rebuild and restart
docker compose up --build -d
```

## Troubleshooting

### Port conflicts

```bash
# Check what's using port 80
lsof -i :80
```

### Database issues

```bash
# Check database logs
docker compose logs db
```

### Build failures

```bash
# Clean and rebuild
docker compose down
docker system prune -f
docker compose up --build
```

## Production Setup

### SSL/HTTPS Configuration

For production with multiple projects and certbot:

1. **Create production docker-compose:**

```bash
cp docker-compose.yml docker-compose.prod.yml
```

2. **Add SSL volumes to nginx:**

```yaml
volumes:
    - /etc/letsencrypt:/etc/letsencrypt:ro
    - /var/lib/letsencrypt:/var/lib/letsencrypt:ro
```

3. **Update nginx config for SSL:**

```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    # ... rest of config
}
```

### Environment Variables

Create `.env.prod` file:

```bash
DJANGO_SECRET_KEY=your-secure-key
POSTGRES_PASSWORD=your-secure-password
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Certbot Integration

Add to crontab for auto-renewal:

```bash
0 12 * * * /usr/bin/certbot renew --quiet
```

## Support

-   Check logs: `docker compose logs -f`
-   Restart specific service: `docker compose restart [service]`
-   Access container: `docker compose exec [service] bash`

---

**Happy Deploying! 🎉**
