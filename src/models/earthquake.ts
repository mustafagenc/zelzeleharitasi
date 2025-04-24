export default class TEarthquake {
  date: Date;
  latitude: number;
  longitude: number;
  depth: number;
  magnitude: number;
  location: string;
  city: string;

  priority: "low" | "normal" | "high" | "critical" = "low";
  zIndexOffset: 1 | 10 | 100 | 1000 = 1;

  /**
   * Creates an instance of TEarthquake.
   * @param {Date} date - The date of the earthquake.
   * @param {number} latitude - The latitude of the earthquake.
   * @param {number} longitude - The longitude of the earthquake.
   * @param {number} depth - The depth of the earthquake.
   * @param {number} magnitude - The magnitude of the earthquake.
   * @param {string} location - The location of the earthquake.
   * @param {string} city - The city affected by the earthquake.
   * @returns {TEarthquake} An instance of TEarthquake.
   */
  constructor(
    date: Date,
    latitude: number,
    longitude: number,
    depth: number,
    magnitude: number,
    location: string,
    city: string,
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
