import { logi } from '@boost';
import {
    EParkingLotStatus,
    ParkingLotModel
} from '@models'

export class ParkingLotService {
    private parkingLotModel: ParkingLotModel;
    private logger = logi(__filename);
    constructor() {
        this.parkingLotModel = new ParkingLotModel();
    }
    public create = async ({ name }: { name: string }) => {
        const p = await this.parkingLotModel.parkingLotModel.findOne({ name });
        if (p) {
            return null
        }
        const parkingLot = await this.parkingLotModel.parkingLotModel.create({ name });
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
        const list = await this.parkingLotModel.parkingLotModel.paginate(query, paginationOptions)
        return list
    }
    public findByIdAndUpdate = async ({ id, name }: { id: string, name: string }) => {
        const p = await this.parkingLotModel.parkingLotModel.findById(id);
        if (!p) {
            return null
        }
        const parkingLot = await this.parkingLotModel.parkingLotModel.findByIdAndUpdate(id, { $set: { name } }, { new: true });
        return parkingLot
    }
    public findByIdAndDelete = async (id: string) => {
        const p = await this.parkingLotModel.parkingLotModel.findById(id);
        if (!p) {
            return null
        }
        const result = await this.parkingLotModel.parkingLotModel.findByIdAndUpdate(id, { $set: { status: EParkingLotStatus.DELETED } }, { new: true });
        return result
    }
    public getParkingLotById = async (id: string) => {
        try {
            const p = await this.parkingLotModel.parkingLotModel.findById(id);
            return p
        }
        catch (error: any) {
            this.logger.error(error.message)
            return null
        }
    }
} 