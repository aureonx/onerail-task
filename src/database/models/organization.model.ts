import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
  AfterCreate,
  AfterUpdate,
  AfterDestroy,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Order } from './order.model';
import type { CreationOptional, InferAttributes, NonAttribute } from 'sequelize';
import { logger } from '../../config/logger';

export interface OrganizationCreationAttributes {
  name: string;
  industry: string;
  dateFounded: string;
}

@Table({ tableName: 'organizations', timestamps: false })
export class Organization extends Model<
  InferAttributes<Organization>,
  OrganizationCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare industry: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare dateFounded: string;

  @HasMany(() => User)
  declare users: NonAttribute<User[]>;

  @HasMany(() => Order)
  declare orders: NonAttribute<Order[]>;


  @AfterCreate
  static logCreate(instance: Organization) {
    logger.info(`Organization created: ${instance.id} (${instance.name})`);
  }

  @AfterUpdate
  static logUpdate(instance: Organization) {
    logger.info(`Organization updated: ${instance.id} (${instance.name})`);
  }

  @AfterDestroy
  static logDelete(instance: Organization) {
    logger.info(`Organization deleted: ${instance.id} (${instance.name})`);
  }
}
