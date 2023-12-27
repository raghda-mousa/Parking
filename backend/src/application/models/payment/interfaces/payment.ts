import { EPaymentGateway, EPaymentStatus, EPaymentType } from '../enums';

export interface Ipayment {
    reservationId: string;
    paymnentAmount: number;
    status: EPaymentStatus;
    type: EPaymentType;
    gateway: EPaymentGateway;
    startTime:Date;
    endTime: Date;
    createdAt: Date;
    updatedAt?: Date;
    createdBy: string;
    updatedBy?: string;
}
