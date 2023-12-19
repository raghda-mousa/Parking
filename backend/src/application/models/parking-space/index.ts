import {
	EParkingSpaceStatus
} from './enums';
import {
	IParkingSpace
} from './interfaces';
import {
	IParkingSpaceModel,
	ParkingSpaceSchema,
	IParkingSpaceDoc,
	PARKING_SPACE_MODEL_NAME,
	PARKING_SPACE_COLLECTION_NAME,
} from './schemas';

class ParkingSpaceModel {
    create(arg0: { parkingLot: string; name: string; PARKINGID: import("mongoose").Schema.Types.ObjectId; number_of_slots?: number | undefined; status?: EParkingSpaceStatus | undefined; chargePerMinute: number; createdAt?: Date | undefined; updatedAt?: Date | undefined; createdBy: string; updatedBy?: string | undefined; }) {
        throw new Error('Method not implemented.');
    }
	private _parkingSpaceModel: IParkingSpaceModel;
	constructor() {
		this._parkingSpaceModel = this.registerEnvMgmtPlatformEnvModel();
	}
	public get parkingSpaceModel() {
		return this._parkingSpaceModel;
	}
	private registerEnvMgmtPlatformEnvModel = () => {
		ParkingSpaceSchema.statics.build = (
			attr: IParkingSpace
		) => {
			return new ParkingLot(attr);
		};
		const ParkingLot: IParkingSpaceModel = global.serviceDB.model<
			IParkingSpaceDoc,
			IParkingSpaceModel
		>(PARKING_SPACE_MODEL_NAME, ParkingSpaceSchema, PARKING_SPACE_COLLECTION_NAME);
		return ParkingLot;
	};
}
export {
	ParkingSpaceModel,
	ParkingSpaceSchema,
	IParkingSpaceDoc,
	EParkingSpaceStatus,
	IParkingSpace,
	PARKING_SPACE_COLLECTION_NAME,
	PARKING_SPACE_MODEL_NAME
};
