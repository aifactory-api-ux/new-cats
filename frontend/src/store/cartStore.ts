import { create } from 'zustand';

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartState {
  cart: Cart;
  setCart: (cart: Cart) => void;
}

export const cartStore = create<CartState>((set) => ({
  cart: { id: '', userId: '', items: [], createdAt: '', updatedAt: '' },
  setCart: (cart) => set({ cart }),
}));
