const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, data: any) => request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: <T>(path: string, data: any) => request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

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
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  category?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegister {
  email: string;
  name: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewCreate {
  productId: string;
  rating: number;
  comment: string;
}
