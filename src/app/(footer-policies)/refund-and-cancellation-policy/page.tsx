"use client"

import React from "react"
import Link from "next/link"

const RefundCancellationPolicy = () => {
  return (
    <section className="w-screen bg-[#F2E9CF]">
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#312E29]">
        <div className="space-y-12">
          {/* Page Title */}
          <h1 className="text-4xl sm:text-5xl font-noto-serif font-bold text-[#6C3B3F] text-center mb-10">
            Refund & Cancellation Policy
          </h1>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              1) General
            </h2>
            <ul className="list-disc pl-6 font-host-grotesk space-y-2">
              <li>
                Many travel services are subject to strict Supplier rules. Airlines/hotels frequently sell
                non-refundable, non-changeable fares/rooms.
              </li>
              <li>
                Where a refund/credit is permitted, Supplier penalties and TravelYollo service fees apply.
                Processing time depends on the Supplier and payment partner.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              2) Cancellations
            </h2>
            <p className="font-host-grotesk leading-relaxed mb-4">
              All cancellations of confirmed reservations are subject to a $350 per person administrative fee.
              Additionally, clients are subject to any cancellation fees assessed by the purveyors of services
              including, without limitation, hotels, transfer providers, activity providers, rail suppliers and/or airlines
              that are identified in the itinerary or that otherwise form part of your travel program.
            </p>
            <p className="font-host-grotesk leading-relaxed mb-4">
              The terms and conditions regarding cancellation of your travel program shall be governed by these
              General Terms and Conditions. If your travel program (i) does include a Cruise, then the terms and
              conditions regarding cancellation of your travel program shall be governed by the Cruise Terms and
              Conditions; and/or (ii) does include a Villa, then the terms and conditions regarding cancellation of your
              travel program shall be governed by the Villa Terms and Conditions.
            </p>
            <p className="font-host-grotesk leading-relaxed mb-4">
              If your travel program does not include a Cruise or a Villa, then any cancellations which occur 90 days
              or more prior to departure will receive full refund minus the $350 per person administrative fee.
              Cancellations which occur 60–89 days prior to departure will be subject to loss of deposit (equal to 30%
              of your travel program price). Cancellations which occur 30–59 days prior to departure will be subject to
              loss equal to 50% of your travel program price. Cancellations which occur 29 days or less will be subject
              to 100% of program price.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              3) Changes
            </h2>
            <p className="font-host-grotesk leading-relaxed mb-4">
              Any and all prices which comprise the whole, or a part, of your travel program are based on current
              rates of exchange, tariffs and taxes. TravelYollo reserves the right to increase the price of your travel
              program in the event of (i) increased costs from suppliers associated with your travel program, (ii)
              tariffs and taxes, and (iii) fluctuations in foreign exchange markets.
            </p>
            <p className="font-host-grotesk leading-relaxed mb-4">
              TravelYollo also reserves the right to withdraw a tour or any part of it, to make such alterations in the
              itinerary or with the tour inclusions as it deems necessary or desirable, and to pass on to tour members
              any expenditures or losses caused by delays or events beyond its control. Itineraries and arranged
              sightseeing tours are subject to change at any time due to unforeseen circumstances or circumstances
              beyond TravelYollo’s control. Every effort will be made to operate tours as planned, but alterations may
              occur after the final itinerary has been issued.
            </p>
            <p className="font-host-grotesk leading-relaxed">
              In the event you request a change to your travel component, you acknowledge and agree that any such
              requested changes may incur additional fees charged to you by TravelYollo.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              4) Claims and Refunds
            </h2>
            <p className="font-host-grotesk leading-relaxed mb-4">
              Refunds are not made for any missed services, except for verifiable extenuating circumstances, as
              such circumstances are determined in the sole discretion of TravelYollo as being meritorious of a full
              or partial refund (each, a “Verifiable Claim”).
            </p>
            <p className="font-host-grotesk leading-relaxed mb-4">
              For Verifiable Claim(s) to be considered, you must (i) submit such claim for a refund in writing to
              TravelYollo within 30 days of the termination of the applicable travel program, (ii) accompany such
              claim for refund with supporting documentation and/or (iii) a statement from the Operating Company
              verifying the claim and that such claim is not otherwise specifically addressed in these General Terms
              and Conditions or the Cruise Terms and Conditions.
            </p>
            <p className="font-host-grotesk leading-relaxed mb-4">
              With respect to any claims in connection with any Villa, in particular, you acknowledge and agree,
              pursuant to the Villa Terms and Conditions, that you are not entitled to any refunds in connection with
              cancellation of any Villa, unless otherwise specified in writing at the time of booking of your travel
              program.
            </p>
            <p className="font-host-grotesk leading-relaxed mb-4">
              Any adjustment in price pursuant to a Verifiable Claim considered will be based on the actual
              price of the services involved in your travel program and not on a per diem basis. Adjustments in price
              pursuant to a Verifiable Claim will not be made for unused sightseeing trips or meals. TravelYollo will
              not accept any liability for any claims that are not received within 30 days of the termination of your
              travel program. All claims for refunds for days missed while travelling should be made in writing to
              TravelYollo within 30 days of the termination of your travel program.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              5) Force Majeure & Extraordinary Events
            </h2>
            <p className="font-host-grotesk leading-relaxed">
              If travel is disrupted by events beyond control (natural disasters, pandemics, political unrest, strikes,
              etc.), Suppliers may offer credits or revised terms; cash refunds are not guaranteed unless required by
              law or Supplier rules.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              6) Refund Method & Timeline
            </h2>
            <ul className="list-disc pl-6 font-host-grotesk space-y-2">
              <li>Approved refunds are issued to the original payment method.</li>
              <li>
                Razorpay/PayPal/ bank timelines typically 7–14 business days after Supplier releases funds to us.
                Some airline refunds can take 6–8 weeks.
              </li>
              <li>
                Convenience charges, service fees, and bank charges are non-refundable unless required by law.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
              7) How to Request
            </h2>
            <Link href={"mailto:contact@travelyollo.com"} className="font-host-grotesk leading-relaxed">
              Email <strong>contact@travelyollo.com</strong> with booking ID, traveller name, service, and reason. We’ll confirm
              eligibility and applicable penalties before proceeding.
            </Link>
          </div>
        </div>
      </section>
    </section>
  )
}

export default RefundCancellationPolicy
