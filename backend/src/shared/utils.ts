import { randomBytes } from 'crypto';

export function generateId(): string {
  return randomBytes(12).toString('hex');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function parseOptionalInt(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function parseOptionalString(value: string | undefined, defaultValue: string): string {
  return value ?? defaultValue;
}