import { OrganizationDto } from "./organization.dto";
import { UserDto } from "./user.dto";

export interface OrderDto {
  id: number;
  orderDate: Date;
  totalAmount: number;
  userId: number;
  organizationId: number;
}

export interface OrderExtendedDto extends OrderDto {
  user: UserDto;
  organization: OrganizationDto;
}
