import { Types } from 'mongoose';
import { paymentStatus } from '../enums';

export interface Ipayment {
   // payment_id: Types.ObjectId;
  //  reservation_id:
    payment_amount: number;
    status?: paymentStatus;
    payment_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy: string;
    updatedBy?: string;
}
