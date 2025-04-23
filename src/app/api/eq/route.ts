import TEarthquake from '@/models/earthquake';
import { load } from 'cheerio';
import request from 'request';

export async function GET() {
	const earthquakes: TEarthquake[] = [];

	await new Promise((resolve, reject) => {
		request(
			'http://www.koeri.boun.edu.tr/scripts/lst0.asp',
			(error, response, html) => {
				if (error) {
					reject(error);
					return;
				}
				if (response.statusCode == 200) {
					const loadedHtml = load(html);
					const response = loadedHtml('pre').text();

					let result = response.split('\n');
					result = result.splice(6, result.length + 1);

					result.forEach((element) => {
						const eqString = element.split(' ');
						const eqInfo = [];
						for (let i = 0; i < eqString.length; i++) {
							if (eqString[i].length > 0) {
								eqInfo.push(eqString[i]);
							}
						}

						const date = new Date(eqInfo[0]);
						const yy = date.getFullYear();
						const mm = date.getMonth();
						const dd = date.getDate();

						if (eqInfo[1]) {
							const [hours, minutes, seconds] =
								eqInfo[1].split(':');
							const completeDate = new Date(
								yy,
								mm,
								dd,
								Number(hours),
								Number(minutes),
								Number(seconds)
							);

							const latitude = parseFloat(eqInfo[2]);
							const longitude = parseFloat(eqInfo[3]);
							const depth = parseFloat(eqInfo[4]);
							const magnitude = parseFloat(eqInfo[6]);
							const location = eqInfo[8];
							const city = eqInfo[9];

							const earthquake = new TEarthquake(
								completeDate,
								latitude,
								longitude,
								depth,
								magnitude,
								location,
								city
							);
							earthquakes.push(earthquake);
						} else {
							console.error('');
						}
					});
					resolve(earthquakes);
				} else {
					reject(new Error(`Status code: ${response.statusCode}`));
				}
			}
		);
	});

	return new Response(JSON.stringify(earthquakes), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}
