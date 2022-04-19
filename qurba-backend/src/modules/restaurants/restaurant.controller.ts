import { Request, Response } from "express";
import { formatResponse } from "../../utils/formatters";
import { GLOBALS } from "../../utils/globals";
import RestaurantService from "./restaurant.service";

class RestaurantController {
	service: RestaurantService;
	constructor(model: any) {
		this.service = new RestaurantService(model)

		this.listAll = this.listAll.bind(this)
		this.findById = this.findById.bind(this)
		this.addOne = this.addOne.bind(this)
		this.findNearest = this.findNearest.bind(this)
	}

	async listAll(req: Request, res: Response): Promise<void> {
		const data = await this.service.listAll(req.pagination);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	async findById(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const data = await this.service.findById(id, ["cuisine"]);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	async addOne(req: Request, res: Response): Promise<void> {
		const record = req.body
		const data = await this.service.addOne(record);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.POST));
	}

	/**
	 * Finds the nearest restaurants to a specific location.
	 * @return {any[]} nearest restaurants.
	 */
	async findNearest(req: Request, res: Response): Promise<void> {
		const lat = req.query.lat;
		const lng = req.query.lng;

		const coordinates = {
			lat: Number(lat),
			lng: Number(lng)
		}

		const maxDistance = req.query.maxDistance ? Number(req.query.maxDistance) : 25;

		const data = await this.service.findNearest(coordinates, maxDistance)
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}
}

export default RestaurantController;