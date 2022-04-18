export type Pagination = {
	limit: number;
	skip: number;
	search?: {
		field: string,
		value: string | number
	}[],
	sort?: {
		field: string,
		value: "asc" | "desc"
	}
}