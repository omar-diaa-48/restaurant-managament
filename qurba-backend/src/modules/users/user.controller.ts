import { Request, Response } from "express";
import { formatResponse } from "../../utils/formatters";
import { GLOBALS } from "../../utils/globals";
import UserService from "./user.service";

class UserController {
	service: UserService;
	constructor(model: any) {
		this.service = new UserService(model)

		this.addOne = this.addOne.bind(this)
		this.addRestaurant = this.addRestaurant.bind(this)
		this.removeRestaurant = this.removeRestaurant.bind(this)
	}

	async addOne(req: Request, res: Response): Promise<void> {
		const record = req.body
		const data = await this.service.addOne(record);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.POST));
	}

	async addRestaurant(req: Request, res: Response): Promise<void> {
		const userId = req.params.id
		const restaurantId = req.body.restaurantId
		const data = await this.service.addRestaurant(userId, restaurantId);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.POST));
	}

	async removeRestaurant(req: Request, res: Response): Promise<void> {
		const userId = req.params.id
		const restaurantId = req.params.restaurantId
		const data = await this.service.removeRestaurant(userId, restaurantId);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.DELETE));
	}
}

export default UserController;