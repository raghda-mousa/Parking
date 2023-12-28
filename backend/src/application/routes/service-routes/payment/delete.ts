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

const paymentService = new PaymentService(PaymentModel);

paymentRoutes.delete('/payment/:paymentId', async (req: Request, res: Response) => {
    try {
        const paymentId: Types.ObjectId = Types.ObjectId(req.params.paymentId);
        const deleted = await paymentService.deletePayment(paymentId);

        if (!deleted) {
            return res.status(404).json({ error: 'Payment not found.' });
        }

        return res.status(204).end();
    } catch (error) {
        return handleError(res, error);
    }
});

