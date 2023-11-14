import {
	EParkingLotStatus
} from '../enums';
export interface IParkingLot {
	name: string;
	status?: EParkingLotStatus;
	chargePerMinute: number;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}
