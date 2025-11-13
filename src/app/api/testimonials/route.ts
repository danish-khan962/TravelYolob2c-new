import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import NextRequest for better type handling of request
import { buildApiUrl } from "@/config/api";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get("package");
    // 🎯 FIX: Read the is_approved parameter
    const isApproved = searchParams.get("is_approved");

    // Dynamically build the query string for the core backend
    const params = [];
    if (packageId) {
        params.push(`package=${packageId}`);
    }

    if (isApproved) {
        params.push(`is_approved=${isApproved}`);
    }

    const queryString = params.length > 0 ? `?${params.join('&')}` : '';

    const backendUrl = buildApiUrl(`testimonials/${queryString}`);
    console.log("Fetching testimonials from:", backendUrl); // Added logging for debugging

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      // Return a proper NextResponse with error status
      const errorData = await response.json().catch(() => ({ error: "Failed to fetch testimonials" }));
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* POST endpoint for comment box */
export async function POST(request: Request) {
  try {
    const backendUrl = buildApiUrl('testimonials/'); // POST should go to the base collection URL

    const body = await request.json();

    const payload = {
      content: body.comment, 
      reviewer_name: body.name || "Anonymous",
      rating: body.rating || 5,
      trip_title: body.tripTitle || "Traveler Story",
    };

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("POST failed:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to submit testimonial", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}