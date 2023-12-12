import mongoose from 'mongoose';
import {
	EReservationStatus
} from '../enums';
export interface IReservation {
	cost:Number;
	PARKNGID: mongoose.Schema.Types.ObjectId;
	USERID: mongoose.Schema.Types.ObjectId;
	status?: EReservationStatus;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}
