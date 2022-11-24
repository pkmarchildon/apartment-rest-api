import express from 'express';

import {
  httpGetApartments,
  httpCreateApartments,
  httpUpdateApartment,
  httpDeleteApartment
} from './apartments.controler.js';

const apartmentsRouter = express.Router();

apartmentsRouter.get('/', httpGetApartments);
apartmentsRouter.post('/', httpCreateApartments);
apartmentsRouter.put('/', httpUpdateApartment);
apartmentsRouter.delete('/', httpDeleteApartment);

export default apartmentsRouter;
