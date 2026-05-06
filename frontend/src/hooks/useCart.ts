import { useState } from 'react';
import { api, Cart } from '../utils/api';
import { cartStore } from '../store/cartStore';

export function useCart() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (item: { productId: string; quantity: number }) => {
    setLoading(true);
    setError(null);
    try {
      const cart: Cart = await api.post<Cart>('/api/cart/items', item);
      cartStore.getState().setCart(cart);
      return cart;
    } catch (err: any) {
      setError(err.message || 'Failed to add to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const cart: Cart = await api.patch<Cart>(`/api/cart/items/${productId}`, { quantity });
      cartStore.getState().setCart(cart);
      return cart;
    } catch (err: any) {
      setError(err.message || 'Failed to update quantity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const cart: Cart = await api.delete<Cart>(`/api/cart/items/${productId}`);
      cartStore.getState().setCart(cart);
      return cart;
    } catch (err: any) {
      setError(err.message || 'Failed to remove from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    cartStore.getState().setCart({ id: '', userId: '', items: [], createdAt: '', updatedAt: '' });
  };

  return {
    cart: cartStore.getState().cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}
