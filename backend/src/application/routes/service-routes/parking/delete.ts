import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { ParkingService, ResponseService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.delete(
    '/:id',
    param('id').optional().isMongoId().withMessage('id must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params
        const parkingService = new ParkingService();
        const result = await parkingService.findByIdAndDelete(id);
        if (result) {
            return ResponseService.sendSuccess(res, result, 'deleted successfully')
        }
        return ResponseService.sendNotFound(res, `parking lot with id [${id}] cannot be found`)
    }
);

export { router as deleteRouter };