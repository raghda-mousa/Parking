import { Router } from 'express';
import { createRouter } from './create'
import { getRouter } from './get'
import { deleteRouter } from './delete'
import { updateRouter } from './update'

const BASE_URL = '/v1/users';

const usersRouter = Router();

usersRouter.use(BASE_URL, createRouter);
usersRouter.use(BASE_URL, getRouter);
usersRouter.use(BASE_URL, deleteRouter);
usersRouter.use(BASE_URL, updateRouter);


export { usersRouter };