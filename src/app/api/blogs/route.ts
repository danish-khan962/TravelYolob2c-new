import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function GET() {
  try {
    const backendUrl = buildApiUrl('blogs/');
    console.log("Fetching blogs from:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.status);
      return NextResponse.json(
        { error: "Failed to fetch blogs" },
        { status: res.status }
      );
    }

    const data = await res.json();

    const formatted =
      data?.results?.map((blog: any) => ({
        id: blog.id,
        slug: blog.slug,
        title: blog.title || "Untitled Blog",
        excerpt: blog.excerpt || "No description available",
        author: blog.author || "Unknown Author",
        date: blog.published_date || "N/A",
        image: blog.featured_image || "/images/default-blog.jpg",
      })) || [];

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
