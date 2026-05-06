import { IsString, IsNumber, Min, Max } from 'class-validator';

export class ReviewCreateDto {
  productId: string;
  rating: number;
  comment: string;
}
