import { UserService } from '@services';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ResponseService } from '@services'
import { Validation } from '@middlewares';
const router = express.Router();

router.post(
    '/login',
    body('email').notEmpty().withMessage('email must be provided').bail().isEmail().withMessage('email must be a valid email address'),
    body('password').notEmpty().withMessage('password must be provided').bail().isString().withMessage('password must be a valid string'),
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        const userService = new UserService();
        const result = await userService.login(email, password);
        if (result) {
            return ResponseService.sendSuccess(res, result, 'logged in successfully')
        }
        else {
            return ResponseService.sendUnauthorized(res, 'Unauthorized')
        }
    }
);

export { router as loginRouter };