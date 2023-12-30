import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IReservation } from '@models';
import { ReservationService } from 'application/services/reservation/'; 

const router = express.Router();

router.get('/:reservationId', async (req: Request, res: Response) => {
    const { reservationId } = req.params;
    const reservationService = new ReservationService();

    const reservation = await reservationService.getReservationById(reservationId);
    if (reservation) {
        res.status(200).json({ success: true, reservation });
    } else {
        res.status(404).json({ success: false, message: 'Reservation not found' });
    }
});

// Get reservations by User ID
router.get('/user/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;
    const parsedUserId = Types.ObjectId(userId);
    const reservationService = new ReservationService();
    const userReservations = await reservationService.getReservationsByUserId(parsedUserId);
    res.status(200).json({ success: true, reservations: userReservations });
});

// Get reservations by Parking ID
router.get('/parking/:parkingId', async (req: Request, res: Response) => {
    const { parkingId } = req.params;
    const reservationService = new ReservationService();
    const parkingReservations = await reservationService.getReservationsByParkingId(parkingId);
    res.status(200).json({ success: true, reservations: parkingReservations });
});

export { router as getRouter };