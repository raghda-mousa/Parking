import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logi } from '@boost'
import { EnvironementService } from '@services'
import {
    EUserStatus,
    UserModel
} from '@models'
import { EUserType } from 'application/models/users/enums';

export class UserService {
    private logger = logi(__filename);
    private userModel: UserModel;
    constructor() {
        this.userModel = new UserModel();
    }
    public create = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        try {
            const u = await this.userModel.userModel.findOne({ email });
            if (u) {
                return null
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userModel.userModel.create({ name, email, password: hashedPassword });
            return user
        }
        catch (error: any) {
            this.logger.error(error.message)
            return null
        }
    }
    public login = async (email: string, password: string) => {
        const user = await this.userModel.userModel.findOne({ email, status: EUserStatus.ACTIVE });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null
        }
        const token = jwt.sign({ name: user.name, email: user.email,type:user.type,id:user._id }, EnvironementService.jwtConfig.secret);
        return { token,type:user.type }
    }
    public getUserById = async (id: string) => {
        try {
            const user = await this.userModel.userModel.findById(id);
            return user
        }
        catch (error: any) {
            this.logger.error(error.message)
            return null
        }
    }
    public updateUser = async (email: string, payload: { name: string, password: string }) => {
        try {
            const user = await this.userModel.userModel.findOne({ email });
            if (user) {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                user.update({ password: hashedPassword, name: payload.name });
            }
            return user
        }
        catch (error: any) {
            this.logger.error(error.message)
            return null
        }
    }
    public deleteUser = async (id: string) => {
        try {
            const p = await this.userModel.userModel.findById(id);
            if (!p) {
                return null
            }
            const result = await this.userModel.userModel.findByIdAndUpdate(id, { $set: { status: EUserStatus.DELETED } }, { new: true });
            return result
        } catch (error: any) {
            this.logger.error(error.message)
            return false
        }
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
        const list = await this.userModel.userModel.paginate(query, paginationOptions)
        return list
    }
    public findByIdAndUpdate = async ({ id, name, password }: { id: string, name: string, password: string }) => {
        const p = await this.userModel.userModel.findById(id);
        if (!p) {
            return null
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const parkingLot = await this.userModel.userModel.findByIdAndUpdate(id, { $set: { name, password: hashedPassword } }, { new: true });
        return parkingLot
    }
} 