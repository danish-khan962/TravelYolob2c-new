import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function GET() {
  try {
    const backendUrl = buildApiUrl("experience-subtypes/");

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      let errorDetail: string | object;
      try {
        errorDetail = await response.json();
      } catch {
        errorDetail = await response.text();
      }

      return NextResponse.json(
        {
          success: false,
          error: "Backend Fetch Failed",
          details: errorDetail,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
