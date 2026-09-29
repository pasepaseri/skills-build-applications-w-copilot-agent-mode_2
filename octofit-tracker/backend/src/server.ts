import express from 'express';
import apiRouter from './routes/index.js';

const app = express();

export const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

app.use((request, response, next) => {
  const origin = request.get('Origin');
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Vary', 'Origin');
  }
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api', apiRouter);

export default app;