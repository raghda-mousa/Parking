// PaymentRoutes.ts
import express, { Router, Request, Response } from 'express';
import { PaymentService } from 'application/services/payment';
import { ResponseService } from 'application/services/';
import { Ipayment, PaymentModel } from 'application/models/payment/';
import { Types } from 'mongoose';
import { param } from 'express-validator';
import { Validation } from '@middlewares';


const router = express.Router();


router.delete(
    '/:paymentId',
    param('paymentId').isMongoId().withMessage('id must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const {paymentId} =req.params;
        const paymentService = new PaymentService();
        const deleted = await paymentService.deletePayment(paymentId);
        if (deleted) {
            return ResponseService.sendSuccess(res,deleted,'Payment deleted successfully');  
                }
           return ResponseService.sendNotFound(res, 'Payment not found.');
});

export { router as deleteRouter };