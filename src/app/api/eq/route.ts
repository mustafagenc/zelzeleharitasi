import { prisma } from "@/lib/client";
import { addHoursToDate } from "@/lib/utils";
import { Earthquakes } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract 'page' and 'limit' query parameters from the URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit") || "100", 10); // Default to 100 items per page if not provided

    // Calculate the 'skip' and 'take' values
    const skip = (page - 1) * limit;
    const take = limit;

    const earthquakes = (
      await prisma.earthquakes.findMany({
        orderBy: {
          date: "desc",
        },
        skip,
        take,
      })
    ).map((eq: Earthquakes) => {
      return {
        ...eq,
        date: addHoursToDate(new Date(eq.date), -3),
      };
    });

    const totalRecords = await prisma.earthquakes.count();
    const totalPages = Math.ceil(totalRecords / limit);

    return NextResponse.json(
      {
        results: earthquakes,
        totalRecords,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching earthquakes:", error);
    return NextResponse.json(
      { error: "Failed to fetch earthquakes" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
