import { IParkingSpace } from 'application/models/parking-space/';
import {  IParkingSpaceModel } from 'application/models/parking-space/schemas/';
import { Types } from 'mongoose';

export class ParkingSpaceService {
    private parkingSpaceModel: IParkingSpaceModel;

    constructor(parkingSpaceModel: IParkingSpaceModel) {
        this.parkingSpaceModel = parkingSpaceModel;
    }

    public createParkingSpace = async (parkingSpaceData: IParkingSpace): Promise<IParkingSpace | null> => {
        try {
            const parkingSpace = await this.parkingSpaceModel.create(parkingSpaceData);
            return parkingSpace;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public getParkingSpaceById = async (parkingSpaceId: Types.ObjectId): Promise<IParkingSpace | null> => {
        try {
            const parkingSpace = await this.parkingSpaceModel.findById(parkingSpaceId);
            return parkingSpace;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public updateParkingSpace = async (
        parkingSpaceId: Types.ObjectId,
        updateData: Partial<IParkingSpace>
    ): Promise<IParkingSpace | null> => {
        try {
            const parkingSpace = await this.parkingSpaceModel.findByIdAndUpdate(parkingSpaceId, updateData, { new: true });
            return parkingSpace;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    public deleteParkingSpace = async (parkingSpaceId: Types.ObjectId): Promise<boolean> => {
        try {
            const result = await this.parkingSpaceModel.findByIdAndDelete(parkingSpaceId);
            return !!result;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    public getAvailableParkingSpaces = async (): Promise<IParkingSpace[]> => {
        try {
            const availableSpaces = await this.parkingSpaceModel.find({ isOccupied: false });
            return availableSpaces;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

}