import { Document } from "mongoose";
import BaseService from "../base/base.service";


export default class RestaurantService extends BaseService {
	restaurantModel: any;
	constructor(model: any) {
		super(model)
		this.restaurantModel = model;
	}

	async findById(id: string): Promise<Document[]> {
		return this.model.findById(id).populate(["cuisine"]).exec()
	}
}