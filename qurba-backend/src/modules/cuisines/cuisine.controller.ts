import { Request, Response } from "express";
import slugify from "slugify";
import { formatResponse } from "../../utils/formatters";
import { GLOBALS } from "../../utils/globals";
import CuisineService from "./cuisine.service";

class CuisineController {
	service: CuisineService;
	constructor(model: any) {
		this.service = new CuisineService(model)

		this.listAll = this.listAll.bind(this)
		this.findById = this.findById.bind(this)
	}

	async listAll(req: Request, res: Response): Promise<void> {
		const data = await this.service.listAll(req.pagination);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	async findById(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const data = await this.service.findById(id);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	async addOne(req: Request, res: Response): Promise<void> {
		const record = req.body
		const slug = slugify(req.body.name, { lower: true })
		const data = await this.service.addOne(record, { field: "slug", value: slug });
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.POST));
	}
}

export default CuisineController;