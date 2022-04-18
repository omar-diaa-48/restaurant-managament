import { model, Schema } from 'mongoose';

interface ICuisine {
	name: string;
	slug: string;
}

const cuisineSchema = new Schema<ICuisine>({
	name: { type: String, required: true, unique: true },
	slug: { type: String, required: true, unique: true }
});

const Cuisine = model<ICuisine>('Cuisine', cuisineSchema);

export default Cuisine;