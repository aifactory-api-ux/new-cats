export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
export const PORT = parseInt(process.env.PORT || '8000', 10);
export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/cats';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const API_PREFIX = '/api';