class AppError extends Error {
	public statusCode: number;
	public errorArr: {}[];

	constructor(message: string, statusCode: number, errorArr: {}[] = []) {
		super(message);
		this.statusCode = statusCode;
		this.errorArr = errorArr;
	}
}

export default AppError;
