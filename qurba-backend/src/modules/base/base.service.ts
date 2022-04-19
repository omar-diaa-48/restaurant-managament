import { Document, Model } from "mongoose";
import AppError from "../../types/app-error";
import { Pagination } from "../../types/pagination";
import { formatPagination } from "../../utils/formatters";

export default class BaseService {
	model: Model<any>;
	constructor(baseModel: Model<any>) {
		this.model = baseModel;
	}

	/**
	 * List all records of a model.
	 * @param {object} pagination pagination.
	 * @return {any[]} The result of the query.
	 */
	async listAll(pagination?: Pagination): Promise<Document[]> {
		const usedPagination = formatPagination(pagination!);
		return this.model.find({ ...usedPagination.search }).skip(usedPagination.skip).limit(usedPagination.limit).exec()
	}

	/**
	 * Find a record by id.
	 * @param {string} id record id.
	 * @return {any} The record if any.
	 */
	async findById(id: string, populatedPaths: string[] = []): Promise<Document> {
		return this.model.findById(id).populate(populatedPaths).exec()
	}

	/**
	 * Adds a record to model.
	 * @param {object} object record initial data.
	 * @return {any} The created record.
	 */
	async addOne(object: Object, ...args: { field: string, value: any }[]): Promise<any> {
		let addDto = {
			...object
		}

		if (args && args.length > 0) {

			args.forEach(element => {
				const { field, value } = element;
				//@ts-ignore
				addDto[field] = value
			});
		}

		return this.model.create({ ...addDto });
	}

	async updateOne(id: string | number | any, object: Object): Promise<any> {
		throw new AppError("Method not implemented", 500);
	}

	async deleteOne(id: string | number | any): Promise<string> {
		throw new AppError("Method not implemented", 500);
	}
}