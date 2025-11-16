import { organizationRepository } from '../../repositories/organization.repository';
import { organizationService } from '../organization.service';
import { afterEach, describe, expect, it, jest } from '@jest/globals';

describe('OrganizationService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw when deleting non-existing organization', async () => {
    jest.spyOn(organizationRepository, 'findByIdWithUsers' as any).mockResolvedValue(null);

    await expect(organizationService.deleteOrganization(10)).rejects.toThrow('Organization not found');
  });

  it("should throw when organization has users", async () => {
    const orgWithUsers = { id: 1, users: [{ id: 2 }] } as any;
    jest.spyOn(organizationRepository, 'findByIdWithUsers' as any).mockResolvedValue(orgWithUsers);

    await expect(organizationService.deleteOrganization(1)).rejects.toThrow("Can't delete organization with users!");
  });

  it('should delete organization when no users', async () => {
    const org = {
      id: 2,
      users: [],
      destroy: jest.fn()
    } as any;
    jest.spyOn(organizationRepository, 'findByIdWithUsers').mockResolvedValue(org);

    await expect(organizationService.deleteOrganization(2)).resolves.toBeUndefined();
    expect(org.destroy).toHaveBeenCalled();
  });
});
