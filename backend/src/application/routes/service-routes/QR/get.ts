import express, { Router, Request, Response } from 'express';
import { BarcodeService } from 'application/services/QR';
import { query, param, body } from 'express-validator';
import { ResponseService } from '@services';
import { Validation } from '@middlewares';

const router = express.Router();

router.get('/:reservationId',
    param('reservationId').isMongoId().withMessage('reservationId must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { reservationId } = req.params;
        const barcodeService = new BarcodeService();
        const qrCodeImage = await barcodeService.generateBarcode(reservationId);

        if (!qrCodeImage) {
            return ResponseService.sendAlreadyCreated(res,'Failed to generate barcode.');
        }
        return ResponseService.sendSuccess(res,qrCodeImage,'Create a successful QR ');
    });

// router.get('/qr',
//     Validation.authenticate,
//     Validation.validateRequest,
//     async (req: Request, res: Response) => {
//         const barcodeService = new BarcodeService();
//         const qrCodeImage = await barcodeService.generateRandomQR();

//         if (!qrCodeImage) {
//             return ResponseService.sendAlreadyCreated(res, 'Failed to generate barcode.');
//         }
//         return ResponseService.sendSuccess(res, qrCodeImage, 'Create a successful QR ');
//     });

export { router as getRouter };