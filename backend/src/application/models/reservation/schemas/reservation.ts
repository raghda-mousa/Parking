import mongoose,{ Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IReservation } from '../interfaces';
import { USERS_MODEL_NAME,PARKING_MODEL_NAME } from '@models';
import { EReservationStatus } from '../enums';

const RESERVATION_MODEL_NAME = 'reservation';
const RESERVATION_COLLECTION_NAME = 'reservation';
interface IReservationDoc extends IReservation, Document { }
interface IReservationModel extends PaginateModel< IReservationDoc> {
	build: (attr: IReservation) => IReservationDoc;
};

const ReservationSchema = new Schema(
	{
		// userId: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'user'
		//   },
		parkingId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: PARKING_MODEL_NAME
		  },
		status: 
		   {
			type: String,
			enum: EReservationStatus,
			default: EReservationStatus.PENDING
		  },
		cost:{type: Number},
		sartTime: { type: Date },
		endTime: { type: Date },
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

ReservationSchema.plugin(paginate);
ReservationSchema.index({

});
ReservationSchema.index({ name: 1 });
ReservationSchema.index({ status: 1 });

export {
	IReservationDoc,
	IReservationModel,
	ReservationSchema,
	RESERVATION_MODEL_NAME,
	RESERVATION_COLLECTION_NAME
};