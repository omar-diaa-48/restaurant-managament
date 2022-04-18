import { Request, Response } from "express";
import { formatResponse } from "../../utils/formatters";
import UserService from "./user.service";

class UserController {
	service: UserService;
	constructor(model: any) {
		this.service = new UserService(model)
	}

	async addOne(req: Request, res: Response): Promise<void> {
		const record = req.body
		const data = await this.service.addOne(record);
		res.status(200).send(formatResponse(data, "POST", 201));
	}
}

export default UserController;