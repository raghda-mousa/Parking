import express, { Router } from 'express';
import { NearestParkingService } from 'application/services/NearestParkingService';
import { Request, Response } from 'express';
import { ResponseService } from '@services';
import { Validation } from '@middlewares';
import { param } from 'express-validator';

const router = express.Router();
router.get('/:userId', 
    param('userId').isMongoId().withMessage('userId must be a valid id'),
    Validation.authenticate, 
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const nearestParkingService = new NearestParkingService();
        const nearestParking = await nearestParkingService.findNearestParking(userId);

        if (!nearestParking) {
            return ResponseService.sendNotFound(res, 'No nearest parking found.');
        }

        return ResponseService.sendSuccess(res, nearestParking, 'Nearest parking found successfully');
    } catch (error) {
        console.error(error);
        return ResponseService.sendInternalServerError(res, 'Internal server error.'); 
    }
});

export { router as getRouter };