import express from 'express';

import {
  httpGetTenants,
  httpCreateTenants,
  httpUpdateTenants,
  httpDeleteTenants
} from './tenants.controler.js';

const tenantsRouter = express.Router();

tenantsRouter.get('/', httpGetTenants);
tenantsRouter.post('/', httpCreateTenants);
tenantsRouter.put('/', httpUpdateTenants);
tenantsRouter.delete('/', httpDeleteTenants);

export default tenantsRouter;
