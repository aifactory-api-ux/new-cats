import { useState } from 'react';
import { api } from '../utils/api';

export function useReviews(productId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<any[]>(`/api/products/${productId}/reviews`);
      setReviews(data as any[]);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reviews');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (rating: number, comment: string) => {
    setLoading(true);
    setError(null);
    try {
      const review = await api.post(`/api/products/${productId}/reviews`, { rating, comment });
      setReviews(prev => [...prev, review]);
      return review;
    } catch (err: any) {
      setError(err.message || 'Failed to add review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
  };
}
