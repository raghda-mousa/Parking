import express, { Router, Request, Response } from 'express';
import { BarcodeService } from 'application/services/QR';

const router = express.Router();
const barcodeService = new BarcodeService();

router.get('/barcode/:reservationId', async (req: Request, res: Response) => {
    try {
        const { reservationId } = req.params;
        const qrCodeImage = await barcodeService.generateBarcode(reservationId);

        if (!qrCodeImage) {
            return res.status(500).json({ error: 'Failed to generate barcode.' });
        }

        res.send(<img src="${qrCodeImage}" alt="QR Code"/>);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export { router as getRouter };