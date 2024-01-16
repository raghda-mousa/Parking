import express, { Router, Request, Response } from 'express';
import { UserLocationService } from 'application/services/UserLocation';
import { param } from 'express-validator';
import { Validation } from '@middlewares';
import { ResponseService } from '@services';

const router = express.Router();
const userLocationRoutes = Router();

router.get('/user/:userId', 
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userLocationService = new UserLocationService();
    const userLocation = await userLocationService.getUserLocation(userId);

    if (!userLocation) {
        return ResponseService.sendNotFound(res,'User location not found.');
        }

    return res.json(userLocation);
});

router.get('/user/current-location', 
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    const userLocationService = new UserLocationService();
    const currentLocation = await userLocationService.getCurrentLocation();

    if (!currentLocation) {
        return ResponseService.sendBadRequest(res,'Error getting current location');
    }

    return res.json(currentLocation);
});

// export { router as userLocationRoutes };

export { router as getRouter };