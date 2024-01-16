import express, { Router, Request, Response } from 'express';
import { PaymentService } from 'application/services/payment';
import { Ipayment, PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';
import { body } from 'express-validator';
import { Validation } from '@middlewares';
import { ResponseService } from '@services';

const router = express.Router();

router.put('/:paymentId',
    body('paymentAmount').notEmpty().withMessage('paymentAmount must be provided').isInt().withMessage('paymentAmount must be a valid number'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const {status } = req.body
        const {paymentId}= req.params;
        const updateData= req.body;
        const paymentService = new PaymentService();
        const updatedPayment = await paymentService.updatePayment(paymentId, updateData);
        if (updatedPayment) {
            return ResponseService.sendSuccess(res,updatedPayment,'updated Payment');
        }
        return ResponseService.sendNotFound(res,'Payment not found.' );
});

export { router as updateRouter };