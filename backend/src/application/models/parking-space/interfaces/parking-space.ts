import mongoose from 'mongoose';
import {
    EParkingSpaceStatus
} from '../enums';
export interface IParkingSpace {
	name: string;
	PARKINGID : mongoose.Schema.Types.ObjectId;
	number_of_slots?: number;
	status?: EParkingSpaceStatus;
	chargePerMinute: number;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}