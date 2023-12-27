import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { EReservationStatus, IReservation, IReservationModel, ReservationModel } from 'application/models/reservation/';

export class ReservationService {
    private reservationModel: ReservationModel;

    constructor() {
        this.reservationModel = new ReservationModel();
    }

    private validateReservationData = (data: IReservation): string[] => {
        const errors: string[] = [];
        if (!data.userId) {
            errors.push('User ID is required.');
        }

        return errors;
    };

    public createReservation = async (reservationData: IReservation): Promise<IReservation | null> => {
        const validationErrors = this.validateReservationData(reservationData);
        if (validationErrors.length > 0) {
            console.error('Validation Errors:', validationErrors);
            return null;
        }

        try {
            const reservation = await this.reservationModel.reservationModel.create(reservationData);
            return reservation;
        } catch (error) {
            // Handle other errors (log, throw, etc.)
            console.error(error);
            return null;
        }
    };

    public getReservationById = async (reservationId: Types.ObjectId): Promise<IReservation | null> => {
        try {
            const reservation = await this.reservationModel.reservationModel.findById(reservationId);
            return reservation;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public updateReservation = async (
        reservationId: Types.ObjectId,
        updateData: Partial<IReservation>
    ): Promise<IReservation | null> => {
        try {
            const reservation = await this.reservationModel.reservationModel.findByIdAndUpdate(reservationId, updateData, { new: true });
            return reservation;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public deleteReservation = async (reservationId: Types.ObjectId): Promise<boolean> => {
        try {
            const result = await this.reservationModel.reservationModel.findByIdAndDelete(reservationId);
            return !!result;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getReservationsByUserId = async (userId: Types.ObjectId): Promise<IReservation[]> => {
        try {
            const reservations = await this.reservationModel.reservationModel.find({ userId });
            return reservations;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    public getReservationsByParkingId = async (parkingId: string): Promise<IReservation[]> => {
        try {
            const reservations = await this.reservationModel.reservationModel.find({ parkingId,status:EReservationStatus.ACTIVE });
            return reservations;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
}