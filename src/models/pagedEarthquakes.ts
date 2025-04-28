import { Earthquakes } from '@prisma/client';

export default class TPagedEarthquake {
    results: Earthquakes[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;

    constructor(
        results: Earthquakes[],
        totalRecords: number,
        totalPages: number,
        currentPage: number
    ) {
        this.results = results;
        this.totalRecords = totalRecords;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}
