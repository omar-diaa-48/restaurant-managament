import { Pagination } from "../pagination";

declare global {
	namespace Express {
		interface Request {
			pagination: Pagination;
		}
	}
}
