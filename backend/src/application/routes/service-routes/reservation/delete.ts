import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/'; 
import { param } from 'express-validator';
import { Validation } from '@middlewares';
import { ResponseService } from '@services';

const router = express.Router();

router.delete('/:reservationId', 
    // param('reservationId').isMongoId().withMessage('reservationId must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    const { reservationId } = req.params
    const reservationService = new ReservationService();
    const deletionStatus = await reservationService.deleteReservation(reservationId);
    if (deletionStatus) {
       return ResponseService.sendSuccess(res, deletionStatus,'Reservation deleted successfully' );
    }  {
        return ResponseService.sendBadRequest(res,'Failed to delete reservation' );
    }
});

export { router as deleteRouter };