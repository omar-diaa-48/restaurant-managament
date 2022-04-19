import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import AppError from '../types/app-error';

const error: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
	let code: number = 500;
	let error: string = "Something gone wrong with our server, please contact support";
	let errorArr: {}[] = [];

	if (process.env.NODE_ENV === "development") {
		// console.log({ err });
	}

	if (err instanceof AppError) {
		console.log('AppError');
		code = err.statusCode;
		error = err.message;
		errorArr = err.errorArr;
	}

	// setting error response
	const errorResponse: any = {
		code,
		error,
		errors: errorArr
	};

	res.status(code).send(errorResponse);
};

export default error;
