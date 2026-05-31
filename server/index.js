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

// Render requires the PORT environment variable and binding to 0.0.0.0
const port = process.env.PORT || process.env.API_PORT || 4000;

// CORS: Allow Render domain or all for connectivity
app.use(cors());

app.use(express.json());

// 1. API Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'newweb-api', timestamp: new Date().toISOString() });
});

app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok, NOW() AS serverTime');
    res.json({ ok: true, database: rows[0] });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// 2. Serve static files from the 'dist' directory
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// 3. Catch-all: Use Regex compatible with Express 5 to serve index.html for non-API routes
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// 4. Start the server on 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
