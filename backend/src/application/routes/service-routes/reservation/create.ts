// Import necessary modules and types
import express, { Request, Response } from 'express';
import { IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/';
import { ResponseService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.post('/',
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const reservationData: IReservation = req.body;
        const reservationService = new ReservationService();
        const createdReservation = await reservationService.createReservation({ ...reservationData, createdBy: req.user.id });
        if (createdReservation) {
            ResponseService.sendSuccess(res, createdReservation, 'created successfully');
        } else {
            ResponseService.sendBadRequest(res, 'Failed to create reservation');
        }
    });
    


export { router as createRouter };
