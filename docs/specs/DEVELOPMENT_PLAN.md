# DEVELOPMENT PLAN: new cats

## 1. ARCHITECTURE OVERVIEW

**System Type:** E-commerce web platform for cat products  
**Architecture:** Microservices-inspired monolith (single backend service, single frontend app), strict separation of concerns, Dockerized, PostgreSQL 15, Redis 7, Node.js 20 (NestJS), React 18 (Vite), TypeScript 5.

**Main Components:**
- **Backend (NestJS, Node.js 20):**
  - Product Catalog API (CRUD, filtering, details)
  - Admin Product Management (CRUD)
  - PostgreSQL 15 for persistent storage
  - Redis 7 for caching (if needed)
  - JWT-based authentication (admin endpoints)
  - Healthcheck endpoint
  - Structured logging, env validation, error handling

- **Frontend (React 18, Vite, TypeScript):**
  - Catalog page (product list, category filtering)
  - Product detail page (description, images, price, reviews, add to cart)
  - Admin product management UI (add/edit/delete products)
  - Responsive design (desktop/mobile)
  - UI/UX strictly matches approved contract (tokens, structure, visual direction)

- **Infrastructure:**
  - Docker Compose orchestration (backend, frontend, db, redis)
  - Healthchecks, startup order, .env.example, run.sh for zero-manual setup

**Folder Structure:**
```
project-root/
├── frontend/
│   ├── src/
│   └── Dockerfile
├── backend/
│   ├── src/
│   └── Dockerfile
├── shared/
│   ├── types.ts
│   ├── config.ts
│   └── utils.ts
├── docker-compose.yml
├── .env.example
├── .gitignore
├── .dockerignore
├── run.sh
├── README.md
└── docs/
    └── architecture.md
```

**Key Models:**
- Product (id, name, description, price, imageUrl, stock, category, createdAt, updatedAt, rating, numReviews)
- ProductCreate/ProductUpdate DTOs
- Category (string, as enum or field)
- User (admin only for product management)

**APIs:**
- `GET /api/products?category=...` — list/filter products
- `GET /api/products/:id` — product details
- `POST /api/products` — create product (admin)
- `PATCH /api/products/:id` — update product (admin)
- `DELETE /api/products/:id` — delete product (admin)
- `GET /health` — healthcheck

**Frontend Pages:**
- Catalog (list, filter by category)
- Product Detail (info, images, reviews, add to cart)
- Admin Product Management (CRUD)

## 2. ACCEPTANCE CRITERIA

1. Users can browse the product catalog, filter by category, and view product details (including images, description, price, stock, and reviews) via the web UI.
2. Admin users can add, edit, and delete products from the catalog using the admin panel, with changes reflected immediately for all users.
3. The system can be started locally with a single `./run.sh` command, with all services (frontend, backend, PostgreSQL, Redis) healthy and accessible, and all endpoints and UI features working as specified.

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
- **role-tl (technical_lead):** Item 1 (Foundation)
- **role-be (backend_developer):** Item 2 (Backend API & Admin)
- **role-fe (frontend_developer):** Item 3 (Frontend UI)
- **role-devops (devops_support):** Item 4 (Infrastructure & Deployment)

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — shared types, interfaces, DB schemas, config

**Goal:**  
Establish all shared code, types, interfaces, DB schema, and configuration used by backend and frontend. This includes all TypeScript interfaces (Product, ProductCreate, ProductUpdate, User), shared config/constants, utility functions, and the SQL schema for PostgreSQL (products table, indexes).

**Files to create:**
- shared/types.ts (create)  
  - All TypeScript interfaces and enums for Product, ProductCreate, ProductUpdate, User, Category, etc.
- shared/config.ts (create)  
  - Shared constants, environment variable validation (using zod or joi), e.g., DB connection, JWT secret, etc.
- shared/utils.ts (create)  
  - Shared utility functions (e.g., slugify, date formatting, error helpers)
- backend/src/db/schema.sql (create)  
  - SQL schema for products table (id, name, description, price, image_url, stock, category, created_at, updated_at, rating, num_reviews), with indexes on category and name

**Dependencies:** None

**Validation:**  
- `shared/types.ts` can be imported by both backend and frontend without errors.
- `backend/src/db/schema.sql` can be applied to a fresh PostgreSQL 15 instance and creates all required tables and indexes.
- `shared/config.ts` throws on missing/invalid env vars.

**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend — Product Catalog API & Admin Management (NestJS)

**Goal:**  
Implement the backend API for product catalog browsing, filtering, product detail, and admin CRUD management. Enforce RBAC for admin endpoints. Provide healthcheck, structured logging, error handling, and environment validation.

**Files to create:**
- backend/src/main.ts (create)  
  - NestJS bootstrap, loads config, sets up global pipes, logging, error filters
- backend/src/app.module.ts (create)  
  - Root NestJS module, imports ProductsModule, ConfigModule, etc.
- backend/src/products/products.module.ts (create)  
  - NestJS module for products
- backend/src/products/products.controller.ts (create)  
  - REST endpoints:  
    - `GET /api/products` (list/filter)  
    - `GET /api/products/:id` (detail)  
    - `POST /api/products` (admin, create)  
    - `PATCH /api/products/:id` (admin, update)  
    - `DELETE /api/products/:id` (admin, delete)
- backend/src/products/products.service.ts (create)  
  - Business logic for product CRUD, filtering, DB access
- backend/src/products/dto/product.dto.ts (create)  
  - Product DTOs (import from shared/types.ts)
- backend/src/products/dto/product-create.dto.ts (create)  
  - ProductCreate DTO (import from shared/types.ts)
- backend/src/products/dto/product-update.dto.ts (create)  
  - ProductUpdate DTO (import from shared/types.ts)
