import mongoose,{ Document, Model, model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IParking } from '../interfaces';
import {
	ECities,
	EParkingStatus,
} from '../enums';
import { USERS_MODEL_NAME } from '@models';
const PARKING_MODEL_NAME = 'parking';
const PARKING_COLLECTION_NAME = 'parkings';
interface IParkingDoc extends IParking, Document { }
interface IParkingModel extends PaginateModel<IParkingDoc> {
	build: (attr: IParking) => IParkingDoc;
};

// const LocationSchema = new Schema({
// 	type:{
// 		type:String
// 	},
// 	coordinates:Array<Number>
// })
// location.ts

const locationSchema = new Schema<Location>({
    type: {
        type: String,
        default: 'Point' 
    },
    coordinates: {
        type: [Number],
        required: true 
    },
});

locationSchema.index({ coordinates: '2dsphere' }); 

export const LocationModel = model<Location>('Location', locationSchema);


const ParkingSchema = new Schema(
	{
		name: { type: String },
		city: { type: String,
			enum: ECities,
			default: ECities.JENIN
		 },
		userId: 
		  {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		  },
		numberOfSlots:
			{
				type: Number,
				default: 0
			},
		status: 
		   {
			type: String,
			enum: EParkingStatus,
			default: EParkingStatus.IDLE
		  },
		 location:locationSchema,
		chargePerMinute: 
		  {
			type: Number,
			default: 0
		  },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date },
		createdBy: { type: mongoose.Schema.Types.ObjectId,
			ref: 'user' },
		updatedBy: { type: mongoose.Schema.Types.ObjectId,
			ref: 'user' }
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

ParkingSchema.plugin(paginate);
ParkingSchema.index({
	name: 'text',
	status: 'text',
});
ParkingSchema.index({ name: 1 });
ParkingSchema.index({ status: 1 });

export {
	IParkingDoc,
	IParkingModel,
	ParkingSchema,
	PARKING_MODEL_NAME,
	PARKING_COLLECTION_NAME
};
