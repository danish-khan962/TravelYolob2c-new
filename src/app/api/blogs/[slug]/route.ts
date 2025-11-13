import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const url = buildApiUrl(`blogs/${slug}/`);
    console.log("Fetching Blog:", url);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend Error:", res.status, text);
      return NextResponse.json(
        { error: `Failed to fetch blog: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Clean & normalized blog data
    const mappedData = {
      id: data?.id || null,
      slug: data?.slug || "",
      title: data?.title || "Untitled Blog",
      author: data?.author || "TravelYolo Team",
      date:
        data?.published_date
          ? new Date(data.published_date).toLocaleDateString()
          : "Unknown date",
      featured_image:
        data?.featured_image ||
        "https://via.placeholder.com/800x400?text=No+Image+Available",
      excerpt: data?.excerpt || "",
      paragraphs: {
        desktop: [data?.content_desktop || ""],
        mobile: [data?.content_mobile || ""],
      },
      quote: {
        desktop: data?.quote_desktop || "",
        mobile: data?.quote_mobile || "",
      },
      related_blogs: data?.related_blogs || [],
    };

    return NextResponse.json(mappedData);
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
