import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { EReservationStatus, IReservation, IReservationModel, ReservationModel,IReservationDoc } from '@models';
import { BarcodeService } from '../QR';

export class ReservationService {
    private reservationModel: ReservationModel;
    private barcodeService: BarcodeService;
    constructor() {
        this.reservationModel = new ReservationModel();
        this.barcodeService = new BarcodeService();
    }

    // public createReservation = async (reservationData: IReservation) => {
    //     try {
    //         // Inside createReservation method
    //         const reservation = await this.reservationModel.reservationModel.create(reservationData);
    //         const qrcode = await this.barcodeService.generateBarcode(reservation._id.toString());
    //         reservation.qrcode = qrcode; // Assign the generated QR code to the reservation object
    //         await reservation.save(); // Save the reservation object with the QR code
    //         return { ...reservation.toJSON(), qrcode };
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };
    public createReservation = async (reservationData: IReservation) => {
        try {
            // Inside createReservation method
            const reservation = await this.reservationModel.reservationModel.create(reservationData);

            if (!reservation) {
                console.error("Failed to create reservation");
                return null;
            }

            const qrcode = await this.barcodeService.generateBarcode(reservation._id.toString());
            reservation.qrCode = qrcode as string; // Assign the generated QR code to the reservation object
            await reservation.save(); 
            return { ...reservation.toJSON(), qrcode };
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public getReservationById = async (reservationId: string) => {
        try {
            const reservation = await this.reservationModel.reservationModel.findById(reservationId);
            return reservation;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public updateReservation = async ( reservationId: string, updateData: Partial<IReservation>) => {
        try {
            const reservation = await this.reservationModel.reservationModel.findByIdAndUpdate(reservationId, updateData, { new: true });
            return reservation;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public deleteReservation = async (id:  string)=> {
        try {
            const p = await this.reservationModel.reservationModel.findById(id);
            if(!p){
                return null
            }
            const result = await this.reservationModel.reservationModel.findByIdAndUpdate(id, { $set: { status: EReservationStatus.ENDED } }, { new: true });
            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getReservationsByUserId = async (userId: string)=> {
        try {
            const reservations = await this.reservationModel.reservationModel.find({ userId });
            return reservations;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    public getReservationsByParkingId = async (parkingId: string) => {
        try {
            const reservations = await this.reservationModel.reservationModel.find({ parkingId,status:EReservationStatus.ACTIVE });
            return reservations;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
}