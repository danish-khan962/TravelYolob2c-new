"use client"
import Link from "next/link"

import React from "react"

const ShippingDeliveryPolicy = () => {
  return (
    <section className="w-screen bg-[#F2E9CF]">
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#312E29]">
        <div className="space-y-12">
          {/* Page Title */}
          <h1 className="text-4xl sm:text-5xl font-noto-serif font-bold text-[#6C3B3F] text-center mb-10">
            Shipping & Delivery Policy
          </h1>

          {/* Section 1 */}
          <div className="space-y-4">
            <p className="font-host-grotesk leading-relaxed">
              We do not ship physical goods. All services are delivered electronically unless otherwise stated.
            </p>

            <ul className="list-disc pl-6 font-host-grotesk space-y-2">
              <li>
                Travel documents (e-tickets, vouchers, invoices, insurance certificates) are delivered to your
                registered email and/or available in your account on our B2B portal.
              </li>
              <li>
                Physical delivery (if any—for example, SIM cards or printed kits) will be expressly stated on
                your invoice, with courier timelines and charges.
              </li>
            </ul>

            <Link href={"mailto:contact@travelyollo.com"} className="font-host-grotesk leading-relaxed">
              If you have not received your e-documents within the stated timeframe, contact{" "}
              <strong>contact@travelyollo.com</strong>.
            </Link>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ShippingDeliveryPolicy
