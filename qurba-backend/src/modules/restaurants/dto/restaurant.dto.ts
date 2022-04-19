export type AddRestaurantDTO = {
	name: string;
	cuisine: string;
	location: {
		lng: number,
		lat: number
	}
}