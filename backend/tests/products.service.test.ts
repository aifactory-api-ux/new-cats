import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/products/products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should return all products with pagination', async () => {
      const result = await productsService.findAll({});

      expect(result).toHaveProperty('products');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('limit');
      expect(result.products.length).toBeGreaterThan(0);
    });

    it('should filter products by category', async () => {
      const result = await productsService.findAll({ category: 'food' });

      expect(result.products.length).toBeGreaterThan(0);
      result.products.forEach(p => {
        expect(p.category).toBe('food');
      });
    });

    it('should filter products by search term in name', async () => {
      const result = await productsService.findAll({ search: 'Premium' });

      expect(result.products.length).toBeGreaterThan(0);
      expect(result.products[0].name.toLowerCase()).toContain('premium');
    });

    it('should filter products by search term in description', async () => {
      const result = await productsService.findAll({ search: 'cat food' });

      expect(result.products.length).toBeGreaterThan(0);
    });

    it('should paginate results', async () => {
      const result = await productsService.findAll({ page: 1, limit: 2 });

      expect(result.products.length).toBeLessThanOrEqual(2);
      expect(result.limit).toBe(2);
    });

    it('should handle page 2 pagination', async () => {
      const result = await productsService.findAll({ page: 2, limit: 2 });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(2);
    });
  });

  describe('findById', () => {
    it('should return a product by id', async () => {
      const allProducts = await productsService.findAll({});
      const firstProduct = allProducts.products[0];

      const result = await productsService.findById(firstProduct.id);

      expect(result.id).toBe(firstProduct.id);
      expect(result.name).toBe(firstProduct.name);
    });

    it('should throw NotFoundException for non-existent id', async () => {
      await expect(productsService.findById('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        description: 'A brand new product',
        price: 99.99,
        imageUrl: 'https://example.com/image.jpg',
        stock: 100,
        category: 'accessories',
      };

      const result = await productsService.create(newProduct);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe('New Product');
      expect(result.price).toBe(99.99);
      expect(result.rating).toBe(0);
      expect(result.numReviews).toBe(0);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const allProducts = await productsService.findAll({});
      const product = allProducts.products[0];

      const updated = await productsService.update(product.id, { price: 39.99 });

      expect(updated.price).toBe(39.99);
      expect(updated.name).toBe(product.name);
    });

    it('should throw NotFoundException when updating non-existent product', async () => {
      await expect(
        productsService.update('non-existent-id', { price: 39.99 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing product', async () => {
      const allProducts = await productsService.findAll({});
      const product = allProducts.products[0];

      const result = await productsService.delete(product.id);

      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundException when deleting non-existent product', async () => {
      await expect(productsService.delete('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
});