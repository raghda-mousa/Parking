import {
	EPaymentStatus
} from './enums';
import {
	Ipayment
} from './interfaces';
import {
	IpaymentModel,
	PaymentSchema,
	IpaymentDoc,
	PAYMENT_MODEL_NAME,
	PAYMENT_COLLECTION_NAME,
} from './schemas';
class PaymentModel {
	private _paymentModel: IpaymentModel;
	constructor() {
		this. _paymentModel = this.registerEnvMgmtPlatformEnvModel();
	}
	public get paymentModel() {
		return this._paymentModel;
	}
	private registerEnvMgmtPlatformEnvModel = () => {
		PaymentSchema.statics.build = (
			attr: Ipayment
		) => {
			return new Payment(attr);
		};
		const Payment: IpaymentModel = global.serviceDB.model<
			IpaymentDoc,
			IpaymentModel
		>(PAYMENT_MODEL_NAME, PaymentSchema,PAYMENT_COLLECTION_NAME);
		return Payment;
	};
}
export {
	PaymentModel,
	IpaymentModel,
	PaymentSchema,
	IpaymentDoc,
	EPaymentStatus,
	Ipayment,
	PAYMENT_COLLECTION_NAME,
	PAYMENT_MODEL_NAME
};