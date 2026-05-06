import { useState } from 'react';
import { api, Product } from '../utils/api';
import { productStore } from '../store/productStore';

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export function useProducts(query?: { category?: string; page?: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query?.category) params.append('category', query.category);
      if (query?.page) params.append('page', String(query.page));
      const response: ProductsResponse = await api.get<ProductsResponse>(`/api/products?${params.toString()}`);
      productStore.getState().setProducts(response.products);
      setTotal(response.total);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const product: Product = await api.get<Product>(`/api/products/${id}`);
      productStore.getState().setSelectedProduct(product);
      return product;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products: productStore.getState().products,
    product: productStore.getState().selectedProduct,
    total,
    loading,
    error,
    fetchProducts,
    fetchProductById,
  };
}
