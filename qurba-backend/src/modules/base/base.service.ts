import { Document, Model } from "mongoose";

export default class BaseService {
	model: Model<any>;
	constructor(baseModel: Model<any>) {
		this.model = baseModel;
	}

	async listAll(): Promise<Document[]> {
		return this.model.find().exec()
	}
}