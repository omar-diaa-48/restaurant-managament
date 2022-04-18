import { NextFunction, Request, Response } from 'express';
import { MongooseError } from "mongoose";

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
	let statusCode: number = 500;
	let error: Error = err;

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

	res.status(statusCode).send({
		code: statusCode,
		error: error.message
	});
};

export default error;
