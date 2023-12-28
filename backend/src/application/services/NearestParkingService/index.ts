import { logi } from '@boost';
import { ParkingModel } from 'application/models/';
import { UserLocationService } from '../UserLocationService';  

export class NearestParkingService {
    private logger = logi(__filename);
    private parkingLotModel: ParkingModel;
    private userLocationService: UserLocationService; 

    constructor() {
        this.parkingLotModel = new ParkingModel();
        this.userLocationService = new UserLocationService();
    }

    public async findNearestParking(userId: string) {
        try {
            // Get user location
            const userLocation = await this.userLocationService.getUserLocation(userId);
            
            if (!userLocation) {
                return null;
            }

            const nearestParking = await this.findNearestParkingLot(userLocation);

            return nearestParking;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }

    private async findNearestParkingLot(userLocation: { lat: number, lon: number }) {
        try {
            // Use a geo-spatial query to find the nearest parking lot
            const nearestParkingLot = await this.parkingLotModel.findOne({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [userLocation.lon, userLocation.lat]
                        },
                        $maxDistance: 1000  // Max distance in meters, adjust as needed
                    }
                }
            }).exec();

            return nearestParkingLot;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
}