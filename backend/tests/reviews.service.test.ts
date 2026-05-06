import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../src/reviews/reviews.service';

describe('ReviewsService', () => {
  let reviewsService: ReviewsService;
  const testUserId = 'test-user-123';
  const testProductId = 'test-product-456';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService],
    }).compile();

    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  describe('findByProduct', () => {
    it('should return empty array for product with no reviews', async () => {
      const result = await reviewsService.findByProduct(testProductId);
      expect(result).toEqual([]);
    });

    it('should return reviews for a product', async () => {
      await reviewsService.create(testUserId, {
        productId: testProductId,
        rating: 5,
        comment: 'Great product!',
      });

      const result = await reviewsService.findByProduct(testProductId);

      expect(result.length).toBe(1);
      expect(result[0].productId).toBe(testProductId);
      expect(result[0].rating).toBe(5);
    });

    it('should only return reviews for the specified product', async () => {
      await reviewsService.create(testUserId, {
        productId: testProductId,
        rating: 5,
        comment: 'Great!',
      });
      await reviewsService.create('another-user', {
        productId: 'other-product',
        rating: 3,
        comment: 'OK',
      });

      const result = await reviewsService.findByProduct(testProductId);

      expect(result.length).toBe(1);
      expect(result[0].productId).toBe(testProductId);
    });
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const result = await reviewsService.create(testUserId, {
        productId: testProductId,
        rating: 5,
        comment: 'Excellent product!',
      });

      expect(result).toHaveProperty('id');
      expect(result.productId).toBe(testProductId);
      expect(result.userId).toBe(testUserId);
      expect(result.rating).toBe(5);
      expect(result.comment).toBe('Excellent product!');
      expect(result).toHaveProperty('createdAt');
    });

    it('should create multiple reviews for same product', async () => {
      await reviewsService.create(testUserId, {
        productId: testProductId,
        rating: 4,
        comment: 'Good',
      });

      const result = await reviewsService.create('another-user', {
        productId: testProductId,
        rating: 5,
        comment: 'Excellent',
      });

      const reviews = await reviewsService.findByProduct(testProductId);
      expect(reviews.length).toBe(2);
    });
  });
});