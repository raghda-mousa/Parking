import express, { Request, Response } from 'express';
import { createPayment, executePayment } from 'application/services/paypal';
import { ResponseService } from '@services';

const router = express.Router();

router.get('/success', async (req: Request, res: Response) => {
    const payerId = req.query.PayerID as string;
    const paymentId = req.query.paymentId as string;

    try {
        await executePayment(paymentId, { payer_id: payerId });
        res.send('Payment successful!');
    } catch (error) {
        console.error('Error executing payment:', error);
        ResponseService.sendInternalServerError(res, 'Internal Server Error');
    }
});

router.get('/cancel', (req: Request, res: Response) => {
    res.send('Payment cancelled.');
});

export { router as getRouter };