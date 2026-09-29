import { connectToDatabase } from './config/database.js';
import app, { baseUrl, port } from './server.js';

async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl} (port ${port})`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exit(1);
});