import mongoose,{ Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IReservation } from '../interfaces';

const RESERVATION_MODEL_NAME = 'reservation';
const RESERVATION_COLLECTION_NAME = 'reservation';
interface IReservationDoc extends IReservation, Document { }
interface IReservationModel extends PaginateModel< IReservationDoc> {
	build: (attr: IReservation) => IReservationDoc;
};

const ReservationSchema = new Schema(
	{
		cost: {type:Number}, 
		USERID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UsersSchema'
		  },
		PARKNGID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ParkingLotSchema'
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