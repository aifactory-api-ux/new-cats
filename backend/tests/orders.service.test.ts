import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../src/orders/orders.service';
import { CartService } from '../src/cart/cart.service';
import { NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let cartService: CartService;
  const testUserId = 'test-user-123';

  const mockCartService = {
    getCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: CartService, useValue: mockCartService },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    cartService = module.get<CartService>(CartService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an order from cart', async () => {
      mockCartService.getCart.mockResolvedValue({
        id: 'cart-123',
        userId: testUserId,
        items: [{ productId: 'prod-1', quantity: 2 }],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });

      const result = await ordersService.create(testUserId, 'cart-123');

      expect(result).toHaveProperty('id');
      expect(result.userId).toBe(testUserId);
      expect(result.status).toBe('pending');
      expect(result.items.length).toBe(1);
    });

    it('should throw NotFoundException for empty cart', async () => {
      mockCartService.getCart.mockResolvedValue({
        id: 'cart-123',
        userId: testUserId,
        items: [],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });

      await expect(ordersService.create(testUserId, 'cart-123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByUser', () => {
    it('should return all orders for a user', async () => {
      mockCartService.getCart.mockResolvedValue({
        id: 'cart-123',
        userId: testUserId,
        items: [{ productId: 'prod-1', quantity: 2 }],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });

      await ordersService.create(testUserId, 'cart-123');

      const result = await ordersService.findByUser(testUserId);

      expect(result.length).toBeGreaterThan(0);
      result.forEach(order => {
        expect(order.userId).toBe(testUserId);
      });
    });

    it('should return empty array for user with no orders', async () => {
      const result = await ordersService.findByUser('user-with-no-orders');
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return an order by id', async () => {
      mockCartService.getCart.mockResolvedValue({
        id: 'cart-123',
        userId: testUserId,
        items: [{ productId: 'prod-1', quantity: 2 }],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      });

      const created = await ordersService.create(testUserId, 'cart-123');
      const result = await ordersService.findById(created.id);

      expect(result.id).toBe(created.id);
    });

    it('should throw NotFoundException for non-existent order', async () => {
      await expect(ordersService.findById('non-existent-order-id')).rejects.toThrow(NotFoundException);
    });
  });
});