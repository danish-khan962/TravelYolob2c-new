import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  console.log("Fetching itinerary-days for slug:", slug);

  try {
    // Step 1: Fetch package by slug
    const packageUrl = buildApiUrl(`packages/${slug}/`);
    const packageRes = await fetch(packageUrl, {
      headers: { "Content-Type": "application/json" },
    });

    if (!packageRes.ok) {
      console.error("Package fetch failed:", packageRes.status);
      return NextResponse.json(
        { error: "Failed to fetch package details", status: packageRes.status },
        { status: packageRes.status }
      );
    }

    const packageData = await packageRes.json();
    const packageId = packageData.id;
    if (!packageId) {
      console.error("No package ID found in response:", packageData);
      return NextResponse.json(
        { error: "Package ID not found" },
        { status: 500 }
      );
    }

    // Step 2: Fetch itinerary days
    const itineraryUrl = buildApiUrl(`itinerary-days/?package=${packageId}`);
    const itineraryRes = await fetch(itineraryUrl, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!itineraryRes.ok) {
      console.error("Itinerary fetch failed:", itineraryRes.status);
      return NextResponse.json(
        { error: "Failed to fetch itinerary days", status: itineraryRes.status },
        { status: itineraryRes.status }
      );
    }

    const itineraryData = await itineraryRes.json();
    console.log("Itinerary fetched:", itineraryData);
    console.log("Sample day data (first item):", itineraryData?.results?.[0]);

    // Step 3: Format result with lat/lng
    const formatted =
      itineraryData?.results?.map((day: any) => ({
        id: day.id,
        day_number: day.day_number,
        title: day.title,
        activities: Array.isArray(day.activities)
          ? day.activities
          : [],
        latitude: day.latitude ?? null,
        longitude: day.longitude ?? null,
      })) || [];

    console.log("Formatted data sample:", formatted[0]);

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: any) {
    console.error("Error in itinerary-days route:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
