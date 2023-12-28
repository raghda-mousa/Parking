import { logi } from '@boost';
import { ParkingModel } from 'application/models/';

export class ParkingService {
    private parkingModel: ParkingModel;
    private logger = logi(__filename);

    constructor() {
        this.parkingModel = new ParkingModel();
    }

    public async create({ name, duration }: { name: string, duration: number }) {
        try {
            const existingParkingLot = await this.parkingModel.findOne({ name }).exec();
            if (existingParkingLot) {
                return null;
            }

            const parkingLot = await this.parkingModel.create({ name, duration });
            
            return parkingLot;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }

}