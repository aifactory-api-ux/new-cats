import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':productId/reviews')
  async findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':productId/reviews')
  async create(
    @Request() req: any,
    @Param('productId') productId: string,
    @Body() body: { rating: number; comment: string },
  ) {
    return this.reviewsService.create(req.user.id, { productId, ...body });
  }
}
