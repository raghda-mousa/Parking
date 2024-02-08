import express, { Request, Response } from 'express';
import { createPayment, executePayment } from 'application/services/paypal';
import { ResponseService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.post('/',
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    try {
        const payment = await createPayment(req.body);
        res.redirect(payment.links[1].href);
    } catch (error) {
        console.error('Error creating payment:', error);
        ResponseService.sendInternalServerError(res, 'Internal Server Error');
    }
});


export { router as createRouter };