import { logi } from '@boost';

import * as qrcode from 'qrcode';

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

    private async generateQRCode(data: string) {
        try {
            const qrCodeImage = await qrcode.toDataURL(data);
            return qrCodeImage;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
}