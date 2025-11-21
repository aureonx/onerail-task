import bcrypt from 'bcrypt';
import { Order } from '../src/database/models/order.model';
import { Organization } from '../src/database/models/organization.model';
import { User } from '../src/database/models/user.model';
import sequelize from '../src/config/database';

async function seed() {
  try {
    await sequelize.authenticate();

    const countOrganizations = await seedOrganizations();
    const countUsers = await seedUsers();
    const countOrders = await seedOrders();

    console.log(`Database seeded with ${(countOrganizations + countUsers + countOrders)} records`);
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    process.exit();
  }
}


async function seedOrganizations() {
  const countOrganizations = await Organization.count();

  if (countOrganizations) {
    console.log("Organizations already exist");
    return 0;
  }

  const result = await Organization.bulkCreate([
    { name: 'Organization1', industry: 'Industry1', dateFounded: "2010-05-01" },
    { name: 'Organization2', industry: 'Industry2', dateFounded: "2015-09-10" },
  ])

  return result.length;
}

async function seedUsers() {
  const countUsers = await User.count();

  if (countUsers) {
    console.log("Users already exist");
    return 0;
  }

  const organizations = await Organization.findAll({ limit: 10 });

  const usersData = Array.from({ length: 10 }).map((_, i) => ({
    firstName: `User${i + 1}`,
    lastName: `Test${i + 1}`,
    email: `user${i + 1}@example.com`,
    organizationId: organizations[i % organizations.length]!.id,
    password: bcrypt.hashSync(`password${i + 1}`, 12),
  }));

  const result = await User.bulkCreate(usersData);

  return result.length;
}


async function seedOrders() {

  const countOrders = await Order.count();

  if (countOrders) {
    console.log("Orders already exist");
    return 0;
  }

  const organizations = await Organization.findAll({ limit: 10 });
  const users = await User.findAll({ limit: 10 });

  const ordersData = Array.from({ length: 20 }).map((_, i) => ({
    orderDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    totalAmount: Math.floor(Math.random() * 1000) + 50,
    userId: users[i % users.length]!.id,
    organizationId: organizations[i % organizations.length]!.id,
  }));

  const result = await Order.bulkCreate(ordersData);

  return result.length;

}



seed();
