import { Document, model, Schema } from 'mongoose';

interface IRestaurant extends Document {
	name: string;
	slug: string;
	cuisine: any;
	location: {
		type: string,
		coordinates: number[]
	}
}

const restaurantSchema = new Schema<IRestaurant>({
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true, unique: true },
	cuisine: { type: Schema.Types.ObjectId, ref: 'Cuisine', required: true },
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	}
});

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;