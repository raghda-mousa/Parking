import express, { Router, Request, Response } from 'express';
import { PaymentService } from 'application/services/payment';
import { ResponseService } from 'application/services/';
import { Ipayment, PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';
import { Validation } from '@middlewares';
import { body } from 'express-validator';
import { EPaymentGateway, EPaymentType } from 'application/models/payment/enums';

const router = express.Router();
router.post(
    '/create/reservationId/:reservationId',
    body('paymentAmount').notEmpty().isInt().bail().withMessage('paymnentAmount must be a valid amount'),
    body('gateway').notEmpty().withMessage('gateway must be provided').bail().isIn(Object.values(EPaymentGateway)).withMessage(`gateway must be a valid gateway of ${Object.values(EPaymentGateway).join(',')}`),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const paymentService = new PaymentService();        
        const paymentData: Ipayment = req.body;
        const newPayment = await paymentService.createPayment({...paymentData,createdBy:req.user.id});
        if (!newPayment) {
            return ResponseService.sendBadRequest(res, 'Failed to create payment.');
        }
       return ResponseService.sendCreated(res, 'newPayment');
});

export { router as createRouter };

