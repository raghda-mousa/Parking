import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ResponseService, UserService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.put(
    '/:id',
    body('name').notEmpty().withMessage('name must be provided').bail().isString().withMessage('name must be a valid string'),
    body('password').notEmpty().withMessage('password must be provided').bail().isString().withMessage('password must be a valid string'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { name, password } = req.body
        const { id } = req.params
        const userService = new UserService();
        const result = await userService.findByIdAndUpdate({ id, name, password });
        if (result) {
            return ResponseService.sendSuccess(res, result, 'updated successfully')
        }
        return ResponseService.sendAlreadyCreated(res, `user with id [${id}] cannot be found`)
    }
);

export { router as updateRouter };