- backend/src/auth/auth.module.ts (create)  
  - Minimal JWT-based admin auth (for product management endpoints)
- backend/src/auth/auth.service.ts (create)  
  - Auth logic (admin login, JWT issue/verify)
- backend/src/auth/auth.controller.ts (create)  
  - `POST /api/auth/login` (admin login)
- backend/src/auth/jwt.strategy.ts (create)  
  - JWT validation for admin endpoints
- backend/src/shared/constants.ts (create)  
  - Shared constants (roles, etc.)
- backend/Dockerfile (create)  
  - Multi-stage build, non-root user, EXPOSE 8000, CMD: `node dist/main.js`
- backend/nest-cli.json (create)  
  - NestJS CLI config
- backend/tsconfig.json (create)  
  - TypeScript config (strict mode, paths for shared/)
- backend/package.json (create)  
  - Dependencies (NestJS, pg, class-validator, class-transformer, dotenv, etc.), scripts (start, build, dev)
- backend/src/config/ (create)  
  - Config module for env validation (import from shared/config.ts)
- backend/src/shared/utils.ts (create)  
  - Import from shared/utils.ts for backend use

**Dependencies:** Item 1

**Validation:**  
- `npm run build && npm run start:prod` starts the backend, connects to PostgreSQL, exposes all endpoints.
- `GET /api/products` returns product list, filtering by category works.
- `POST /api/products` (with admin JWT) creates a product.
- `GET /health` returns `{status: 'ok', service: 'backend', version: '1.0.0'}`.
- All endpoints validate input and return structured errors.

**Role:** role-be (backend_developer)

---

### ITEM 3: Frontend — Catalog, Product Detail, Admin Product Management (React 18 + Vite)

**Goal:**  
Implement the web UI for product catalog browsing/filtering, product detail view, and admin product management (CRUD). UI/UX must match the approved contract 1:1 (tokens, structure, visual direction). Responsive design for desktop/mobile.

**Files to create:**
- frontend/src/main.tsx (create)  
  - React app entry point, sets up router, theme, context
- frontend/src/App.tsx (create)  
  - App root, layout, routes
- frontend/src/pages/Catalogo.tsx (create)  
  - Catalog page: product list, category filter, uses API
- frontend/src/pages/DetalleProducto.tsx (create)  
  - Product detail page: description, images, price, stock, reviews, add to cart
- frontend/src/pages/AdminProductos.tsx (create)  
  - Admin panel: add/edit/delete products (CRUD UI)
- frontend/src/components/ui/TarjetaProducto.tsx (create)  
  - Product card component (image, name, price)
- frontend/src/components/ui/BotonPrimario.tsx (create)  
  - Primary button component (styled per tokens)
- frontend/src/components/ui/CampoTexto.tsx (create)  
  - Text input component
- frontend/src/components/ui/Modal.tsx (create)  
  - Modal dialog for add/edit product
- frontend/src/components/ui/Paginacion.tsx (create)  
  - Pagination controls
- frontend/src/styles/tokens.ts (create)  
  - Design tokens (colors, spacing, typography) per UI/UX contract
- frontend/src/hooks/useProducts.ts (create)  
  - Fetch product list, filter, CRUD (uses shared/types.ts)
- frontend/src/hooks/useAuth.ts (create)  
  - Admin login, JWT management
- frontend/src/store/productStore.ts (create)  
  - State management for products (list, selected, CRUD)
- frontend/src/store/authStore.ts (create)  
  - State management for admin auth
- frontend/src/utils/api.ts (create)  
  - API client (fetch, error handling, JWT attach)
- frontend/Dockerfile (create)  
  - Multi-stage build (Vite → nginx), EXPOSE 5173, CMD: serve built app
- frontend/vite.config.ts (create)  
  - Vite config (proxy API, env vars)
- frontend/tsconfig.json (create)  
  - TypeScript config (strict, paths for shared/)
- frontend/package.json (create)  
  - Dependencies (react, react-dom, vite, zustand, axios, etc.), scripts (dev, build, preview)

**Dependencies:** Item 1

**Validation:**  
- `npm run build && npm run preview` serves the frontend, connects to backend API.
- Catalog page displays products, category filter works.
- Product detail page shows all info, images, reviews.
- Admin panel allows add/edit/delete products (with admin login).
- UI matches approved design 1:1 (tokens, layout, components).
- Responsive on desktop and mobile.

**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment

**Goal:**  
Provide complete Docker orchestration for local development and deployment. All services (frontend, backend, PostgreSQL, Redis) are started, healthchecked, and accessible via a single `./run.sh` command. Includes documentation and environment templates.

**Files to create:**
- docker-compose.yml (create)  
  - Services: backend, frontend, postgres, redis; healthchecks; depends_on with service_healthy; correct build contexts; ports mapped; env vars from .env
- .env.example (create)  
  - All required env vars for backend, frontend, db, redis, with descriptions and example values
- .gitignore (create)  
  - Exclude node_modules, dist, .env, .DS_Store, .vscode, logs, etc.
- .dockerignore (create)  
  - Exclude node_modules, .git, dist, logs, etc.
- run.sh (create)  
  - Bash script: checks Docker, builds images, starts containers, waits for all healthchecks, prints access URLs
- README.md (create)  
  - Prerequisites, setup, run instructions, endpoints, troubleshooting
- docs/architecture.md (create)  
  - System diagram, component descriptions, API summary

**Dependencies:** Items 1, 2, 3

**Validation:**  
- `./run.sh` completes without errors.
- All containers are healthy (`docker ps` shows healthy status).
- Backend API accessible at `localhost:8000`, frontend at `localhost:5173`.
- Database and Redis are reachable by backend.
- All endpoints and UI features work as specified.

**Role:** role-devops (devops_support)

---