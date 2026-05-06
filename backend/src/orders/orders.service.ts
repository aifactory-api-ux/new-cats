import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { generateId, formatDate } from '../shared/utils';
import { CartService } from '../cart/cart.service';

interface OrderRecord {
  id: string;
  userId: string;
  items: { productId: string; quantity: number }[];
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class OrdersService {
  private orders: Map<string, OrderRecord> = new Map();

  constructor(private cartService: CartService) {}

  async create(userId: string, cartId: string): Promise<OrderDto> {
    const cart = await this.cartService.getCart(userId);
    if (cart.items.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const total = 0;
    const now = formatDate(new Date());
    const order: OrderRecord = {
      id: generateId(),
      userId,
      items: cart.items,
      total,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    this.orders.set(order.id, order);
    return this.toDto(order);
  }

  async findByUser(userId: string): Promise<OrderDto[]> {
    return Array.from(this.orders.values())
      .filter(o => o.userId === userId)
      .map(o => this.toDto(o));
  }

  async findById(id: string): Promise<OrderDto> {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.toDto(order);
  }

  private toDto(order: OrderRecord): OrderDto {
    return {
      id: order.id,
      userId: order.userId,
      items: order.items,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
