export type ErrorResponse = {
	error: string;
	code: number;
};

export type SuccessResponse = {
	data: any[];
	count: number;
	action: string;
	code: number;
	message?: string;
}