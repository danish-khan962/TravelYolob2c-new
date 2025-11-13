import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const backendUrl = buildApiUrl(`packages/${slug}/`);
    console.log("Fetching from backend:", backendUrl);

    const res = await fetch(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store", // disable cache for dynamic package data
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", res.status, text);
      return NextResponse.json(
        { error: `Failed to fetch: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Return the entire backend response as-is
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching package:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
