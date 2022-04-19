import { Request, Response } from "express";
import slugify from "slugify";
import { formatResponse } from "../../utils/formatters";
import { GLOBALS } from "../../utils/globals";
import CuisineService from "./cuisine.service";

class CuisineController {
	service: CuisineService;
	constructor(model: any) {
		this.service = new CuisineService(model)
	}

	listAll = async (req: Request, res: Response): Promise<void> => {
		const data = await this.service.listAll(req.pagination);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	findById = async (req: Request, res: Response): Promise<void> => {
		const id = req.params.id
		const data = await this.service.findById(id);
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.GET));
	}

	addOne = async (req: Request, res: Response): Promise<void> => {
		const record = req.body
		const slug = slugify(req.body.name, { lower: true })
		const data = await this.service.addOne(record, { field: "slug", value: slug });
		res.status(200).send(formatResponse(data, GLOBALS.ACTIONS.POST));
	}
}

export default CuisineController;