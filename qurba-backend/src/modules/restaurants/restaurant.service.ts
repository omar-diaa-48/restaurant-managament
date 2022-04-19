import GeoObject from "../../models/geo-object.model";
import AppError from "../../types/app-error";
import BaseService from "../base/base.service";

export default class RestaurantService extends BaseService {
	restaurantModel: any;
	constructor(model: any) {
		super(model)
		this.restaurantModel = model;
	}

	async findNearest(location: { lat: number, lng: number }, maxDistanceInKm: number = 5): Promise<any> {
		const near = await GeoObject.aggregate([
			{
				$geoNear: {
					near: {
						type: "Point",
						coordinates: [location.lng, location.lat]
					},
					distanceField: "distance",
					maxDistance: maxDistanceInKm * 1000,
					spherical: true
				}
			},
			{ $skip: 0 },
			{ $limit: 5 }
		])

		// const near = await GeoObject.where('location').near({
		// 	center: {
		// 		type: 'Point',
		// 		coordinates: [location.lng, location.lat]
		// 	},
		// })

		// const near = await GeoObject.geoSearch(
		// 	{},
		// 	{
		// 		near: [location.lng, location.lat],
		// 		maxDistance: maxDistanceInKm * 1000
		// 	}
		// )

		if (!near) {
			throw new AppError("Nothing near", 404)
		}

		return near;
	}
}