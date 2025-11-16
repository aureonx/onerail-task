import { Organization } from '../../database/models/organization.model';
import { OrganizationDto } from '../../dtos/organization.dto';

export function mapToOrganizationDto(organization: Organization): OrganizationDto {
  return {
    id: organization.id,
    name: organization.name,
    industry: organization.industry,
    dateFounded: organization.dateFounded
  };
};