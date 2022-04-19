import { Document, model, Schema } from 'mongoose';

export interface IGeoObject extends Document {
	type: string,
	coordinates: number[]
}

const geoObjectSchema = new Schema<IGeoObject>({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		required: true
	}
});

const GeoObject = model<IGeoObject>('GeoObject', geoObjectSchema);

geoObjectSchema.index({ coordinates: '2dsphere' });

export default GeoObject;