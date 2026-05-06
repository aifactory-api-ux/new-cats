import { create } from 'zustand';

interface Product {
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

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
}

export const productStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
