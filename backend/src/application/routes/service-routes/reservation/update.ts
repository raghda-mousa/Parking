import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/'; 

const router = express.Router();
const reservationService = new ReservationService();

router.put('/:reservationId', async (req: Request, res: Response) => {
    const { reservationId } = req.params;
    const parsedReservationId = Types.ObjectId(reservationId);
    const updateData: Partial<IReservation> = req.body;
    const updatedReservation = await reservationService.updateReservation(parsedReservationId, updateData);
    if (updatedReservation) {
        res.status(200).json({ success: true, reservation: updatedReservation });
    } else {
        res.status(400).json({ success: false, message: 'Failed to update reservation' });
    }
});

export { router as updateRouter };