import { Document } from "mongoose";
import { Restaurant, User } from "../../models";
import AppError from "../../types/app-error";
import BaseService from "../base/base.service";


export default class UserService extends BaseService {
	userModel: any;
	constructor(model: any) {
		super(model)
		this.userModel = model;
	}

	async addRestaurant(userId: string, restaurantId: string): Promise<Document> {
		const user = await User.findById(userId)

		if (!user) {
			throw new AppError("User not found", 404)
		}

		const restaurant = await Restaurant.findById(restaurantId)

		if (!restaurant) {
			throw new AppError("Restaurant not found", 404)
		}

		if (user.favoriteRestaurants?.includes(restaurantId)) {
			throw new AppError("User already favorited the restaurant", 400)
		}

		user.favoriteRestaurants?.push(restaurant)
		await user.save();

		return restaurant;
	}

	async removeRestaurant(userId: string, restaurantId: string) {
		const user = await User.findById(userId)

		if (!user) {
			throw new AppError("User not found", 404)
		}

		const restaurant = await Restaurant.findById(restaurantId)

		if (!restaurant) {
			throw new AppError("Restaurant not found", 404)
		}

		if (user.favoriteRestaurants?.includes(restaurantId)) {
			throw new AppError("User already favorited the restaurant", 400)
		}

		user.favoriteRestaurants = user.favoriteRestaurants?.filter(restaurant => restaurant.id !== restaurant.id)
		await user.save();

		return restaurant;
	}
}