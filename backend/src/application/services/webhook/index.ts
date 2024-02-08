import crypto from 'crypto';
import { Request } from 'express';
import paypal from 'paypal-rest-sdk';
import { EnvironementService } from '../environement';

// export function verifyWebhookSignature(req: Request): Promise<boolean> {
//     paypal.configure({
//         mode: 'sandbox',
//         client_id: EnvironementService.payPalConfigs.clientId,
//         client_secret: EnvironementService.payPalConfigs.secret,
//     });
//     // const webhookSecret = 'EAGrMH901QhAsfLyQy6KpBrZn5pH2xGECYHZoo7dsg0frXldxdSvN6LA2q5GFgMSUxwhx-sggdWjFWjX';
//     return new Promise((resolve, reject) => {
//         const headers = req.headers;
//         const body = JSON.stringify(req.body);

//         // const signature = headers['paypal-transmission-sig'];
//         const verifyResult = verifyWebhookSignature()
//         // const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');
//         console.log({ expectedSignature, signature });
//         resolve(signature === expectedSignature);
//     });
// }

export async function handlePaymentUpdate(webhookData: any): Promise<void> {
    console.log('Received webhook data:', webhookData);
}
