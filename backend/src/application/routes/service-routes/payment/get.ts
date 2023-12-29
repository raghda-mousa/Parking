// PaymentRoutes.ts
import express, { Router, Request, Response } from 'express';
import { PaymentService } from 'application/services/payment';
import { Ipayment } from 'application/models/payment/';
import {  PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';

const router = express.Router();
const paymentRoutes = Router();

const handleError = (res: Response, error: any) => {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
};

const paymentService = new PaymentService(PaymentModel);

paymentRoutes.get('/payment/:paymentId', async (req: Request, res: Response) => {
    try {
        const paymentId: Types.ObjectId = Types.ObjectId(req.params.paymentId);
        const payment = await paymentService.getPaymentById(paymentId);

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }

        return res.status(200).json(payment);
    } catch (error) {
        return handleError(res, error);
    }
});

paymentRoutes.get('/payments', async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const limit: number = parseInt(req.query.limit as string, 10) || 10;

        const { payments, total } = await paymentService.getPayments(page, limit);

        return res.status(200).json({ payments, total });
    } catch (error) {
        return handleError(res, error);
    }
});

export { router as getRouter };