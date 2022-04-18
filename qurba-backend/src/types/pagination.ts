export type Pagination = {
	limit: number;
	skip: number;
	search: { [key: string]: any },
	sort: {
		field: string,
		value: "asc" | "desc"
	}
}