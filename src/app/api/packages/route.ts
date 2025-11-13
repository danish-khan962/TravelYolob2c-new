import { buildApiUrl } from '@/config/api';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const backendUrl = buildApiUrl(`packages/${query ? `?${query}` : ""}`);

    console.log("Fetching packages from:", backendUrl);

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch packages" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
