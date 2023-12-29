import { Router } from 'express';
import { getRouter } from './get'

const BASE_URL = '/v1/userLocation';

const userLocationRouter = Router();

userLocationRouter.use(BASE_URL, getRouter);


export { userLocationRouter };