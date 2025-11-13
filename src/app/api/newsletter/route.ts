import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Construct final API URL
    const endpoint = buildApiUrl('newsletters/');

    // Forward request to backend
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Newsletter proxy error:", error);
    return NextResponse.json(
      { error: "Failed to post to newsletter" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
