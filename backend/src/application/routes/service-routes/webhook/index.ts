import { Router } from 'express';
import { createRouter } from './create'

const BASE_URL = '/v1/webhook';

const webhookRouter = Router();

webhookRouter.use(BASE_URL, createRouter);


export { webhookRouter };