import { GetKandilli } from "@/lib/apis/kandilli";
import type TEarthquake from "@/models/earthquake";

export async function GET() {
	const earthquakes: TEarthquake[] = await GetKandilli();
	return new Response(JSON.stringify(earthquakes), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
