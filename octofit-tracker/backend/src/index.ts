import express from 'express';
import { connectToDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api', apiRouter);

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exit(1);
});