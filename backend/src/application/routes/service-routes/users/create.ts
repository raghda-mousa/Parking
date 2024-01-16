import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Validation } from '@middlewares';
import { ResponseService, UserService } from '@services';
import { EUserType } from 'application/models/users/enums';

const router = express.Router();

router.post(
    '/',
    body('name').notEmpty().withMessage('name must be provided').bail().isString().withMessage('name must be a valid string'),
    body('password').notEmpty().withMessage('password must be provided').bail().isString().withMessage('password must be a valid string'),
    body('email').notEmpty().withMessage('email must be provided').bail().isEmail().withMessage('email must be a valid email'),
    // body('type').notEmpty().withMessage('type must be provided').bail().isIn(Object.values(EUserType)).withMessage(`type must be a valid type of ${Object.values(EUserType).join(',')}`),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { name, email, password ,type} = req.body
        const userService = new UserService();
        const result = await userService.create({ name, email, password});
        if (result) {
            return ResponseService.sendSuccess(res, result, 'created successfully')
        }
        return ResponseService.sendAlreadyCreated(res, `user with email ${email} already exist`);
    }
);

export { router as createRouter };