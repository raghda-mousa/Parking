import {
	EReservationStatus
} from '../enums';
export interface IReservation {
	cost:Number;
	parkingId: string;
	userId: string;
	status: EReservationStatus;
	sartTime?: Date;
	endTime?: Date;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}
