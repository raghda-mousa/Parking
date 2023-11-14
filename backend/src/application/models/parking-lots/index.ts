import {
	EParkingLotStatus
} from './enums';
import {
	IParkingLot
} from './interfaces';
import {
	IParkingLotModel,
	ParkingLotSchema,
	IParkingLotDoc,
	PARKING_LOT_MODEL_NAME,
	PARKING_LOT_COLLECTION_NAME,
} from './schemas';

class ParkingLotModel {
	private _parkingLotModel: IParkingLotModel;
	constructor() {
		this._parkingLotModel = this.registerEnvMgmtPlatformEnvModel();
	}
	public get parkingLotModel() {
		return this._parkingLotModel;
	}
	private registerEnvMgmtPlatformEnvModel = () => {
		ParkingLotSchema.statics.build = (
			attr: IParkingLot
		) => {
			return new ParkingLot(attr);
		};
		const ParkingLot: IParkingLotModel = global.serviceDB.model<
			IParkingLotDoc,
			IParkingLotModel
		>(PARKING_LOT_MODEL_NAME, ParkingLotSchema, PARKING_LOT_COLLECTION_NAME);
		return ParkingLot;
	};
}
export {
	ParkingLotModel,
	IParkingLotModel,
	ParkingLotSchema,
	IParkingLotDoc,
	EParkingLotStatus,
	IParkingLot,
	PARKING_LOT_COLLECTION_NAME,
	PARKING_LOT_MODEL_NAME
};
