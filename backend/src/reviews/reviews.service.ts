import { Injectable } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { generateId, formatDate } from '../shared/utils';

interface ReviewRecord {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Injectable()
export class ReviewsService {
  private reviews: Map<string, ReviewRecord> = new Map();

  async findByProduct(productId: string): Promise<ReviewDto[]> {
    return Array.from(this.reviews.values())
      .filter(r => r.productId === productId)
      .map(r => this.toDto(r));
  }

  async create(userId: string, dto: { productId: string; rating: number; comment: string }): Promise<ReviewDto> {
    const id = generateId();
    const review: ReviewRecord = {
      id,
      userId,
      productId: dto.productId,
      rating: dto.rating,
      comment: dto.comment,
      createdAt: formatDate(new Date()),
    };
    this.reviews.set(id, review);
    return this.toDto(review);
  }

  private toDto(review: ReviewRecord): ReviewDto {
    return {
      id: review.id,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    };
  }
}
