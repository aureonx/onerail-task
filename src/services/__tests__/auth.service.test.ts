import { authService } from '../auth.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userRepository } from '../../repositories/user.repository';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('AuthService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw when email not found', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null as any);

    await expect(authService.login('no@one.com', 'pass')).rejects.toThrow('Invalid email or password');
  });

  it('should throw when password invalid', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({ id: 1, password: 'hashed' } as any);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    await expect(authService.login('user@example.com', 'wrong')).rejects.toThrow('Invalid email or password');
  });

  it('should return token when credentials valid', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({ id: 1, password: 'hashed' } as any);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');


    const token = await authService.login('user@example.com', 'pass');

    expect(token).toBe('token');
  });
});
