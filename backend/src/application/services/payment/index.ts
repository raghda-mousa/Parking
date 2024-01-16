import { EParkingStatus } from '@models';
import { Ipayment, IpaymentModel, PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';

export class PaymentService {
    private paymentModel: PaymentModel;

    constructor() {
        this.paymentModel = new PaymentModel();
    }

    public createPayment = async (paymentData: Ipayment) => {
        try {
            const payment = await this.paymentModel.paymentModel.create(paymentData);
            return payment;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public getPaymentById = async (paymentId: string): Promise<Ipayment | null> => {
        try {
            const payment = await this.paymentModel.paymentModel.findById(paymentId);
            return payment;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public updatePayment = async (paymentId: Types.ObjectId, updateData: Partial<Ipayment>): Promise<Ipayment | null> => {
        try {
            const payment = await this.paymentModel.paymentModel.findByIdAndUpdate(paymentId, updateData, { new: true });
            return payment;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public deletePayment = async (paymentId: string) => {
        try {
            const p = await this.paymentModel.paymentModel.findById(paymentId);
            if(!p){
                return null
            }
            const result = await this.paymentModel.paymentModel.findByIdAndUpdate(paymentId, { $set: { status: EParkingStatus.DELETED } }, { new: true });

        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getPayments = async (page: number, limit: number): Promise<{ payments: Ipayment[]; total: number }> => {
        try {
            const options = {
                page: +(page ?? 1),
                limit: +(limit ?? 10),
                sort: { createdAt: -1 },
            };
            const payments = await this.paymentModel.paymentModel.paginate({}, options);
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