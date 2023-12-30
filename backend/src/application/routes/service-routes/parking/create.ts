import express, { Router,Request, Response } from 'express';
import { body } from 'express-validator';
import { ParkingService, ResponseService } from '@services';
import { Validation } from '@middlewares';
import { ECities } from 'application/models/parking/enums';

// parkingRoutes.ts

const router = express.Router();

router.post(
    '/',
    body('name').notEmpty().withMessage('name must be provided').bail().isString().withMessage('name must be a valid string'),
    body('city').notEmpty().withMessage('city must be provided').bail().isIn(Object.values(ECities)).withMessage(`city must be a valid city of ${Object.values(ECities).join(',')}`),
    body('numberOfSlots').notEmpty().withMessage('number of slots must be provided').bail().isInt({min:1,max:50}).withMessage('number of slots must be a valid number bteween 1 and 50'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { name,city,numberOfSlots } = req.body
        const parkingService = new ParkingService();
        const result = await parkingService.create({ name,city,numberOfSlots,userId:req.user.id });
        if (result) {
            return ResponseService.sendSuccess(res, result, 'created successfully')
        }
        return ResponseService.sendAlreadyCreated(res, `parking lot with name [${name}] already exist`)
    }
);

export { router as createRouter };