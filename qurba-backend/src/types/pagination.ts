export type Pagination = {
	limit: number;
	skip: number;
	search: {
		field: string,
		value: any
	}[],
	sort: {
		field: string,
		value: "asc" | "desc"
	}
}