import express, { Request, Response } from 'express';
import { query, param } from 'express-validator';
import { Validation } from '@middlewares';
import { ResponseService, UserService } from '@services';

const router = express.Router();

router.get(
    '/list',
    query('page').optional().isInt().withMessage('page must be a valid number').toInt(),
    query('limit')
        .optional()
        .isInt({ gt: 0, lt: 31 })
        .withMessage('limit must be a valid number between 1 and 30 (inclusive)')
        .toInt(),
    query('searchKey').optional().isString(),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const userService = new UserService();
        const result = await userService.list(req.query.page as string, req.query.limit as string, req.query.searchKey as string);
        return ResponseService.sendSuccess(res, result, 'retrieved successfully')
    }
);

router.get(
    '/:id',
    param('id').isMongoId().withMessage('id must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params
        console.log({ id })
        const userService = new UserService();
        const result = await userService.getUserById(id);
        if (result) {
            return ResponseService.sendSuccess(res, result, 'retrieved successfully')
        }
        return ResponseService.sendNotFound(res, `user with id [${id}] cannot be found`)
    }
);

export { router as getRouter };