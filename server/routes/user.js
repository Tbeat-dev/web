import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET ?? 'dev-only-change-me';

/**
 * Middleware xác thực JWT
 * Gắn req.userId nếu token hợp lệ
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, message: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Invalid or expired token' });
  }
}

/**
 * GET /api/user/me
 * Trả thông tin đầy đủ của user đang đăng nhập (có role, plan, created_at)
 */
router.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, plan, created_at FROM users WHERE id = ? LIMIT 1',
      [req.userId]
    );

    if (!rows[0]) {
      return res.status(404).json({ ok: false, message: 'User not found' });
    }

    res.json({ ok: true, user: rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Failed to fetch user', error: error.message });
  }
});

export default router;
