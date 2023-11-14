import { Router } from 'express';
import { loginRouter } from './login'

const BASE_URL = '/v1/auth';

const authRouter = Router();

authRouter.use(BASE_URL, loginRouter);


export { authRouter };