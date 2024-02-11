import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { EReservationStatus, IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/';
import { Validation } from '@middlewares';
import { body, param } from 'express-validator';
import { ResponseService } from '@services';
import { EReservationAction } from 'application/models/reservation/enums';

const router = express.Router();

router.put('/:reservationId',
    body('status').notEmpty().withMessage('status must be provided').bail().isIn(Object.values(EReservationStatus)).withMessage(`status must be a valid status of ${Object.values(EReservationStatus).join(',')}`),
    body('action').notEmpty().withMessage('action must be provided').bail().isIn(Object.values(EReservationAction)).withMessage(`action must be a valid action of ${Object.values(EReservationAction).join(',')}`),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            const { reservationId } = req.params
            const updateData: Partial<IReservation> & { action: EReservationAction } = req.body;
            const reservationService = new ReservationService();
            const updatedReservation = await reservationService.updateReservation(reservationId, updateData);
            if (updatedReservation) {
                ResponseService.sendSuccess(res, updatedReservation, 'Updated Reservation');
            } else {
                ResponseService.sendBadRequest(res, 'Failed to update reservation');
            }
        }
        catch (error: any) {
            ResponseService.sendBadRequest(res, error?.message);
        }
    });

export { router as updateRouter };