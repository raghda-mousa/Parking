import express, { Router } from 'express';
import { Request, Response } from 'express';
import { ResponseService, NearestParkingService } from '@services';
import { Validation } from '@middlewares';
import { body } from 'express-validator';

const router = express.Router();

router.patch('/',
    body('location').notEmpty().withMessage('location must be provided').bail().isObject().withMessage('userId must be a valid object'),
    body('location.lat').notEmpty().withMessage('latitude must be provided').bail().isFloat().withMessage('user location latitude must have a valid value'),
    body('location.long').notEmpty().withMessage('longtitude must be provided').bail().isFloat().withMessage('user location longtitude must have a valid value'),
    body('distance').notEmpty().withMessage('distance must be provided').bail().isInt().withMessage('distance must be a valid number'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { location, distance } = req.body;

            const nearestParkingService = new NearestParkingService();
            // const userLocation = await nearestParkingService.getCurrentLocation();

            // if (!userLocation) {
            //     console.log('User location not found.');
            //     return ResponseService.sendNotFound(res, 'User location not found.');
            // }

            const parkingLots = await nearestParkingService.findParkingWithinDistance(location, +distance);

            if (!parkingLots) {
                console.log('No parking found within the specified distance.');
                return ResponseService.sendNotFound(res, 'No parking found within the specified distance.');
            }

            console.log('Parking found within specified distance:', parkingLots);
            return ResponseService.sendSuccess(res, parkingLots, 'Parking found within specified distance.');
        } catch (error) {
            console.error('Internal server error:', error);
            return ResponseService.sendInternalServerError(res, 'Internal server error.');
        }
    }
);

export { router as getRouter };
