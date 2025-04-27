import { prisma } from '@/lib/client';

export async function GET() {
    try {
        const earthquakes = await prisma.earthquakes.findMany({
            orderBy: {
                id: 'desc',
            },
        });
        return Response.json(earthquakes);
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}
