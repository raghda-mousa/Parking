import { Router } from 'express';
import { createRouter } from './create'
import { updateRouter } from './update'
import { getRouter } from './get'
import { deleteRouter } from './delete'

const BASE_URL = '/v1/parking';

const parkingsRouter = Router();

parkingsRouter.use(BASE_URL, createRouter);
parkingsRouter.use(BASE_URL, updateRouter);
parkingsRouter.use(BASE_URL, getRouter);
parkingsRouter.use(BASE_URL, deleteRouter);


export { parkingsRouter };