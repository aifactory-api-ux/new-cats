import { describe, it, expect } from 'vitest';
import { productStore } from '../src/store/productStore';

describe('productStore', () => {
  it('should have initial empty products state', () => {
    const state = productStore.getState();
    expect(state.products).toEqual([]);
    expect(state.selectedProduct).toBeNull();
  });

  it('should set products', () => {
    const testProducts = [
      { id: '1', name: 'Product 1', description: 'Desc 1', price: 10, imageUrl: '', rating: 4, numReviews: 5, stock: 10, category: 'cat1', createdAt: '', updatedAt: '' },
    ];
    productStore.getState().setProducts(testProducts);
    expect(productStore.getState().products).toEqual(testProducts);
  });

  it('should set selected product', () => {
    const testProduct = { id: '1', name: 'Product 1', description: 'Desc 1', price: 10, imageUrl: '', rating: 4, numReviews: 5, stock: 10, category: 'cat1', createdAt: '', updatedAt: '' };
    productStore.getState().setSelectedProduct(testProduct);
    expect(productStore.getState().selectedProduct).toEqual(testProduct);
  });

  it('should clear selected product', () => {
    productStore.getState().setSelectedProduct(null);
    expect(productStore.getState().selectedProduct).toBeNull();
  });
});