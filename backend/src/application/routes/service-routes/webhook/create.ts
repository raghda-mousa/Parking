import express, { Request, Response } from 'express';
import { handlePaymentUpdate } from 'application/services/webhook';
import { ResponseService, verifyWebhookSignature } from '@services';

const router = express.Router();

router.post('/',
    async (req: Request, res: Response) => {
        try {
            console.log({ headers: req.headers });
            const certUrl = 'https://api-m.sandbox.paypal.com/v1/oauth2';
            const isSignatureValid = await verifyWebhookSignature({
                auth_algo: req.headers['paypal-auth-algo'] as string,
                cert_url: certUrl,
                transmission_id: req.headers['paypal-transmission-id'] as string,
                transmission_sig: req.headers['paypal-transmission-sig'] as string,
                transmission_time: req.headers['paypal-transmission-time'] as string,
                webhook_id: '0PF98212BX8413045',
                webhook_event: req.body

            });

            if (!isSignatureValid) {
                console.error('Invalid webhook signature');
                return ResponseService.sendSuccess(res, 'ok', 'Invalid signature')
            }
            await handlePaymentUpdate(req.body);

            return ResponseService.sendSuccess(res, 'ok', 'Webhook received successfully')
        } catch (error) {
            console.error('Error handling webhook:', error);
            return ResponseService.sendInternalServerError(res, 'Internal Server Error');

        }
    });

export { router as createRouter };


