import { model, Schema } from 'mongoose';

interface IRestaurant {
	name: string;
	slug: string;
	cuisine: any;
	location: {
		lat: number,
		lng: number
	}
}

const restaurantSchema = new Schema<IRestaurant>({
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true, unique: true },
	cuisine: { type: Schema.Types.ObjectId, ref: 'Cuisine', required: true },
});

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;