import express, { Request, Response } from 'express';
import { query, param } from 'express-validator';
import { ParkingService, ResponseService } from '@services';
import { Validation } from '@middlewares';

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
        const parkingService = new ParkingService();
        const result = await parkingService.list(req.query.page as string, req.query.limit as string, req.query.searchKey as string);
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
        const parkingService = new ParkingService();
        const result = await parkingService.getParkingById(id);
        if (result) {
            return ResponseService.sendSuccess(res, result, 'retrieved successfully')
        }
        return ResponseService.sendNotFound(res, `parking-lot with id [${id}] cannot be found`)
    }
);

export { router as getRouter };