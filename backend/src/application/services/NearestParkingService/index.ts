import { logi } from '@boost'; 
import { ParkingModel, UserModel } from 'application/models/'; 

export class NearestParkingService {
    private logger = logi(__filename);
    private parkingLotModel: ParkingModel;

    constructor() {
        this.parkingLotModel = new ParkingModel();
    }
    
    public async getCurrentLocation() {
        if ('geolocation' in navigator) {
            try {
                const position = await this.getPosition();
                return { lat: position.coords.latitude, lon: position.coords.longitude };
            } catch (error) {
                console.error('Error getting location:', error);
                return null;
            }
        } else {
            console.error('Geolocation is not supported');
            return null;
        }
    }

    private getPosition(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    public async findParkingWithinDistance(userLocation: { lat: number, lon: number }, distance: number) {
        try {
            const nearestParkingLots = await this.parkingLotModel.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [userLocation.lon, userLocation.lat]
                        },
                        $maxDistance: distance  
                    }
                }
            }).exec();

            return nearestParkingLots;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
}
