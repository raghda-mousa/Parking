import { Router } from 'express';
import { createRouter } from './create'
import { updateRouter } from './update'
import { getRouter } from './get'
import { deleteRouter } from './delete'

const BASE_URL = '/v1/reservation';

const reservationsRouter = Router();

reservationsRouter.use(BASE_URL, createRouter);
reservationsRouter.use(BASE_URL, updateRouter);
reservationsRouter.use(BASE_URL, getRouter);
reservationsRouter.use(BASE_URL, deleteRouter);


export { reservationsRouter };