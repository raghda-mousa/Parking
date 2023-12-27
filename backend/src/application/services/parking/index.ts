import { logi } from '@boost';
import {
    EParkingStatus,
    ParkingModel
} from '@models'
import { ECities } from 'application/models/parking/enums';
import { ReservationService } from '../reservation';

export class ParkingService {
    private parkingModel: ParkingModel;
    private reservationService : ReservationService;
    private logger = logi(__filename);
    constructor() {
        this.parkingModel = new ParkingModel();
        this.reservationService= new ReservationService();
    }
    public create = async ({ name,city,numberOfSlots,userId }: { name: string,city:ECities,numberOfSlots:number,userId:string }) => {
        const p = await this.parkingModel.parkingModel.findOne({ name });
        if (p) {
            return null
        }
        const parkingLot = await this.parkingModel.parkingModel.create({ name,city,numberOfSlots,createdBy:userId });
        return parkingLot
    }
    public list = async (page: string, limit: string, searchKey: string) => {
        const paginationOptions = {
            page: +(page ?? 1),
            limit: +(limit ?? 10),
            sort: { createdAt: -1 }
        };
        let query: any = {}
        if (searchKey) {
            query = { $text: { $search: searchKey, $caseSensitive: false } }
        }
        const list = await this.parkingModel.parkingModel.paginate(query, paginationOptions)
        return list
    }
    public findByIdAndUpdate = async ({ id, name }: { id: string, name: string }) => {
        const p = await this.parkingModel.parkingModel.findById(id);
        if (!p) {
            return null
        }
        const parkingLot = await this.parkingModel.parkingModel.findByIdAndUpdate(id, { $set: { name } }, { new: true });
        return parkingLot
    }
    public findByIdAndDelete = async (id: string) => {
        const p = await this.parkingModel.parkingModel.findById(id);
        if (!p) {
            return null
        }
        const result = await this.parkingModel.parkingModel.findByIdAndUpdate(id, { $set: { status: EParkingStatus.DELETED } }, { new: true });
        return result
    }
    public getParkingById = async (id: string) => {
        try {
            const p = await this.parkingModel.parkingModel.findById(id);
            return p
        }
        catch (error: any) {
            this.logger.error(error.message)
            return null
        }
    }
    public getAvailableParkingLots = async (parkingId:string) => {
        try {
            const parking = await this.parkingModel.parkingModel.findById(parkingId);
            if(!parking)
            {
                ////
                return
            }
            const reservations = await this.reservationService.getReservationsByParkingId(parkingId);
            if(!reservations)
            {
                ///
            }

            return parking.numberOfSlots - reservations.length;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
} 