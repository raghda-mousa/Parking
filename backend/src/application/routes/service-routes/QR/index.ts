import { Router } from 'express';
import { getRouter } from './get'

const BASE_URL = '/v1/qrCode';

const qrCodeRouter = Router();

qrCodeRouter.use(BASE_URL, getRouter);

export { qrCodeRouter };