import { model, Schema } from 'mongoose';

interface IUser {
	firstName: string;
	lastName: string;
	age: number;
	email: string;
	favoriteRestaurants?: any[];
}

const userSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	age: { type: Number, required: true },
	email: { type: String, required: true },
	favoriteRestaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
});

const User = model<IUser>('User', userSchema);

export default User;