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
	listAll = async (pagination?: Pagination): Promise<Document[]> => {
		const usedPagination = formatPagination(pagination!);
		return this.model.find({ ...usedPagination.search }).skip(usedPagination.skip).limit(usedPagination.limit).exec()
	}

	/**
	 * Find a record by id.
	 * @param {string} id record id.
	 * @return {any} The record if any.
	 */
	findById = async (id: string, populatedPaths: string[] = []): Promise<Document> => {
		const record = await this.model.findById(id).populate(populatedPaths).exec()

		if (!record) {
			throw new AppError(`Record with id ${id} not found`, 404);
		}

		return record;
	}

	/**
	 * Adds a record to model.
	 * @param {object} object record initial data.
	 * @return {any} The created record.
	 */
	addOne = async (object: Object, ...args: { field: string, value: any }[]): Promise<any> => {
		let addDto = {
			...object
		}

		if (args && args.length > 0) {

			// add extra fields if any
			args.forEach(element => {
				const { field, value } = element;
				//@ts-ignore
				addDto[field] = value
			});
		}

		return this.model.create({ ...addDto });
	}

	updateOne = async (id: string | number | any, object: Object): Promise<any> => {
		throw new AppError("Method not implemented", 500);
	}

	deleteOne = async (id: string | number | any): Promise<string> => {
		throw new AppError("Method not implemented", 500);
	}
}