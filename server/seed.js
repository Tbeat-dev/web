import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';

const demoUser = {
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'demo123456'
};

async function seed() {
  const passwordHash = await bcrypt.hash(demoUser.password, 12);

  await pool.execute(
    `INSERT INTO users (name, email, password_hash)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       password_hash = VALUES(password_hash)`,
    [demoUser.name, demoUser.email, passwordHash]
  );

  console.log('Seeded demo user:');
  console.log(`Email: ${demoUser.email}`);
  console.log(`Password: ${demoUser.password}`);

  await pool.end();
}

seed().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
