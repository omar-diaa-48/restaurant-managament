import BaseService from "../base/base.service";


export default class UserService extends BaseService {
	userModel: any;
	constructor(model: any) {
		super(model)
		this.userModel = model;
	}
}