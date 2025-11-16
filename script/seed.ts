import bcrypt from 'bcrypt';
import { Order } from '../src/database/models/order.model';
import { Organization } from '../src/database/models/organization.model';
import { User } from '../src/database/models/user.model';
import sequelize from '../src/config/database';

async function seed() {
  try {
    await sequelize.authenticate();

    const orgs = await Organization.bulkCreate([
      { name: 'Organization1', industry: 'Industry1', dateFounded: "2010-05-01" },
      { name: 'Organization2', industry: 'Industry2', dateFounded: "2015-09-10" },
    ]);

    const usersData = Array.from({ length: 10 }).map((_, i) => ({
      firstName: `User${i + 1}`,
      lastName: `Test${i + 1}`,
      email: `user${i + 1}@example.com`,
      organizationId: orgs[i % orgs.length]!.id,
      password: bcrypt.hashSync(`password${i + 1}`, 12),
    }));

    const users = await User.bulkCreate(usersData);

    const ordersData = Array.from({ length: 20 }).map((_, i) => ({
      orderDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      totalAmount: Math.floor(Math.random() * 1000) + 50,
      userId: users[i % users.length]!.id,
      organizationId: orgs[i % orgs.length]!.id,
    }));

    await Order.bulkCreate(ordersData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    process.exit();
  }
}

seed();
