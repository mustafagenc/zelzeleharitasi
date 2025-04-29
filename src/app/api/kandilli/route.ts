import { GetKandilli } from "@/lib/apis/kandilli";
import { Earthquakes } from "@prisma/client";

export async function GET() {
  const earthquakes: Earthquakes[] = await GetKandilli();
  return new Response(JSON.stringify(earthquakes), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
