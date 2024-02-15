import { logi } from '@boost';
import { EParkingStatus, ParkingModel } from '@models';

export class NearestParkingService {
    private logger = logi(__filename);
    private parkingLotModel: ParkingModel;

    constructor() {
        this.parkingLotModel = new ParkingModel();
    }

    public async findParkingWithinDistance(userLocation: { lat: number, long: number }, distance: number) {
        try {
            const nearestParkingLots = await this.parkingLotModel.parkingModel.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [userLocation.lat, userLocation.long]
                        },
                        $maxDistance: distance
                    }
                },
                status: EParkingStatus.ACTIVE
            }).lean().exec();

            console.log("sss", { nearestParkingLots })

            return nearestParkingLots.map(p => {
                console.log({ p });

                const color = p.numberOfSlots > 0 ? 'green' : 'red';

                return {
                    ...p,
                    color,
                };
            });
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
}
