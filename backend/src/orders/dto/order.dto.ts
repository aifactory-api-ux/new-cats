import { IsString } from 'class-validator';

export class CartItemDto {
  productId: string;
  quantity: number;
}

export class OrderDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
