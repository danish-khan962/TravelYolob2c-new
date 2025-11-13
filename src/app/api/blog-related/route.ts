import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const backendUrl = slug
      ? buildApiUrl(`blog-related/?slug=${slug}`)
      : buildApiUrl('blog-related/');

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  } catch (error) {
    console.error("Error in /api/blog-related proxy:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
