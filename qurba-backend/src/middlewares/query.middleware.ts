import { NextFunction, Request, Response } from 'express';
import { Pagination } from '../types/pagination';

const query = (req: Request, res: Response, next: NextFunction) => {
	// initial pagination state
	let pagination: Pagination = {
		limit: 25,
		skip: 0,
		sort: {
			field: "id",
			value: "asc"
		},
		search: []
	}

	// get all the query keys
	const queryKeys = Object.keys(req.query)

	// only if there are queries sent with the request
	if (queryKeys.length > 0) {
		queryKeys.forEach((field: string) => {

			// case of limit and skip are provided
			if (["limit", "skip"].includes(field)) {
				// use the value only if can be parsed to integer
				const value = parseInt(req.query[field]!?.toString())
				if (!isNaN(value)) {
					pagination = {
						...pagination,
						[field]: value
					}
				}
			}

			// case of changing sort
			else if (field === "sort") {
				const values = req.query[field]?.toString().split(':')

				if (values && values.length == 2) {

					// use the value only if matches either asc or desc
					if (["asc", "desc"].includes(values[1])) {
						pagination.sort = {
							field: values[0],
							//@ts-ignore
							value: values[1]
						}
					}
				}
			}

			// case of any other model attribute check
			else {
				const value = req.query[field]
				pagination.search.push({
					field,
					value
				})
			}

		});
	}

	// append the formatted pagination object to the req instance
	req.pagination = pagination;

	next();
};

export default query;
