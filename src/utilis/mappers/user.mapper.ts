import { User } from '../../database/models/user.model';
import { UserDto } from '../../dtos/user.dto';

export function mapToUserDto(user: User): UserDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    organizationId: user.organizationId,
    dateCreated: user.dateCreated,
  };
};