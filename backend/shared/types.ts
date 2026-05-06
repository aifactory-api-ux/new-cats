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
  passwordHash: string;
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

export type Category = 'food' | 'toys' | 'accessories' | 'grooming' | 'beds' | 'other';
