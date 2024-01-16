import { EPaymentGateway, EPaymentStatus, EPaymentType } from '../enums';

export interface Ipayment {
    reservationId: string;
    paymnentAmount: number;
    type: EPaymentType;
    gateway: EPaymentGateway;
    createdBy: string;
}
