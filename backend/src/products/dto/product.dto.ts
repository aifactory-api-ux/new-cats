export class ProductDto {
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

export class ProductCreateDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export class ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  category?: string;
}
