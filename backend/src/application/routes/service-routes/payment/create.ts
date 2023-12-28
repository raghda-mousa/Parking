// PaymentRoutes.ts
import { Router, Request, Response } from 'express';
import { PaymentService } from 'application/services/payment';
import { Ipayment, PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';

const paymentRoutes = Router();

const handleError = (res: Response, error: any) => {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
};

// Initialize PaymentService
const paymentService = new PaymentService(PaymentModel);

// Route to create a new payment
paymentRoutes.post('/payment', async (req: Request, res: Response) => {
    try {
        const paymentData: Ipayment = req.body;
        const newPayment = await paymentService.createPayment(paymentData);

        if (!newPayment) {
            return res.status(400).json({ error: 'Failed to create payment.' });
        }

        return res.status(201).json(newPayment);
    } catch (error) {
        return handleError(res, error);
    }
});
