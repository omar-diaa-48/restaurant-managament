import { Request, Response } from "express";
import { formatResponse } from "../../utils/formatters";
import { GLOBALS } from "../../utils/globals";
import UserService from "./user.service";

class UserController {
	service: UserService;
	constructor(model: any) {
		this.service = new UserService(model)

		this.listAll = this.listAll.bind(this)
		this.findById = this.findById.bind(this)
		this.addOne = this.addOne.bind(this)
		this.addRestaurant = this.addRestaurant.bind(this)
		this.removeRestaurant = this.removeRestaurant.bind(this)
	}

	async listAll(req: Request, res: Response): Promise<void> {
		const data = await this.service.listAll(req.pagination);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	async findById(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const data = await this.service.findById(id, ["favoriteRestaurants"]);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
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