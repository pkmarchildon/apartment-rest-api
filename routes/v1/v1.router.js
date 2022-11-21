import express from 'express';

import apartmentsRouter from './apartments/apartments.router.js';

const apiV1Router = express.Router();

apiV1Router.use('/apartments', apartmentsRouter);

export default apiV1Router;
