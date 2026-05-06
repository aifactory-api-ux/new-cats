import { useState } from 'react';
import { api } from '../utils/api';

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (cartId: string) => {
    setLoading(true);
    setError(null);
    try {
      const order = await api.post('/api/orders', { cartId });
      return order;
    } catch (err: any) {
      setError(err.message || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const orders = await api.get('/api/orders');
      return orders;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders: [],
    loading,
    error,
    createOrder,
    fetchOrders,
  };
}
