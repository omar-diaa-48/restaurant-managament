import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { MongooseError } from "mongoose";
import AppError from '../types/app-error';

const error: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	let statusCode: number = 500;
	let error: Error = err;
	let errorArr: {}[] = [];

	console.error("error");

	if (process.env.NODE_ENV === "development") {
		console.log({ err });
	}

	if (err instanceof SyntaxError) {
		statusCode = 400;
	}

	else if (err instanceof MongooseError) {
		statusCode = 422;
	}

	if (error instanceof AppError) {
		statusCode = error.statusCode;
		errorArr = error.errorArr;
	}

	if (statusCode === 500) {
		error = new AppError('Something gone wrong with our server, please contact support', 500);
	}

	// setting error response
	const errorResponse: {} = {
		code: statusCode,
		error: error.message,
	};

	// add errors array if exists
	if (errorArr !== null) {
		//@ts-ignore
		errorResponse['errors'] = errorArr;
	}

	res.status(statusCode).send(errorResponse);
};

export default error;
