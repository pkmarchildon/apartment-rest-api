import http from 'http';
import * as dotenv from 'dotenv';

import { mongoConnect } from './services/mongo.js';
import app from './app.js';

dotenv.config();

const server = http.createServer(app);

const PORT = 3000;

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
