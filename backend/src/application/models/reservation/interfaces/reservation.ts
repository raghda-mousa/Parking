import {
	EReservationStatus
} from '../enums';
export interface IReservation {
	cost:Number;
	//status?: EReservationStatus;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}
