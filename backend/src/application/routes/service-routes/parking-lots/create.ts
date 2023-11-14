import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ParkingLotService, ResponseService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.post(
    '/',
    body('name').notEmpty().withMessage('name must be provided').bail().isString().withMessage('name must be a valid string'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { name } = req.body
        const parkingLotService = new ParkingLotService();
        const result = await parkingLotService.create({ name });
        if (result) {
            return ResponseService.sendSuccess(res, result, 'created successfully')
        }
        return ResponseService.sendAlreadyCreated(res, `parking lot with name [${name}] already exist`)
    }
);

export { router as createRouter };