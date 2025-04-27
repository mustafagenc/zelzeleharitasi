import { GetKandilli } from '@/lib/apis/kandilli';
import TEarthquake from '@/models/earthquake';
import { prisma } from '@/lib/client';

export async function GET() {
    try {
        prisma.$connect();

        const earthquakes: TEarthquake[] = await GetKandilli();

        await Promise.all(
            earthquakes.map(async (eq) => {
                const existingEarthquake = await prisma.earthquakes.findFirst({
                    where: {
                        date: new Date(eq.date),
                        latitude: eq.latitude,
                        longitude: eq.longitude,
                        depth: eq.depth,
                        magnitude: eq.magnitude,
                        location: eq.location,
                        city: eq.city,
                    },
                });
                if (existingEarthquake) {
                    return;
                }

                await prisma.earthquakes.create({
                    data: {
                        date: new Date(eq.date),
                        latitude: eq.latitude,
                        longitude: eq.longitude,
                        depth: eq.depth,
                        magnitude: eq.magnitude,
                        location: eq.location,
                        city: eq.city,
                        priority: eq.priority,
                        zIndexOffset: eq.zIndexOffset,
                        createdAt: new Date(),
                    },
                });
            })
        );

        prisma.$disconnect();

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}
