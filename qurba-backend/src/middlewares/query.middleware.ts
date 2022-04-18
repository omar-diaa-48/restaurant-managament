import { NextFunction, Request, Response } from 'express';
import { Pagination } from '../types/pagination';

const query = (req: Request, res: Response, next: NextFunction) => {
	let pagination: Pagination = {
		limit: 25,
		skip: 0
	}

	const queryKeys = Object.keys(req.query)

	if (queryKeys.length > 0) {
		queryKeys.forEach((field: string) => {

			if (["limit", "skip"].includes(field)) {
				const value = req.query[field]
				pagination = {
					...pagination,
					[field]: value
				}
			}

			else if (field === "sort") {
				const values = req.query[field]?.toString().split(':')

				if (values && values.length == 2) {

					if (["asc", "desc"].includes(values[1])) {
						pagination.sort = {
							field: values[0],
							value: values[1]
						}
					}
				}
			}

			else {

			}

		});
	}

	req.pagination = pagination;;
};

export default query;
