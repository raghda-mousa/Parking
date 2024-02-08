import { Router } from 'express';
import { createRouter } from './create'
// import { getRouter } from './get'

const BASE_URL = '/v1/webhook';

const webhookRouter = Router();

webhookRouter.use(BASE_URL, createRouter);
// webhookRouter.use(BASE_URL, getRouter);


export { webhookRouter };