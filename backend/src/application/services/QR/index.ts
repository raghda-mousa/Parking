import { logi } from '@boost';
import { UserModel, UsersSchema } from '@models';
import { v4 as uuidv4 } from 'uuid';

import * as qrcode from 'qrcode';
import { ReservationService } from '../reservation';

export class BarcodeService {
    private logger = logi(__filename);
    constructor() {
    }

    public async generateBarcode(reservationId:string) {
        try {
            const qrCodeImage = await this.generateQRCode(reservationId);

            return qrCodeImage;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
    // ... (your existing imports and code)

    // public async generateRandomQR() {
    //     try {
    //         // Generate a random string
    //         const randomValue = this.generateQRCode();

    //         // Now you can use the randomValue as the generated QR code
    //         const qrCodeImage = await this.generateQRCode();

    //         return qrCodeImage;
    //     } catch (error: any) {
    //         this.logger.error(error.message);
    //         return null;
    //     }
    // }
    private async generateQRCode(data: string) {
        try {
            const qrCodeImage = await qrcode.toDataURL(data);
            // const qrCodeBuffer = await qrcode.toBuffer(data);
            // return qrCodeBuffer;
            return qrCodeImage;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
}