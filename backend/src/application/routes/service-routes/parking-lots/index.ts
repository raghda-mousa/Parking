import { Router } from 'express';
import { createRouter } from './create'
import { updateRouter } from './update'
import { getRouter } from './get'
import { deleteRouter } from './delete'

const BASE_URL = '/v1/parking-lots';

const parkingLotsRouter = Router();

parkingLotsRouter.use(BASE_URL, createRouter);
parkingLotsRouter.use(BASE_URL, updateRouter);
parkingLotsRouter.use(BASE_URL, getRouter);
parkingLotsRouter.use(BASE_URL, deleteRouter);


export { parkingLotsRouter };