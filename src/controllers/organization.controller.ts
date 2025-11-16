import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatedRequest } from '../middleware/validation.middleware';
import { organizationService } from '../services/organization.service';
import { HttpException } from '../utilis/http-exception';
import { createOrganizationSchema, updateOrganizationSchema } from '../validators/organization.validator';
import { paginationSchema } from '../validators/pagination.validator';
import { paramIdSchema } from '../validators/param-id.validator';

class OrganizationController {
  async getAll(req: ValidatedRequest<typeof paginationSchema>, res: Response): Promise<void> {
    const { page, limit } = req.validatedQuery;

    const organizations = await organizationService.getPaginatedOranizations(page, limit);

    res.status(StatusCodes.OK).json({
      data: organizations,
      page: req.validatedQuery.page,
      limit: req.validatedQuery.limit
    });
  }

  async getById(req: ValidatedRequest<typeof paramIdSchema>, res: Response): Promise<void> {
    const id = req.validatedParams.id;
    const organization = await organizationService.getOrganizationById(id);

    if (!organization) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Organization not found");
    }

    res.status(StatusCodes.OK).json(organization);
  }

  async create(req: ValidatedRequest<typeof createOrganizationSchema>, res: Response): Promise<void> {
    const newOrganization = await organizationService.createOrganization(req.validatedBody);

    res.status(StatusCodes.CREATED).json(newOrganization);
  }

  async update(req: ValidatedRequest<typeof updateOrganizationSchema>, res: Response) {
    const id = req.validatedParams.id;

    const updatedOrganization = await organizationService.updateOrganization(id, req.validatedBody);

    if (!updatedOrganization) {
      throw new HttpException(StatusCodes.NOT_FOUND, "Organization not found");
    }

    res.status(200).json(updatedOrganization);
  }

  async delete(req: ValidatedRequest<typeof paramIdSchema>, res: Response): Promise<void> {
    const id = req.validatedParams.id;

    await organizationService.deleteOrganization(id);

    res.status(StatusCodes.NO_CONTENT).send();
  }
}

export const organizationController = new OrganizationController();