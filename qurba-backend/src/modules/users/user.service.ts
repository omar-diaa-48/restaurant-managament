import { Restaurant, User } from "../../models";
import AppError from "../../types/app-error";
import BaseService from "../base/base.service";


export default class UserService extends BaseService {
	userModel: any;
	constructor(model: any) {
		super(model)
		this.userModel = model;
	}

	async addRestaurant(userId: string, restaurantId: string) {
		const user = await User.findById(userId)

		if (!user) {
			throw new AppError("User not found", 404)
		}

		const restaurant = await Restaurant.findById(restaurantId)

		if (!restaurant) {
			throw new AppError("Restaurant not found", 404)
		}

		if (user.favoriteCuisines?.includes(restaurantId)) {
			throw new AppError("User already favorited the restaurant", 400)
		}

		user.favoriteCuisines?.push(restaurant)
		await user.save();

		return restaurant;
	}

	async removeRestaurant(userId: string) {
		const user = await this.findById(userId)

		if (!user) {
			throw new Error("User not found")
		}

		return user;
	}
}