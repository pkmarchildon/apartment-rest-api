import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import apiV1Router from './routes/v1/v1.router.js';

const app = express();

/* Middlewares */
// Security
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

// Logging
app.use(morgan('combined'));

// Others
app.use(express.json());

/* Routes */
app.use('/v1', apiV1Router);

export default app;
