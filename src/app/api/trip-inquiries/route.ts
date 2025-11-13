import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function POST(request: Request) {
  try {
    const backendUrl = buildApiUrl('trip-inquiries/');

    const body = await request.json();

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorDetail: string | object;
      try {
        errorDetail = await response.json();
      } catch (e) {
        errorDetail = await response.text();
      }

      console.error(`Backend Error (${response.status}):`, errorDetail);
      return NextResponse.json({ 
          success: false, 
          error: "Backend Validation Failed", 
          details: errorDetail 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/trip-inquiries error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
