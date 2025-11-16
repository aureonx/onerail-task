import { Organization } from '../../database/models/organization.model';
import { userRepository } from '../../repositories/user.repository';
import { userService } from '../user.service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('UserService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw when creating user with non-existing organization', async () => {
    jest.spyOn(Organization, 'findByPk').mockResolvedValue(null);

    await expect(
      userService.createUser({
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: 'pass',
        organizationId: 999,
      })
    ).rejects.toThrow('Organization with id 999 does not exist');
  });

  it('should create user when organization exists', async () => {
    jest.spyOn(Organization, 'findByPk').mockResolvedValue({ id: 1 } as any);

    const created = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      organizationId: 1,
      dateCreated: '2020-01-01',
      password: 'hashed'
    } as any;

    jest.spyOn(userRepository, 'create').mockResolvedValue(created);

    const result = await userService.createUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'pass',
      organizationId: 1,
    });

    expect(result).toMatchObject({ id: 1, firstName: 'John', email: 'john@example.com' });
  });

  it('should throw when deleting non-existing user', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    await expect(userService.deleteUser(123)).rejects.toThrow('User not found');
  });
});
