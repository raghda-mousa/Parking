import { EReservationStatus, IReservation, ReservationModel, ParkingModel } from '@models';
import { BarcodeService } from '../QR';
import { EReservationAction } from 'application/models/reservation/enums';

export class ReservationService {
    private reservationModel: ReservationModel;
    private parkingModel: ParkingModel;
    private barcodeService: BarcodeService;
    constructor() {
        this.reservationModel = new ReservationModel();
        this.barcodeService = new BarcodeService();
        this.parkingModel = new ParkingModel();
    }


    public createReservation = async (reservationData: IReservation) => {
        try {
            const reservation = await this.reservationModel.reservationModel.create(reservationData);

            if (!reservation) {
                console.error("Failed to create reservation");
                return null;
            }
            await this.parkingModel.parkingModel.findByIdAndUpdate(reservationData.parkingId, { $inc: { numberOfSlots: -1 } });

            const qrcode = await this.barcodeService.generateBarcode(reservation._id.toString());
            reservation.qrCode = qrcode as string; 
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

    public updateReservation = async (reservationId: string, updateData: Partial<IReservation> & { action: EReservationAction }) => {
        try {
            const r = await this.reservationModel.reservationModel.findOne({ _id: reservationId, status: updateData.action === EReservationAction.ENTER ? EReservationStatus.PENDING : EReservationStatus.ACTIVE });
            console.log({ r, updateData });
            if (!r) {
                throw new Error('reservation not found');
            }
            if (updateData.action === EReservationAction.EXIT)
                await this.parkingModel.parkingModel.findByIdAndUpdate(r.parkingId, { $inc: { numberOfSlots: 1 } });
            const reservation = await this.reservationModel.reservationModel.findByIdAndUpdate(reservationId, updateData, { new: true });
            return reservation;
        } catch (error) {
            console.error(error);
            throw new Error('reservation not found');
        }
    };

    public deleteReservation = async (id: string) => {
        try {
            const p = await this.reservationModel.reservationModel.findById(id);
            if (!p) {
                return null
            }
            const result = await this.reservationModel.reservationModel.findByIdAndUpdate(id, { $set: { status: EReservationStatus.ENDED } }, { new: true });
            return result;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getReservationsByUserId = async (userId: string) => {
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
            const reservations = await this.reservationModel.reservationModel.find({ parkingId, status: EReservationStatus.ACTIVE });
            return reservations;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
}