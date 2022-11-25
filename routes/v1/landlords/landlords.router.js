import express from 'express';

import {
  httpGetLandlords,
  httpCreateLandlords,
  httpUpdateLandlords,
  httpDeleteLandlords
} from './landlords.controler.js';

const landlordsRouter = express.Router();

landlordsRouter.get('/', httpGetLandlords);
landlordsRouter.post('/', httpCreateLandlords);
landlordsRouter.put('/', httpUpdateLandlords);
landlordsRouter.delete('/', httpDeleteLandlords);

export default landlordsRouter;
