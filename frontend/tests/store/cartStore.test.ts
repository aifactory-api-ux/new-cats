import { describe, it, expect } from 'vitest';
import { cartStore } from '../../src/store/cartStore';

describe('cartStore', () => {
  it('should have initial empty cart state', () => {
    const state = cartStore.getState();
    expect(state.cart.id).toBe('');
    expect(state.cart.items).toEqual([]);
  });

  it('should set cart', () => {
    const testCart = {
      id: 'cart-1',
      userId: 'user-1',
      items: [{ productId: 'prod-1', quantity: 2 }],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };
    cartStore.getState().setCart(testCart);
    expect(cartStore.getState().cart).toEqual(testCart);
  });

  it('should preserve cart structure when setting new cart', () => {
    const testCart = {
      id: 'cart-2',
      userId: 'user-2',
      items: [{ productId: 'prod-2', quantity: 1 }],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };
    cartStore.getState().setCart(testCart);
    expect(cartStore.getState().cart.id).toBe('cart-2');
    expect(cartStore.getState().cart.items.length).toBe(1);
  });
});