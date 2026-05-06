# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.x
  - NestJS v10.x
  - PostgreSQL 15.x
  - Redis 7.x
- **Frontend**
  - React 18.x
  - Vite 5.x
  - TypeScript 5.x
- **Infrastructure**
  - Docker 24.x
  - docker-compose 2.x

## 2. DATA CONTRACTS

### TypeScript Interfaces (frontend & backend DTOs)

```typescript
// Product
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  numReviews: number;
  stock: number;
  category: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// ProductCreate
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

// ProductUpdate
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  category?: string;
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// UserRegister
export interface UserRegister {
  email: string;
  name: string;
  password: string;
}

// UserLogin
export interface UserLogin {
  email: string;
  password: string;
}

// AuthResponse
export interface AuthResponse {
  accessToken: string;
  user: User;
}

// CartItem
export interface CartItem {
  productId: string;
  quantity: number;
}

// Cart
export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// Order
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// Review
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO8601
}

// ReviewCreate
export interface ReviewCreate {
  productId: string;
  rating: number;
  comment: string;
}
```

### NestJS DTOs (backend)

```typescript
// src/products/dto/product.dto.ts
export class ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  numReviews: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export class ProductCreateDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export class ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  category?: string;
}

// src/users/dto/user.dto.ts
export class UserDto {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export class UserRegisterDto {
  email: string;
  name: string;
  password: string;
}

export class UserLoginDto {
  email: string;
  password: string;
}

export class AuthResponseDto {
  accessToken: string;
  user: UserDto;
}

// src/cart/dto/cart.dto.ts
export class CartItemDto {
  productId: string;
  quantity: number;
}

export class CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  createdAt: string;
  updatedAt: string;
}

// src/orders/dto/order.dto.ts
export class OrderDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// src/reviews/dto/review.dto.ts
export class ReviewDto {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export class ReviewCreateDto {
  productId: string;
  rating: number;
  comment: string;
}
```

## 3. API ENDPOINTS

### Auth

- **POST /api/auth/register**
  - Request: `UserRegister`
  - Response: `AuthResponse`
- **POST /api/auth/login**
  - Request: `UserLogin`
  - Response: `AuthResponse`
- **GET /api/auth/me**
  - Auth: Bearer JWT
  - Response: `User`

### Products

- **GET /api/products**
  - Query: `?category=string&search=string&page=number&limit=number`
  - Response: `{ products: Product[], total: number, page: number, limit: number }`
- **GET /api/products/:id**
  - Response: `Product`
- **POST /api/products**
  - Auth: Bearer JWT (admin)
  - Request: `ProductCreate`
  - Response: `Product`
- **PATCH /api/products/:id**
  - Auth: Bearer JWT (admin)
  - Request: `ProductUpdate`
  - Response: `Product`
- **DELETE /api/products/:id**
  - Auth: Bearer JWT (admin)
  - Response: `{ success: boolean }`

### Cart

- **GET /api/cart**
  - Auth: Bearer JWT
  - Response: `Cart`
- **POST /api/cart/items**
  - Auth: Bearer JWT
  - Request: `CartItem`
  - Response: `Cart`
- **PATCH /api/cart/items/:productId**
  - Auth: Bearer JWT
  - Request: `{ quantity: number }`
  - Response: `Cart`
- **DELETE /api/cart/items/:productId**
  - Auth: Bearer JWT
  - Response: `Cart`

### Orders

- **POST /api/orders**
  - Auth: Bearer JWT
  - Request: `{ cartId: string }`
  - Response: `Order`
- **GET /api/orders**
  - Auth: Bearer JWT
  - Response: `Order[]`
- **GET /api/orders/:id**
  - Auth: Bearer JWT
  - Response: `Order`

### Reviews

- **GET /api/products/:productId/reviews**
  - Response: `Review[]`
- **POST /api/products/:productId/reviews**
  - Auth: Bearer JWT
  - Request: `ReviewCreate`
  - Response: `Review`

