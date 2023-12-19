import mongoose,{ Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IParkingSpace } from '../interfaces';
import {
	EParkingSpaceStatus,
} from '../enums';
const PARKING_SPACE_MODEL_NAME = 'parking-space';
const PARKING_SPACE_COLLECTION_NAME = 'parking-space';
interface IParkingSpaceDoc extends IParkingSpace, Document { }
interface IParkingSpaceModel extends PaginateModel<IParkingSpaceDoc> {
	build: (attr: IParkingSpace) => IParkingSpaceDoc;
};

const ParkingSpaceSchema = new Schema(
	{
		name: { type: String },
		PARKINGID: 
		  {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ParkingLotSchema'
		  },
		number_of_slots:
			{
				type: Number,
				default: 0
			},
		status: 
		   {
			type: String,
			enum: EParkingSpaceStatus,
			default: EParkingSpaceStatus.IDL
		  },
		chargePerMinute: 
		  {
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

ParkingSpaceSchema.plugin(paginate);
ParkingSpaceSchema.index({
	name: 'text',
	status: 'text',
});
ParkingSpaceSchema.index({ name: 1 });
ParkingSpaceSchema.index({ status: 1 });

export {
	IParkingSpaceDoc,
	IParkingSpaceModel,
	ParkingSpaceSchema,
	PARKING_SPACE_MODEL_NAME,
	PARKING_SPACE_COLLECTION_NAME
};
