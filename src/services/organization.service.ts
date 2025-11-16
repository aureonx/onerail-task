import { StatusCodes } from "http-status-codes";
import { OrganizationCreationAttributes } from "../database/models/organization.model";
import { OrganizationDto } from "../dtos/organization.dto";
import { organizationRepository } from "../repositories/organization.repository";
import { HttpException } from "../utilis/http-exception";
import { mapToOrganizationDto } from "../utilis/mappers/organization.mapper";

class OrganizationService {
  public async getPaginatedOranizations(page: number, limit: number): Promise<OrganizationDto[]> {
    const organizations = await organizationRepository.findAllPaginated(page, limit);
    return organizations.map(mapToOrganizationDto);
  }

  public async getOrganizationById(id: number): Promise<OrganizationDto | null> {
    const organization = await organizationRepository.findById(id);

    return organization ? mapToOrganizationDto(organization) : null;
  }

  public async createOrganization(data: OrganizationCreationAttributes): Promise<OrganizationDto> {
    const newOrganization = await organizationRepository.create(data);

    return mapToOrganizationDto(newOrganization);
  }

  public async updateOrganization(id: number, data: Partial<OrganizationCreationAttributes>): Promise<OrganizationDto | null> {

    const [affectedCount] = await organizationRepository.update(id, data);

    if (affectedCount === 0) {
      return null;
    }

    return this.getOrganizationById(id);
  }

  public async deleteOrganization(id: number): Promise<void> {
    const organization = await organizationRepository.findByIdWithUsers(id);

    if (!organization) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Organization not found");
    }

    if (organization.users.length > 0) {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Can't delete organization with users!");
    }

    await organization.destroy();
  }
}

export const organizationService = new OrganizationService();