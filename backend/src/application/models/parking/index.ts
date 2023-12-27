import {
	EParkingStatus
} from './enums';
import {
	IParking
} from './interfaces';
import {
	IParkingModel,
	ParkingSchema,
	IParkingDoc,
	PARKING_MODEL_NAME,
	PARKING_COLLECTION_NAME,
} from './schemas';

class ParkingModel {
	private _parkingModel: IParkingModel;
	constructor() {
		this._parkingModel = this.registerEnvMgmtPlatformEnvModel();
	}
	public get parkingModel() {
		return this._parkingModel;
	}
	private registerEnvMgmtPlatformEnvModel = () => {
		ParkingSchema.statics.build = (
			attr: IParking
		) => {
			return new Parking(attr);
		};
		const Parking: IParkingModel = global.serviceDB.model<
			IParkingDoc,
			IParkingModel
		>(PARKING_MODEL_NAME, ParkingSchema, PARKING_COLLECTION_NAME);
		return Parking;
	};
}
export {
	ParkingModel,
	IParkingModel,
	ParkingSchema,
	IParkingDoc,
	EParkingStatus,
	IParking,
	PARKING_COLLECTION_NAME,
	PARKING_MODEL_NAME
};
