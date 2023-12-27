import {
	EParkingStatus
} from '../enums';
export interface IParking {
	name: string;
	city: string;
	userId : string;
	numberOfSlots: number;
	status: EParkingStatus;
	location:{
		type:string,
		coordinates:number[]
	};
	chargePerMinute: number;
	createdAt?: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
}
