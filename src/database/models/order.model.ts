import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Organization } from './organization.model';
import { CreationOptional, InferAttributes, NonAttribute } from 'sequelize';

export interface OrderCreationAttributes {
  totalAmount: number;
  userId: number;
  organizationId: number;
}

@Table({ tableName: 'orders', timestamps: false })
export class Order extends Model<
  InferAttributes<Order>,
  OrderCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  declare orderDate: CreationOptional<Date>;

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare totalAmount: number;


  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare organizationId: number;

  @BelongsTo(() => User, { onDelete: 'SET NULL' })
  declare user: NonAttribute<User>;

  @BelongsTo(() => Organization, { onDelete: 'SET NULL' })
  declare organization: NonAttribute<Organization>;
}
