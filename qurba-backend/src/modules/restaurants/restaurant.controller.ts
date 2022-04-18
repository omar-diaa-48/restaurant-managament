import { Request, Response } from "express";
import { formatResponse } from "../../utils/formatters";
import RestaurantService from "./restaurant.service";

class RestaurantController {
	service: RestaurantService;
	constructor(model: any) {
		this.service = new RestaurantService(model)

		this.listAll = this.listAll.bind(this)
	}

	async listAll(req: Request, res: Response): Promise<void> {
		const data = await this.service.listAll();
		res.status(200).send(formatResponse(data, "GET", 200));
	}

	async findById(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const data = await this.service.findById(id);
		res.status(200).send(formatResponse(data, "GET", 200));
	}

	async addOne(req: Request, res: Response): Promise<void> {
		const record = req.body
		const data = await this.service.addOne(record);
		res.status(200).send(formatResponse(data, "POST", 201));
	}
}

export default RestaurantController;