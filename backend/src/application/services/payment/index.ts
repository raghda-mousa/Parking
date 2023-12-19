import { Ipayment, IpaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';

export class PaymentService {
    private paymentModel: IpaymentModel;

    constructor(paymentModel: IpaymentModel) {
        this.paymentModel = paymentModel;
    }

    public createPayment = async (paymentData: Ipayment): Promise<Ipayment | null> => {
        try {
            const payment = await this.paymentModel.create(paymentData);
            return payment;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public getPaymentById = async (paymentId: Types.ObjectId): Promise<Ipayment | null> => {
        try {
            const payment = await this.paymentModel.findById(paymentId);
            return payment;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public updatePayment = async (paymentId: Types.ObjectId, updateData: Partial<Ipayment>): Promise<Ipayment | null> => {
        try {
            const payment = await this.paymentModel.findByIdAndUpdate(paymentId, updateData, { new: true });
            return payment;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public deletePayment = async (paymentId: Types.ObjectId): Promise<boolean> => {
        try {
            const result = await this.paymentModel.findByIdAndDelete(paymentId);
            return !!result;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getPayments = async (page: number, limit: number): Promise<{ payments: Ipayment[]; total: number }> => {
        try {
            const options = {
                page,
                limit,
                sort: { createdAt: -1 },
            };
            const payments = await this.paymentModel.paginate({}, options);
            return {
                payments: payments.docs,
                total: payments.totalDocs,
            };
        } catch (error) {
            console.error(error);
            return { payments: [], total: 0 };
        }
    };
}