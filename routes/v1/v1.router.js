import express from 'express';

import apartmentsRouter from './apartments/apartments.router.js';
import tenantsRouter from './tenants/tenants.router.js';

const apiV1Router = express.Router();

apiV1Router.use('/apartments', apartmentsRouter);
apiV1Router.use('/tenants', tenantsRouter);

export default apiV1Router;
