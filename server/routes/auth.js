import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET ?? 'dev-only-change-me';

router.post('/login', async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400).json({
      ok: false,
      message: 'Email and password are required'
    });
    return;
  }

  try {
    const [users] = await pool.execute(
      'SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    const user = users[0];

    if (!user) {
      response.status(401).json({
        ok: false,
        message: 'Invalid email or password'
      });
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      response.status(401).json({
        ok: false,
        message: 'Invalid email or password'
      });
      return;
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    response.json({
      ok: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error); // ADDED LOGGING
    response.status(500).json({
      ok: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

router.post('/register', async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response.status(400).json({
      ok: false,
      message: 'Name, email and password are required'
    });
    return;
  }

  try {
    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (existingUsers.length > 0) {
      response.status(400).json({
        ok: false,
        message: 'Email already registered'
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    response.status(201).json({
      ok: true,
      message: 'User registered successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error); // ADDED LOGGING
    response.status(500).json({
      ok: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

export default router;
