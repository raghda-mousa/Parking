import mongoose from 'mongoose';
import { paymentStatus } from '../enums';

export interface Ipayment {
    RESERVATION_ID: mongoose.Schema.Types.ObjectId;
    payment_amount: number;
    status?: paymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy: string;
    updatedBy?: string;
}
