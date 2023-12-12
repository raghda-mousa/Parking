import mongoose from 'mongoose';
import {
	EParkingLotStatus
} from '../enums';
export interface IParkingLot {
	name: string;
	city: string;
	USERID : mongoose.Schema.Types.ObjectId;
	number_of_slots?: number;
	status?: EParkingLotStatus;
	chargePerMinute: number;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}
