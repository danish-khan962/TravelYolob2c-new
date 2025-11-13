import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function POST(request: Request) {
  try {
    // Target your backend endpoint (same base as buildApiUrl)
    const backendUrl = buildApiUrl("client-interests/");

    // Parse request body from frontend
    const body = await request.json();

    // Forward the POST request to your backend
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Handle backend errors (validation, etc.)
    if (!response.ok) {
      let errorDetail: string | object;
      try {
        errorDetail = await response.json();
      } catch {
        errorDetail = await response.text();
      }

      console.error(`Backend Error (${response.status}):`, errorDetail);

      return NextResponse.json(
        {
          success: false,
          error: "Backend Validation Failed",
          details: errorDetail,
        },
        { status: response.status }
      );
    }

    // Parse successful response from backend
    const data = await response.json();

    // Return success response to frontend
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/client-interests error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
