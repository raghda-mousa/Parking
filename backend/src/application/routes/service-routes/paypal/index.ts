import { Router } from 'express';
import { createRouter } from './create'
import { getRouter } from './get'

const BASE_URL = '/v1/paypal';

const paypalRouter = Router();

paypalRouter.use(BASE_URL, createRouter);
paypalRouter.use(BASE_URL, getRouter);


export { paypalRouter };