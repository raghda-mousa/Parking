import { Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Ipayment } from '../interfaces';
import {
    paymentStatus
} from '../enums';
const PAYMENT_MODEL_NAME = 'payment';
const PAYMENT_COLLECTION_NAME = 'payment';
interface IpaymentDoc extends Ipayment, Document { }
interface IpaymentModel extends PaginateModel<IpaymentDoc> {
	build: (attr: Ipayment) => IpaymentDoc;
}
const PaymentSchema = new Schema(
	{
		payment_amount:{
            type: Number,
        },
		status: {
			type: String,
			enum: paymentStatus,
			default: paymentStatus.ACTIVE
		},
		payment_date: {type: Date},
		
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
