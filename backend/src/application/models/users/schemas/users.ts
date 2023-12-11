import { Document, Model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IUser } from '../interfaces';
import {
	EUserStatus, EUserType,
} from '../enums';
const USERS_MODEL_NAME = 'user';
const USERS_COLLECTION_NAME = 'users';
interface IUsersDoc extends IUser, Document { }
interface IUsersModel extends PaginateModel<IUsersDoc> {
	build: (attr: IUser) => IUsersDoc;
};

const UsersSchema = new Schema(
	{
		name: { type: String },
		status: {
			type: String,
			enum: EUserStatus,
			default: EUserStatus.ACTIVE
		},
		type: {
			type: String,
			enum: EUserType,
			default: EUserType.USER
		},
		email: { type: String },
		password: { type: String },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date },
		createdBy: { type: String },
		updatedBy: { type: String }
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret.__v;
			}
		}
	}
);

UsersSchema.plugin(paginate);
UsersSchema.index({
	name: 'text',
	status: 'text',
	email: 'text'
});
UsersSchema.index({ name: 1 });
UsersSchema.index({ status: 1 });

export {
	IUsersDoc,
	IUsersModel,
	UsersSchema,
	USERS_MODEL_NAME,
	USERS_COLLECTION_NAME
};
