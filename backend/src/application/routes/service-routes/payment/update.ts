// PaymentRoutes.ts
import express, { Router, Request, Response } from 'express';
import { PaymentService } from 'application/services/payment';
import { Ipayment, PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';

const router = express.Router();
const paymentRoutes = Router();

const handleError = (res: Response, error: any) => {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
};



paymentRoutes.put('/payment/:paymentId', async (req: Request, res: Response) => {
    try {
        const paymentId: Types.ObjectId = Types.ObjectId(req.params.paymentId);
        const updateData: Partial<Ipayment> = req.body;
        const paymentService = new PaymentService();
        const updatedPayment = await paymentService.updatePayment(paymentId, updateData);

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found.' });
        }

        return res.status(200).json(updatedPayment);
    } catch (error) {
        return handleError(res, error);
    }
});

export { router as updateRouter };