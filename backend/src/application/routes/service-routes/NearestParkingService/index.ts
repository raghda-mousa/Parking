import { Router } from 'express';
import { getRouter } from './get'

const BASE_URL = '/v1/nearestParkingService';

const nearestParkingServiceRouter = Router();

nearestParkingServiceRouter.use(BASE_URL, getRouter);


export { nearestParkingServiceRouter };