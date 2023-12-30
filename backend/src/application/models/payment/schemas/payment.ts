import mongoose,{ Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Ipayment } from '../interfaces';
import {
	EPaymentGateway,
    EPaymentStatus, EPaymentType
} from '../enums';
import { RESERVATION_MODEL_NAME } from 'application/models/reservation';
import { USERS_MODEL_NAME } from 'application/models/users';
const PAYMENT_MODEL_NAME = 'payment';
const PAYMENT_COLLECTION_NAME = 'payments';
interface IpaymentDoc extends Ipayment, Document { }
interface IpaymentModel extends PaginateModel<IpaymentDoc> {
	build: (attr: Ipayment) => IpaymentDoc;
}
const PaymentSchema = new Schema(
	{
		RESERVATION_ID:{
			type: mongoose.Schema.Types.ObjectId,
			ref: RESERVATION_MODEL_NAME
		},
		payment_amount:{
            type: Number,
        },
		status: {
			type: String,
			enum: EPaymentStatus,
			default: EPaymentStatus.PROCESSING
		},	
		type: {
			type: String,
			enum: EPaymentType,
			default: EPaymentType.CASH
		},		
		gateway: {
			type: String,
			enum: EPaymentGateway,
			default: EPaymentGateway.JAWWAL_PAY
		},
		startTime: { type: Date, default: Date.now },		
		endTime: { type: Date},
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
PaymentSchema.plugin(paginate);
PaymentSchema.index({
	status: 'text',

});

PaymentSchema.index({ status: 1 });

export {
	IpaymentDoc,
	IpaymentModel,
	PaymentSchema,
	PAYMENT_MODEL_NAME,
	PAYMENT_COLLECTION_NAME
};
