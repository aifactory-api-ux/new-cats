import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto, ProductCreateDto, ProductUpdateDto } from './dto/product.dto';
import { generateId, formatDate, parseOptionalInt, parseOptionalString } from '../shared/utils';

interface ProductRecord {
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

@Injectable()
export class ProductsService {
  private products: Map<string, ProductRecord> = new Map();

  constructor() {
    this.seedProducts();
  }

  private seedProducts() {
    const seedData: Omit<ProductRecord, 'id' | 'createdAt' | 'updatedAt'>[] = [
      { name: 'Premium Cat Food', description: 'High-quality cat food for all breeds', price: 29.99, imageUrl: 'https://placekitten.com/400/400', rating: 4.5, numReviews: 12, stock: 50, category: 'food' },
      { name: 'Interactive Mouse Toy', description: 'Smart toy that moves on its own', price: 19.99, imageUrl: 'https://placekitten.com/401/401', rating: 4.2, numReviews: 8, stock: 30, category: 'toys' },
      { name: 'Cozy Cat Bed', description: 'Soft and warm bed for your cat', price: 49.99, imageUrl: 'https://placekitten.com/402/402', rating: 4.8, numReviews: 20, stock: 15, category: 'beds' },
      { name: 'Cat Grooming Brush', description: 'Gentle grooming brush for long-haired cats', price: 14.99, imageUrl: 'https://placekitten.com/403/403', rating: 4.6, numReviews: 5, stock: 40, category: 'grooming' },
      { name: 'Cat Tower', description: 'Multi-level cat tree for climbing and scratching', price: 89.99, imageUrl: 'https://placekitten.com/404/404', rating: 4.7, numReviews: 15, stock: 10, category: 'accessories' },
    ];

    const now = formatDate(new Date());
    seedData.forEach(p => {
      const id = generateId();
      this.products.set(id, { ...p, id, createdAt: now, updatedAt: now });
    });
  }

  async findAll(query: { category?: string; search?: string; page?: number; limit?: number }): Promise<{ products: ProductDto[]; total: number; page: number; limit: number }> {
    let filtered = Array.from(this.products.values());

    if (query.category) {
      filtered = filtered.filter(p => p.category === query.category);
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower));
    }

    const total = filtered.length;
    const page = parseOptionalInt(query.page, 1);
    const limit = parseOptionalInt(query.limit, 10);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      products: paginated.map(p => this.toDto(p)),
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<ProductDto> {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toDto(product);
  }

  async create(dto: ProductCreateDto): Promise<ProductDto> {
    const id = generateId();
    const now = formatDate(new Date());
    const product: ProductRecord = {
      ...dto,
      id,
      rating: 0,
      numReviews: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.products.set(id, product);
    return this.toDto(product);
  }

  async update(id: string, dto: ProductUpdateDto): Promise<ProductDto> {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const updated: ProductRecord = {
      ...product,
      ...dto,
      updatedAt: formatDate(new Date()),
    };
    this.products.set(id, updated);
    return this.toDto(updated);
  }

  async delete(id: string): Promise<{ success: boolean }> {
    if (!this.products.has(id)) {
      throw new NotFoundException('Product not found');
    }
    this.products.delete(id);
    return { success: true };
  }

  private toDto(product: ProductRecord): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      rating: product.rating,
      numReviews: product.numReviews,
      stock: product.stock,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
