import express from 'express';

import apartmentsRouter from './apartments/apartments.router.js';
import tenantsRouter from './tenants/tenants.router.js';
import landlordsRouter from './landlords/landlords.router.js';

const apiV1Router = express.Router();

apiV1Router.use('/apartments', apartmentsRouter);
apiV1Router.use('/tenants', tenantsRouter);
apiV1Router.use('/landlords', landlordsRouter);

export default apiV1Router;
