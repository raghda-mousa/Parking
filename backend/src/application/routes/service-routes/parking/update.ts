import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ParkingService, ResponseService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.put(
    '/:id',
    body('name').notEmpty().withMessage('name must be provided').bail().isString().withMessage('name must be a valid string'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { name } = req.body
        const { id } = req.params
        const parkingService = new ParkingService();
        const result = await parkingService.findByIdAndUpdate({ id, name });
        if (result) {
            return ResponseService.sendSuccess(res, result, 'updated successfully')
        }
        return ResponseService.sendAlreadyCreated(res, `parking lot with id [${id}] cannot be found`)
    }
);

export { router as updateRouter };