import express, { Router,Request, Response } from 'express';
import { body } from 'express-validator';
import { ParkingService, ResponseService } from '@services';
import { Validation } from '@middlewares';
import { ECities } from 'application/models/parking/enums';

const router = express.Router();

router.post(
    '/',
    body('name').notEmpty().withMessage('Name must be provided').bail().isString().withMessage('Name must be a valid string'),
    body('city').notEmpty().withMessage('City must be provided').bail().isIn(Object.values(ECities)).withMessage(`City must be a valid city of ${Object.values(ECities).join(',')}`),
    body('numberOfSlots').notEmpty().withMessage('Number of slots must be provided').bail().isInt({ min: 1, max: 50 }).withMessage('Number of slots must be a valid number between 1 and 50'),
    body('location.type').notEmpty().withMessage('Location type must be provided').bail().isString().withMessage('Location type must be a string'),
    body('location.coordinates').notEmpty().withMessage('Location coordinates must be provided').bail().isArray({ min: 2, max: 2 }).withMessage('Location coordinates must be an array of 2 elements')
        .bail().custom((value: number[]) => {
            const isValid = value.every((element) => typeof element === 'number');
            if (!isValid) {
                throw new Error('Each coordinate in coordinates array must be a number');
            }
            return true;
        }),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { name, city, numberOfSlots, location } = req.body;
        const parkingService = new ParkingService();
        const result = await parkingService.create({ name, city, numberOfSlots, userId: req.user.id, location });
        if (result) {
            return ResponseService.sendSuccess(res, result, 'Created successfully');
        }
        return ResponseService.sendAlreadyCreated(res, `Parking lot with name [${name}] already exists`);
    }
);

export { router as createRouter };
