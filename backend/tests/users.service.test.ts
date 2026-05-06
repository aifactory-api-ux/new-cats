import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const result = await usersService.create({
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashedpassword',
      });

      expect(result).toHaveProperty('id');
      expect(result.email).toBe('test@example.com');
      expect(result.name).toBe('Test User');
      expect(result.passwordHash).toBe('hashedpassword');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });
  });

  describe('findByEmail', () => {
    it('should find an existing user by email', async () => {
      await usersService.create({
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashedpassword',
      });

      const result = await usersService.findByEmail('test@example.com');
      expect(result).not.toBeNull();
      expect(result?.email).toBe('test@example.com');
    });

    it('should return null for non-existent email', async () => {
      const result = await usersService.findByEmail('nonexistent@example.com');
      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find an existing user by id', async () => {
      const created = await usersService.create({
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashedpassword',
      });

      const result = await usersService.findById(created.id);
      expect(result).not.toBeNull();
      expect(result?.id).toBe(created.id);
    });

    it('should return null for non-existent id', async () => {
      const result = await usersService.findById('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('toDto', () => {
    it('should convert user record to DTO', async () => {
      const created = await usersService.create({
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashedpassword',
      });

      const dto = await usersService.toDto(created);
      expect(dto.id).toBe(created.id);
      expect(dto.email).toBe('test@example.com');
      expect(dto.name).toBe('Test User');
      expect(dto).not.toHaveProperty('passwordHash');
    });
  });
});