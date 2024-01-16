import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { EReservationStatus, IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/'; 
import { Validation } from '@middlewares';
import { body, param } from 'express-validator';
import { ResponseService } from '@services';

const router = express.Router();

router.put('/:reservationId', 
    body('status').notEmpty().withMessage('status must be provided').bail().isIn(Object.values(EReservationStatus)).withMessage(`status must be a valid status of ${Object.values(EReservationStatus).join(',')}`),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    const {status } = req.body
    const { reservationId } = req.params
    const updateData: Partial<IReservation> = req.body;
    const reservationService = new ReservationService();
    const updatedReservation = await reservationService.updateReservation(reservationId, updateData);
    if (updatedReservation) {
        ResponseService.sendSuccess(res,updatedReservation,'Updated Reservation');
    } else {
        ResponseService.sendBadRequest(res,'Failed to update reservation');
    }
});

export { router as updateRouter };