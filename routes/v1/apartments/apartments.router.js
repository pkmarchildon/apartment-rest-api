import express from 'express';

import { httpGetAllApartments } from './apartments.controler.js';

const apartmentsRouter = express.Router();

apartmentsRouter.get('/', httpGetAllApartments);

export default apartmentsRouter;
