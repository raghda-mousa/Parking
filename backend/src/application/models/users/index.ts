import {
	EUserStatus
} from './enums';
import {
	IUser
} from './interfaces';
import {
	IUsersModel,
	UsersSchema,
	IUsersDoc,
	USERS_MODEL_NAME,
	USERS_COLLECTION_NAME,
} from './schemas';

class UserModel {
    
	private _userModel: IUsersModel;
    static findOne: any;
	constructor() {
		this._userModel = this.registerEnvMgmtPlatformEnvModel();
	}
	public get userModel() {
		return this._userModel;
	}
	private registerEnvMgmtPlatformEnvModel = () => {
		UsersSchema.statics.build = (
			attr: IUser
		) => {
			return new ParkingLot(attr);
		};
		const ParkingLot: IUsersModel = global.serviceDB.model<
			IUsersDoc,
			IUsersModel
		>(USERS_MODEL_NAME, UsersSchema, USERS_COLLECTION_NAME);
		return ParkingLot;
	};
}
export {
	UserModel,
	IUsersModel,
	UsersSchema,
	IUsersDoc,
	EUserStatus,
	IUser,
	USERS_COLLECTION_NAME,
	USERS_MODEL_NAME
};
