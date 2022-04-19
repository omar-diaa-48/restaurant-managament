import slugify from "slugify";
import { Restaurant } from "../../models";
import GeoObject from "../../models/geo-object.model";
import AppError from "../../types/app-error";
import BaseService from "../base/base.service";
import { AddRestaurantDTO } from "./dto/restaurant.dto";

export default class RestaurantService extends BaseService {
	restaurantModel: any;
	constructor(model: any) {
		super(model)
		this.restaurantModel = model;
	}

	async findNearest(location: { lat: number, lng: number }, maxDistanceInKm: number = 25): Promise<any> {
		const near = await GeoObject.aggregate([
			{
				$geoNear: {
					near: {
						type: "Point",
						coordinates: [location.lat, location.lng]
					},
					distanceField: "distance",
					maxDistance: maxDistanceInKm * 1000,
					spherical: true
				}
			},
			{ $skip: 0 },
			{ $limit: 5 }
		])

		if (!near) {
			throw new AppError("Nothing near", 404)
		}

		const restaurants = await Promise.all(near.map(async (location) => {
			const restaurant = await Restaurant.findOne({ location: location._id })
			return restaurant;
		}))

		return restaurants;
	}

	async addOne(body: AddRestaurantDTO): Promise<any> {
		const {
			name, cuisine, location
		} = body;

		const slug = slugify(name, { lower: true })

		const restaurantLocation = await GeoObject.create({
			type: "Point",
			coordinates: [location.lng, location.lat]
		})

		const restaurant = await Restaurant.create({
			name,
			slug,
			cuisine,
			location: restaurantLocation._id
		})

		return restaurant;
	}
}