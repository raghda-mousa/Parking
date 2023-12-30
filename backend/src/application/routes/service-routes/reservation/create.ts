import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/'; 

const router = express.Router();

// Create reservation
router.post('/create', async (req: Request, res: Response) => {
    const reservationData: IReservation = req.body;
    const reservationService = new ReservationService();
    const createdReservation = await reservationService.createReservation(reservationData);
    if (createdReservation) {
        res.status(201).json({ success: true, reservation: createdReservation });
    } else {
        res.status(400).json({ success: false, message: 'Failed to create reservation' });
    }
});

export { router as createRouter };