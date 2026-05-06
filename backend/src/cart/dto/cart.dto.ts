export class CartItemDto {
  productId: string;
  quantity: number;
}

export class CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  createdAt: string;
  updatedAt: string;
}
