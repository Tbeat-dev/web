import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.API_PORT ?? 4000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://127.0.0.1:3000';

app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/api/health', (request, response) => {
  response.json({ ok: true, service: 'newweb-api' });
});

app.get('/api/db-test', async (request, response) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok, NOW() AS serverTime');
    response.json({ ok: true, database: rows[0] });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`API server running at http://127.0.0.1:${port}`);
});

// Phục vụ frontend tĩnh trong môi trường Production
// Đặt sau tất cả các route API
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all: Mọi request không phải API sẽ trả về index.html để React Router xử lý
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});
