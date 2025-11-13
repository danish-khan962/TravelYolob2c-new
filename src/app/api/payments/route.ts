// /app/api/payments/route.ts
import { NextResponse } from "next/server";
import { buildApiUrl } from "@/config/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Payment payload as expected by CMS
    const formatted = {
      booking: body.booking, // must be a valid booking UUID from CMS
      razorpay_order_id: body.razorpay_order_id,
      razorpay_payment_id: body.razorpay_payment_id,
      razorpay_signature: body.razorpay_signature,
      amount: body.amount,
      currency: body.currency,
      status: body.status,
      payment_method: body.payment_method || "upi",
      failure_reason: body.failure_reason || "",
    };

    console.log("➡️ Forwarding payment payload to CMS:", formatted);

    const res = await fetch(buildApiUrl('payments/'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization header later if needed:
        // "Authorization": `Bearer ${process.env.API_AUTH_TOKEN}`,
      },
      body: JSON.stringify(formatted),
    });

    const data = await res.json();
    console.log("📘 /payments → CMS response:", res.status, data);

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ Error in /api/payments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
