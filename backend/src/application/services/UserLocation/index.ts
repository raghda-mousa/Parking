import { logi } from '@boost';
import { UserModel } from 'application/models/';


export class UserLocationService {
    private logger = logi(__filename);

    constructor() {}

    public async getUserLocation(userId: string) {
        try {
            const user = await UserModel.findOne({ _id: userId }).exec();

            if (!user || !user.location) {
                return null;
            }
            
            return user.location;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
        public async getCurrentLocation(): Promise<{ lat: number; lon: number } | null> {
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
    }
