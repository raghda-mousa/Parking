// PaymentRoutes.ts
import express, { Router, Request, Response, query } from 'express';
import { PaymentService } from 'application/services/payment';
import { ResponseService } from '@services';
import { Validation } from '@middlewares';
import { body, param } from 'express-validator';

const router = express.Router();

router.get('/:paymentId',
    param('paymentId').isMongoId().withMessage('paymentId must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    try {
        const paymentId: string =req.params.paymentId;
        const paymentService = new PaymentService();
        const payment = await paymentService.getPaymentById(paymentId);

        if (!payment) {
            return ResponseService.sendNotFound(res, 'Payment not found.');
        }

        return ResponseService.sendSuccess(res, payment, 'Payment retrieved successfully');
    } catch (error) {
        return ResponseService.sendInternalServerError(res, 'Internal server error.' );
    }
});

router.get(
    '/',
    body('limit').optional().isInt({ min: 10, max: 50 }).withMessage('limit must be between 10 and 50'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string, 10) || 1;
        const limit: number = parseInt(req.query.limit as string, 10) || 10;
        const paymentService = new PaymentService();
        const { payments, total } = await paymentService.getPayments(page, limit);

        return ResponseService.sendSuccess(res, payments, 'Payments retrieved successfully');

    } catch (error) {
        return ResponseService.sendInternalServerError(res, 'Internal server error.' );
    }
});

export { router as getRouter };