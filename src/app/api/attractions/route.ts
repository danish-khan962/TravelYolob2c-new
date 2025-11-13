import { NextResponse } from "next/server"
import { buildApiUrl } from "@/config/api"

export async function GET() {
  try {
    const res = await fetch(buildApiUrl('attractions/'), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch attractions" },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.error("Error fetching attractions:", err)
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    )
  }
}
