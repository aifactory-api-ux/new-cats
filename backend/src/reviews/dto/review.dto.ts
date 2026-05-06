export class ReviewDto {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export class ReviewCreateDto {
  productId: string;
  rating: number;
  comment: string;
}
