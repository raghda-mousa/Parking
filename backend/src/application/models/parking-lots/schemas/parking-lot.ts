import { Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IParkingLot } from '../interfaces';
import {
	EParkingLotStatus,
} from '../enums';
const PARKING_LOT_MODEL_NAME = 'parking-lot';
const PARKING_LOT_COLLECTION_NAME = 'parking-lots';
interface IParkingLotDoc extends IParkingLot, Document { }
interface IParkingLotModel extends PaginateModel<IParkingLotDoc> {
	build: (attr: IParkingLot) => IParkingLotDoc;
}


const ParkingLotSchema = new Schema(
	{
		name: { type: String },
		status: {
			type: String,
			enum: EParkingLotStatus,
			default: EParkingLotStatus.IDL
		},
		chargePerMinute: {
			type: Number,
			default: 0
		},
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date },
		createdBy: { type: String },
		updatedBy: { type: String }
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret.__v;
			}
		}
	}
);

ParkingLotSchema.plugin(paginate);
ParkingLotSchema.index({
	name: 'text',
	status: 'text',
});
ParkingLotSchema.index({ name: 1 });
ParkingLotSchema.index({ status: 1 });

export {
	IParkingLotDoc,
	IParkingLotModel,
	ParkingLotSchema,
	PARKING_LOT_MODEL_NAME,
	PARKING_LOT_COLLECTION_NAME
};
