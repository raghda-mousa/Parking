import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/'; 

const router = express.Router();

router.delete('/:reservationId', async (req: Request, res: Response) => {
    const { reservationId } = req.params;
    const parsedReservationId = Types.ObjectId(reservationId);
    const reservationService = new ReservationService();
    const deletionStatus = await reservationService.deleteReservation(parsedReservationId);
    if (deletionStatus) {
        res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Failed to delete reservation' });
    }
});

export { router as deleteRouter };