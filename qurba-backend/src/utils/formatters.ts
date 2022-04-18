import { SuccessResponse } from "../types/responses"

export const formatResponse = (data: any[] | any, action: string, code: number, message?: string): SuccessResponse => {
	return {
		data,
		count: data?.length,
		action,
		code,
		message
	}
}