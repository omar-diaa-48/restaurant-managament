import { NextFunction, Request, Response } from 'express';
import { MongooseError } from "mongoose";
import AppError from '../types/app-error';

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
	let statusCode: number = 500;
	let error: Error = err;
	let errorArr: {}[] = [];

	if (process.env.NODE_ENV === "development") {
		console.log({ err });
		console.log({ stack: err.stack });
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

	res.status(statusCode).send({
		code: statusCode,
		error: error.message
	});
};

export default error;
