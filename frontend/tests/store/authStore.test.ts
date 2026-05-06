import { describe, it, expect } from 'vitest';
import { authStore } from '../src/store/authStore';

describe('authStore', () => {
  it('should have initial state', () => {
    const state = authStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should set user', () => {
    const testUser = { id: '1', email: 'test@test.com', name: 'Test', createdAt: '', updatedAt: '' };
    authStore.getState().setUser(testUser);
    expect(authStore.getState().user).toEqual(testUser);
  });

  it('should set token', () => {
    authStore.getState().setToken('test-token');
    expect(authStore.getState().token).toBe('test-token');
  });

  it('should clear user and token on logout', () => {
    authStore.getState().setUser({ id: '1', email: 'test@test.com', name: 'Test', createdAt: '', updatedAt: '' });
    authStore.getState().setToken('test-token');
    authStore.getState().setUser(null);
    authStore.getState().setToken(null);
    expect(authStore.getState().user).toBeNull();
    expect(authStore.getState().token).toBeNull();
  });
});