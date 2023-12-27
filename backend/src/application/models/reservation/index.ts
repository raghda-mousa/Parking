import {
	EReservationStatus
} from './enums';
import {
	IReservation
} from './interfaces';
import {
	IReservationModel,
	ReservationSchema,
	IReservationDoc,
	RESERVATION_MODEL_NAME,
	RESERVATION_COLLECTION_NAME,
} from './schemas';

class ReservationModel {
	private _reservationModel: IReservationModel;
	constructor() {
		this._reservationModel = this.registerEnvMgmtPlatformEnvModel();
	}
	public get reservationModel() {
		return this._reservationModel;
	}
	private registerEnvMgmtPlatformEnvModel = () => {
		ReservationSchema.statics.build = (
			attr: IReservation
		) => {
			return new Reservation(attr);
		};
		const Reservation: IReservationModel = global.serviceDB.model<
			IReservationDoc,
			IReservationModel
		>(RESERVATION_MODEL_NAME, ReservationSchema, RESERVATION_COLLECTION_NAME);
		return Reservation;
	};
}
export {
	ReservationModel,
	IReservationModel,
	ReservationSchema,
	IReservationDoc,
	EReservationStatus,
	IReservation,
	RESERVATION_COLLECTION_NAME,
	RESERVATION_MODEL_NAME
};
