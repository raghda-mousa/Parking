import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import {ResponseService, UserService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('id must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params
        const userService = new UserService();
        const result = await userService.deleteUser(id);
        if (result) {
            return ResponseService.sendSuccess(res, result, 'deleted successfully')
        }
        return ResponseService.sendNotFound(res, `user with id [${id}] cannot be found`)
    }
);

export { router as deleteRouter };