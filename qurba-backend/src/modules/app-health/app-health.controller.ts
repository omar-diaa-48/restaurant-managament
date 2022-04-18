import { Request, Response } from "express";

class AppHealthController {
	async ok(req: Request, res: Response) {
		res.status(200).send({
			data: null,
			count: 0,
			action: "Check Health",
			code: 200,
			message: "Backend is OK!"
		})
	}
}

export default AppHealthController;