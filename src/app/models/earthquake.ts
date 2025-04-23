export default class TEarthquake {
	date: Date;
	latitude: number;
	longitude: number;
	depth: number;
	magnitude: number;
	location: string;
	city: string;

	constructor(
		date: Date,
		latitude: number,
		longitude: number,
		depth: number,
		magnitude: number,
		location: string,
		city: string
	) {
		this.date = date;
		this.latitude = latitude;
		this.longitude = longitude;
		this.depth = depth;
		this.magnitude = magnitude;
		this.location = location;
		this.city = city;
	}
}
