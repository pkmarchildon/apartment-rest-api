import express from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

import { mongoConnect } from './apartment-rest-api/services/mongo.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Middlewares
// Security
app.use(helmet());

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
