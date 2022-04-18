import { Pagination } from "../types/pagination";
import { SuccessResponse } from "../types/responses";

export const formatResponse = (data: any[] | any, action: { title: string, code: number }, message?: string): SuccessResponse => {
	return {
		data,
		count: data?.length,
		action: action.title,
		code: action.code,
		message
	}
}

export const formatPagination = (pagination: Pagination, extraArgs?: { [key: string]: string | number | boolean }[]): Pagination => {
	// initial pagination state
	let usedPagination: Pagination = {
		...pagination
	}

	// format pagination where clause and add extra args if any
	if (extraArgs && extraArgs.length > 0) {
		extraArgs.forEach(arg => {
			if (arg && typeof Object.values(arg)[0] !== "undefined") {
				usedPagination.search = {
					...usedPagination.search,
					...arg
				}
			}
		});
	}

	return usedPagination;
}