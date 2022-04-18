import { Document, Model } from "mongoose";
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
		console.log(usedPagination.search);
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
	async addOne(object: Object, ...args: any[]): Promise<any> {
		return this.model.create({ ...object });
	}

	async updateOne(id: string | number | any, object: Object): Promise<any> {
		throw new Error("Method not implemented");
	}

	async deleteOne(id: string | number | any): Promise<string> {
		throw new Error("Method not implemented");
	}
}