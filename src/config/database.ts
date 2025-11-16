import { Sequelize } from 'sequelize-typescript';
import { Organization } from '../database/models/organization.model';
import { User } from '../database/models/user.model';
import { Order } from '../database/models/order.model';
import dotenv from 'dotenv';
import { logger } from './logger';

dotenv.config({ quiet: true });

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'db',
  port: Number(process.env.DB_PORT) || 3306,
  logging: (msg) => logger.debug(msg),
  models: [Organization, User, Order],
  validateOnly: false,
  define: {
    underscored: true,
  },
});

export default sequelize;