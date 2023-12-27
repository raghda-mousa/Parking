import {
	EUserStatus, EUserType
} from '../enums';
export interface IUser {
	name: string;
	status: EUserStatus;
	email: string;
	password: string
	createdAt: Date;
	updatedAt?: Date;
	createdBy: string;
	updatedBy?: string;
	type:EUserType
}
