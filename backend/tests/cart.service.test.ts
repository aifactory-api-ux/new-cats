import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../src/cart/cart.service';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let cartService: CartService;
  const testUserId = 'test-user-123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    cartService = module.get<CartService>(CartService);
  });

  describe('getCart', () => {
    it('should return an empty cart for a new user', async () => {
      const result = await cartService.getCart(testUserId);

      expect(result).toHaveProperty('id');
      expect(result.userId).toBe(testUserId);
      expect(result.items).toEqual([]);
    });

    it('should return existing cart for user', async () => {
      await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 2 });

      const result = await cartService.getCart(testUserId);

      expect(result.items.length).toBe(1);
      expect(result.items[0].productId).toBe('prod-1');
    });
  });

  describe('addItem', () => {
    it('should add a new item to the cart', async () => {
      const result = await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 2 });

      expect(result.items.length).toBe(1);
      expect(result.items[0].productId).toBe('prod-1');
      expect(result.items[0].quantity).toBe(2);
    });

    it('should increase quantity if item already exists', async () => {
      await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 2 });
      const result = await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 3 });

      expect(result.items.length).toBe(1);
      expect(result.items[0].quantity).toBe(5);
    });
  });

  describe('updateItem', () => {
    it('should update item quantity', async () => {
      await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 2 });

      const result = await cartService.updateItem(testUserId, 'prod-1', 5);

      expect(result.items[0].quantity).toBe(5);
    });

    it('should throw NotFoundException for non-existent item', async () => {
      await expect(
        cartService.updateItem(testUserId, 'non-existent-prod', 5),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', async () => {
      await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 2 });
      await cartService.addItem(testUserId, { productId: 'prod-2', quantity: 1 });

      const result = await cartService.removeItem(testUserId, 'prod-1');

      expect(result.items.length).toBe(1);
      expect(result.items[0].productId).toBe('prod-2');
    });

    it('should remove only the specified item', async () => {
      await cartService.addItem(testUserId, { productId: 'prod-1', quantity: 2 });
      await cartService.addItem(testUserId, { productId: 'prod-2', quantity: 1 });

      const result = await cartService.removeItem(testUserId, 'prod-1');

      expect(result.items.find(i => i.productId === 'prod-2')).toBeDefined();
    });
  });
});