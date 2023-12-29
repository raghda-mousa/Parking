import { Router } from 'express';
import { createRouter } from './create'
import { updateRouter } from './update'
import { getRouter } from './get'
import { deleteRouter } from './delete'

const BASE_URL = '/v1/payment';

const paymentRouter = Router();

paymentRouter.use(BASE_URL, createRouter);
paymentRouter.use(BASE_URL, updateRouter);
paymentRouter.use(BASE_URL, getRouter);
paymentRouter.use(BASE_URL, deleteRouter);


export { paymentRouter };