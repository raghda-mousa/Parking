// import { logi } from '@boost';
// import { EParkingStatus, ParkingModel, UserModel } from '@models';

// export class NearestParkingService {
//     private logger = logi(__filename);
//     private parkingLotModel: ParkingModel;

//     constructor() {
//         this.parkingLotModel = new ParkingModel();
//     }
//     public async findParkingWithinDistance(userLocation: { lat: number, long: number }, distance: number) {
//         try {

//             const nearestParkingLots = await this.parkingLotModel.parkingModel.find({
//                 location:
//                 {
//                     $nearSphere:
//                     {
//                         $geometry: {
//                             type: "Point",
//                             coordinates: [userLocation.lat, userLocation.long]
//                         },
//                         $maxDistance: distance
//                     }
//                 },
//                 status: EParkingStatus.ACTIVE
//             }).lean().exec();
//             console.log("sss", { nearestParkingLots })
//             return nearestParkingLots.map(p => {
//                 console.log({ p })
//                 if (p._id.toString() === '65b5192a669613d8f83570be')
//                     return {
//                         ...p, color: 'green'
//                     }
//                 return { ...p, color: 'red' }
//             });
//         } catch (error: any) {
//             this.logger.error(error.message);
//             return null;
//         }
//     }
// }
import { logi } from '@boost';
import { EParkingStatus, ParkingModel, UserModel } from '@models';

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


// import { logi } from '@boost';
// import { EParkingStatus, ParkingModel, UserModel } from '@models';

// export class NearestParkingService {
//     private logger = logi(__filename);
//     private parkingLotModel: ParkingModel;

//     constructor() {
//         this.parkingLotModel = new ParkingModel();
//     }

//     public async findParkingWithinDistance(userLocation: { lat: number, long: number }, distance: number) {
//         try {
//             const nearestParkingLots = await this.parkingLotModel.parkingModel.find({
//                 location: {
//                     $nearSphere: {
//                         $geometry: {
//                             type: "Point",
//                             coordinates: [userLocation.lat, userLocation.long]
//                         },
//                         $maxDistance: distance
//                     }
//                 },
//                 status: EParkingStatus.ACTIVE
//             }).lean().exec();

//             console.log("sss", { nearestParkingLots })

//             return nearestParkingLots.map(p => {
//                 console.log({ p });

//                 const color = p.numberOfSlots > 0 ? 'green' : 'red';
//                 const extendedParkingData = {
//                     ...p,
//                     color,
//                     price: p.chargePerMinute, // قم بتغيير هذا بالحقيقي chargePerMinute الموجود في بيانات الموقف
//                 };

//                 return extendedParkingData;
//             });
//         } catch (error: any) {
//             this.logger.error(error.message);
//             return null;
//         }
//     }
// }
