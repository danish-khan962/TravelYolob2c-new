import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const backendUrl = buildApiUrl(`blogs/${slug}/like/`);

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  } catch (error) {
    console.error("Error in /api/blogs/[slug]/like proxy:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
