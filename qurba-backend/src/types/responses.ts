export type ErrorResponse = {
	error: string,
	code: number,
};

export type SuccessResponse = {
	data: any[],
	count: number,
	action: number,
	code: number,
}