## 4. FILE STRUCTURE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                      # Environment variable template
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── run.sh                            # Root startup script
├── backend/
│   ├── Dockerfile                    # Backend Docker image
│   ├── nest-cli.json                 # NestJS CLI config
│   ├── tsconfig.json                 # TypeScript config
│   ├── src/
│   │   ├── main.ts                   # NestJS entry point
│   │   ├── app.module.ts             # Root module
│   │   ├── config/                   # Config modules
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── dto/
│   │   │       ├── user-login.dto.ts
│   │   │       ├── user-register.dto.ts
│   │   │       └── auth-response.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   └── dto/
│   │   │       └── user.dto.ts
│   │   ├── products/
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── dto/
│   │   │       ├── product.dto.ts
│   │   │       ├── product-create.dto.ts
│   │   │       └── product-update.dto.ts
│   │   ├── cart/
│   │   │   ├── cart.module.ts
│   │   │   ├── cart.controller.ts
│   │   │   ├── cart.service.ts
│   │   │   └── dto/
│   │   │       ├── cart.dto.ts
│   │   │       └── cart-item.dto.ts
│   │   ├── orders/
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   └── dto/
│   │   │       └── order.dto.ts
│   │   ├── reviews/
│   │   │   ├── reviews.module.ts
│   │   │   ├── reviews.controller.ts
│   │   │   ├── reviews.service.ts
│   │   │   └── dto/
│   │   │       ├── review.dto.ts
│   │   │       └── review-create.dto.ts
│   │   ├── shared/
│   │   │   ├── constants.ts
│   │   │   ├── utils.ts
│   │   │   └── types.ts
│   └── shared/                       # Shared modules for microservices
│       ├── constants.ts
│       ├── utils.ts
│       └── types.ts
├── frontend/
│   ├── Dockerfile                    # Frontend Docker image
│   ├── vite.config.ts                # Vite config
│   ├── tsconfig.json                 # TypeScript config
│   ├── public/
│   │   └── index.html                # HTML entry point
│   ├── src/
│   │   ├── main.tsx                  # React entry point
│   │   ├── App.tsx                   # App root
│   │   ├── styles/
│   │   │   └── tokens.ts             # Design tokens (verbatim from Figma)
│   │   ├── pages/
│   │   │   ├── Inicio.tsx
│   │   │   ├── Catalogo.tsx
│   │   │   ├── DetalleProducto.tsx
│   │   │   ├── Carrito.tsx
│   │   │   ├── Pago.tsx
│   │   │   ├── MiCuenta.tsx
│   │   │   ├── InicioMobile.tsx
│   │   │   ├── CatalogoMobile.tsx
│   │   │   └── DetalleProductoMobile.tsx
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── BotonPrimario.tsx
│   │   │       ├── BotonSecundario.tsx
│   │   │       ├── CampoTexto.tsx
│   │   │       ├── TarjetaProducto.tsx
│   │   │       ├── BarraNavegacionSuperior.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── SelectorCantidad.tsx
│   │   │       ├── EstrellasValoracion.tsx
│   │   │       ├── Breadcrumb.tsx
│   │   │       ├── Paginacion.tsx
│   │   │       ├── Acordeon.tsx
│   │   │       └── Tooltip.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   ├── useOrder.ts
│   │   │   └── useReviews.ts
│   │   ├── store/
│   │   │   ├── authStore.ts
│   │   │   ├── cartStore.ts
│   │   │   └── productStore.ts
│   │   └── utils/
│   │       └── api.ts
```

### PORT TABLE

| Service    | Listening Port | Path                  |
|------------|---------------|-----------------------|
| backend    | 8000          | backend/              |

### SHARED MODULES

| Shared path         | Imported by services |
|---------------------|---------------------|
| backend/shared/     | backend             |

## 5. ENVIRONMENT VARIABLES

| Name                | Type     | Description                                 | Example Value                |
|---------------------|----------|---------------------------------------------|------------------------------|
| NODE_ENV            | string   | Node environment                            | production                   |
| PORT                | number   | Backend listening port                      | 8000                         |
| DATABASE_URL        | string   | PostgreSQL connection string                | postgres://user:pass@db:5432/cats |
| REDIS_URL           | string   | Redis connection string                     | redis://redis:6379           |
| JWT_SECRET          | string   | JWT signing secret                          | supersecretjwtkey            |
| JWT_EXPIRES_IN      | string   | JWT expiration duration                     | 1d                           |
| FRONTEND_URL        | string   | Frontend base URL                           | http://localhost:5173        |
| STRIPE_SECRET_KEY   | string   | Stripe API secret key                       | sk_test_...                  |
| STRIPE_PUBLIC_KEY   | string   | Stripe API public key                       | pk_test_...                  |

## 6. IMPORT CONTRACTS

### Backend

- `from src/products/products.service import ProductsService`
- `from src/products/dto/product.dto import ProductDto, ProductCreateDto, ProductUpdateDto`
- `from src/users/users.service import UsersService`
- `from src/users/dto/user.dto import UserDto, UserRegisterDto, UserLoginDto`
- `from src/auth/auth.service import AuthService`
- `from src/auth/dto/auth-response.dto import AuthResponseDto`
- `from src/cart/cart.service import CartService`
- `from src/cart/dto/cart.dto import CartDto, CartItemDto`
- `from src/orders/orders.service import OrdersService`
- `from src/orders/dto/order.dto import OrderDto`
- `from src/reviews/reviews.service import ReviewsService`
- `from src/reviews/dto/review.dto import ReviewDto, ReviewCreateDto`
- `from backend/shared/constants import *`
- `from backend/shared/utils import *`
- `from backend/shared/types import *`

### Frontend

- `import { tokens } from '../styles/tokens'`
- `import { Product, ProductCreate, ProductUpdate } from '../utils/api'`
- `import { User, UserRegister, UserLogin, AuthResponse } from '../utils/api'`
- `import { Cart, CartItem } from '../utils/api'`
- `import { Order } from '../utils/api'`
- `import { Review, ReviewCreate } from '../utils/api'`
- `import { useAuth } from '../hooks/useAuth'`
- `import { useCart } from '../hooks/useCart'`
- `import { useProducts } from '../hooks/useProducts'`
- `import { useOrder } from '../hooks/useOrder'`
- `import { useReviews } from '../hooks/useReviews'`
- `import { authStore } from '../store/authStore'`
- `import { cartStore } from '../store/cartStore'`
- `import { productStore } from '../store/productStore'`

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

- `useAuth() → { user, loading, error, login, register, logout }`
- `useCart() → { cart, loading, error, addToCart, updateQuantity, removeFromCart, clearCart }`
- `useProducts() → { products, loading, error, fetchProducts, fetchProductById }`
- `useOrder() → { orders, loading, error, createOrder, fetchOrders }`
- `useReviews(productId) → { reviews, loading, error, addReview }`

### Component Props/Inputs

- `BotonPrimario` props: `{ children: React.ReactNode, onClick: () => void, disabled?: boolean, loading?: boolean, type?: 'button' | 'submit' }`
- `BotonSecundario` props: `{ children: React.ReactNode, onClick: () => void, disabled?: boolean, loading?: boolean, type?: 'button' | 'submit' }`
- `CampoTexto` props: `{ label: string, value: string, onChange: (v: string) => void, type?: string, placeholder?: string, error?: string, required?: boolean }`
- `TarjetaProducto` props: `{ product: Product, onClick?: () => void }`
- `BarraNavegacionSuperior` props: `{ user: User | null, cartCount: number, onSearch: (q: string) => void }`
- `Footer` props: `{ }`
- `Modal` props: `{ open: boolean, title: string, children: React.ReactNode, onClose: () => void, actions?: React.ReactNode }`
- `SelectorCantidad` props: `{ value: number, min?: number, max?: number, onChange: (v: number) => void }`
- `EstrellasValoracion` props: `{ value: number, max?: number, onChange?: (v: number) => void, readOnly?: boolean }`
- `Breadcrumb` props: `{ items: { label: string, href: string }[] }`
- `Paginacion` props: `{ page: number, total: number, pageSize: number, onPageChange: (p: number) => void }`
- `Acordeon` props: `{ title: string, children: React.ReactNode, open?: boolean, onToggle?: () => void }`
- `Tooltip` props: `{ content: React.ReactNode, children: React.ReactNode }`

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React).
- The project is TypeScript throughout (frontend and backend).
- Entry point: `/src/main.tsx` (as referenced in `public/index.html`).

## 9. DESIGN TOKENS

```typescript
export const tokens = {
  colors: {
    primary: "#F28C28",
    secondary: "#4A90D9",
    accent: "#2ECC71",
    background: "#FFF8F0",
    surface: "#FFFFFF",
    text_primary: "#2C3E50",
    text_secondary: "#7F8C8D",
    error: "#E74C3C",
    success: "#27AE60"
  },
  typography: {
    font_family: "Inter, sans-serif",
    headings: {
      h1: "bold 36px/44px",
      h2: "bold 28px/36px",
      h3: "bold 22px/28px",
      h4: "bold 18px/24px"
    },
    body: {
      regular: "16px/24px",
      small: "14px/20px"
    },
    button: "medium 16px/24px"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px"
  },
  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.08)",
    dropdown: "0 4px 16px rgba(0,0,0,0.12)",
    button: "0 2px 4px rgba(0,0,0,0.1)"
  },
  icon_style: "Lineal, grosor 2px, esquinas redondeadas, color primario o texto secundario.",
  image_style: "Fotografías de alta resolución con luz natural, fondos neutros o lifestyle, recortes limpios, relación 1:1 o 4:3.",
  motion_interaction: "Transiciones suaves de 0.2-0.3s, hover con elevación sutil, micro-interacciones en botones y tarjetas."
};
```