import BaseService from "../base/base.service";


export default class RestaurantService extends BaseService {
	restaurantModel: any;
	constructor(model: any) {
		super(model)
		this.restaurantModel = model;
	}
}