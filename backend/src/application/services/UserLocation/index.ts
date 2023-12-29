import { logi } from '@boost';
import { UserModel } from 'application/models/';


export class UserLocationService {
    private logger = logi(__filename);

    constructor() {}

    public async getUserLocation(userId: string) {
        try {
            // Assuming you have a UserModel with a field for user location
            const user = await UserModel.findOne({ _id: userId }).exec();

            if (!user || !user.location) {
                return null;
            }
            
            // Return user location (coordinates)
            return user.location;
        } catch (error: any) {
            this.logger.error(error.message);
            return null;
        }
    }
}
