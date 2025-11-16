import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  AfterCreate,
  AfterUpdate,
  AfterDestroy,
} from 'sequelize-typescript';
import { Organization } from './organization.model';
import { Order } from './order.model';
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { logger } from '../../config/logger';

export interface UserCreationAttributes {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  organizationId: number;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<
  InferAttributes<User>,
  UserCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare firstName: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare lastName: string;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  declare email: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare organizationId: number;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare dateCreated: CreationOptional<Date>;

  @BelongsTo(() => Organization, { onDelete: 'RESTRICT' })
  declare organization: NonAttribute<Organization>;

  @HasMany(() => Order)
  declare orders: NonAttribute<Order[]>;

  @AfterCreate
  static logCreate(instance: User) {
    logger.info(
      `User created: ${instance.id} (${instance.firstName} ${instance.lastName})`
    );
  }

  @AfterUpdate
  static logUpdate(instance: User) {
    logger.info(
      `User updated: ${instance.id} (${instance.firstName} ${instance.lastName})`
    );
  }

  @AfterDestroy
  static logDelete(instance: User) {
    logger.info(
      `User deleted: ${instance.id} (${instance.firstName} ${instance.lastName})`
    );
  }

}
