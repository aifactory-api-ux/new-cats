# New Cats - E-commerce for Cat Products

A modern e-commerce platform for cat products built with NestJS (backend) and React (frontend).

## Prerequisites

- Docker 24.x+
- docker-compose 2.x+

## Quick Start

```bash
./run.sh
```

This will start all services (backend, frontend, PostgreSQL, Redis) and make them accessible at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **Health Check:** http://localhost:8000/health

## Project Structure

```
.
├── backend/           # NestJS backend
│   └── src/
│       ├── auth/     # Authentication (JWT)
│       ├── users/    # User management
│       ├── products/ # Product catalog
│       ├── cart/     # Shopping cart
│       ├── orders/   # Order management
│       └── reviews/  # Product reviews
├── frontend/         # React + Vite frontend
│   └── src/
│       ├── pages/    # Page components
│       ├── components/ui/  # UI components
│       ├── hooks/    # Custom React hooks
│       ├── store/    # Zustand stores
│       └── utils/    # API utilities
├── docker-compose.yml
└── run.sh
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| GET | /api/products | List products |
| GET | /api/products/:id | Get product details |
| POST | /api/products | Create product (admin) |
| PATCH | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |
| GET | /api/cart | Get cart |
| POST | /api/cart/items | Add to cart |
| PATCH | /api/cart/items/:productId | Update quantity |
| DELETE | /api/cart/items/:productId | Remove from cart |
| POST | /api/orders | Create order |
| GET | /api/orders | Get user orders |
| GET | /api/products/:productId/reviews | Get reviews |
| POST | /api/products/:productId/reviews | Add review |

## Environment Variables

See `.env.example` for required environment variables.

## Development

### Manual Start (without Docker)

1. Start PostgreSQL and Redis
2. Backend: `cd backend && npm install && npm run start:dev`
3. Frontend: `cd frontend && npm install && npm run dev`

## License

MIT
