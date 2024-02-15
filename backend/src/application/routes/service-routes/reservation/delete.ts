import express, { Request, Response } from 'express';
import { ReservationService } from 'application/services/reservation/'; 
import { Validation } from '@middlewares';
import { ResponseService } from '@services';

const router = express.Router();

router.delete('/:reservationId', 
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