import { Injectable, NotFoundException } from '@nestjs/common';
import { CartDto, CartItemDto } from './dto/cart.dto';
import { generateId, formatDate } from '../shared/utils';

interface CartRecord {
  id: string;
  userId: string;
  items: CartItemDto[];
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class CartService {
  private carts: Map<string, CartRecord> = new Map();

  async getCart(userId: string): Promise<CartDto> {
    let cart = Array.from(this.carts.values()).find(c => c.userId === userId);
    if (!cart) {
      const now = formatDate(new Date());
      cart = { id: generateId(), userId, items: [], createdAt: now, updatedAt: now };
      this.carts.set(cart.id, cart);
    }
    return this.toDto(cart);
  }

  async addItem(userId: string, item: CartItemDto): Promise<CartDto> {
    const cart = await this.getCart(userId);
    const existingIndex = cart.items.findIndex(i => i.productId === item.productId);
    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    cart.updatedAt = formatDate(new Date());
    return this.toDto(cart);
  }

  async updateItem(userId: string, productId: string, quantity: number): Promise<CartDto> {
    const cart = await this.getCart(userId);
    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex < 0) {
      throw new NotFoundException('Item not found in cart');
    }
    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = formatDate(new Date());
    return this.toDto(cart);
  }

  async removeItem(userId: string, productId: string): Promise<CartDto> {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter(i => i.productId !== productId);
    cart.updatedAt = formatDate(new Date());
    return this.toDto(cart);
  }

  private toDto(cart: CartRecord): CartDto {
    return {
      id: cart.id,
      userId: cart.userId,
      items: cart.items,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}
