import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IReservation } from '@models';
import { UserService } from '@services';
import { ReservationService } from 'application/services/reservation/'; 
import { param } from 'express-validator';
import { Validation } from '@middlewares';
import { ResponseService } from '@services';

const router = express.Router();

router.get('/:reservationId',
    param('reservationId').isMongoId().withMessage('reservationId must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
     async (req: Request, res: Response) => {
    const { reservationId } = req.params;
    const reservationService = new ReservationService();

    const reservation = await reservationService.getReservationById(reservationId);
    if (reservation) {
        ResponseService.sendSuccess(res,reservation,'Reservation found');
    } else {
        ResponseService.sendNotFound(res,'Reservation not found' );
    }
});


router.get('/getByUserId/:userId',
    param('userId').isMongoId().withMessage('userId must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
     async (req: Request, res: Response) => {
    const { userId } = req.params
    const reservationService = new ReservationService();
    const userService = new UserService();
    const userReservations = await userService.getUserById(userId);
    ResponseService.sendSuccess(res,userReservations,'userReservation found');
});


router.get('/getByParkingId/:parkingId',
    param('parkingId').isMongoId().withMessage('parkingId must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    const { parkingId } = req.params;
    const reservationService = new ReservationService();
    const parkingReservations = await reservationService.getReservationsByParkingId(parkingId);
    ResponseService.sendSuccess(res,parkingReservations,'parkingReservation found');

});
export { router as getRouter };