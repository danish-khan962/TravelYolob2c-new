"use client"

import React from "react"

const PrivacyPolicy = () => {
  return (
    <section className="w-screen bg-[#F2E9CF]">
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[#312E29]">
      <div className="space-y-12">
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-noto-serif font-bold text-[#6C3B3F] text-center mb-10">
          Privacy Policy
        </h1>

        {/* Section 1 */}
        <div>
          <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">
            1) Who We Are
          </h2>
          <p className="font-host-grotesk leading-relaxed">
            Travel Yollo (“TravelYollo”, “we”, “us”, “our”) is a travel company that curates and sells travel
            experiences and related services.
          </p>
          <ul className="list-disc pl-6 mt-3 font-host-grotesk space-y-1">
            <li><strong>Legal entity:</strong> VZ TRAVELYOLLO PRIVATE LIMITED</li>
            <li><strong>CIN:</strong> U79110MH2025PTC445161</li>
            <li><strong>Registered address:</strong> A 802, AAKANKSHA, OFF YARI, RD, VERSOVA, ANDHERI WEST, Vesava, Mumbai-400061, Maharashtra</li>
            <li><strong>Contact:</strong> contact@travelyollo.com | +91-9821112284</li>
          </ul>
          <p className="mt-3 font-host-grotesk leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information
            when you visit our websites and B2B portal, make a booking, or interact with us.
            By using our website(s) or services, you consent to this Privacy Policy.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">2) What Data We Collect</h2>
          <ul className="list-disc pl-6 font-host-grotesk space-y-2">
            <li>Identifiers & contact: name, email, phone, postal address.</li>
            <li>Travel documents: passport details, visa details, date of birth, nationality.</li>
            <li>Booking details: itinerary, preferences, special requests.</li>
            <li>Payment details: limited card/UPI information processed by our payment partners (we do not store full card data).</li>
            <li>Sensitive info (optional): medical/dietary needs or accessibility requirements you choose to share so we can arrange suitable services.</li>
            <li>Technical data: device, IP, browser, cookies, and analytics events.</li>
            <li>Communications: emails, chat transcripts, call recordings (where applicable).</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">3) Why We Collect It (Lawful Purposes)</h2>
          <ul className="list-disc pl-6 font-host-grotesk space-y-2">
            <li>Provide and personalize travel services and customer support.</li>
            <li>Process bookings, payments, refunds, and travel insurance (where applicable).</li>
            <li>Communicate itineraries, confirmations, alerts, and updates.</li>
            <li>Comply with legal obligations (KYC, taxation, and prevention of fraud).</li>
            <li>Improve our sites, products, and marketing with aggregated analytics.</li>
            <li>Send service emails; send marketing only with your consent/opt-in (you can opt out any time).</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">4) Sharing Your Data</h2>
          <p className="font-host-grotesk mb-3 leading-relaxed">
            We share data only as needed to deliver/operate services or as required by law:
          </p>
          <ul className="list-disc pl-6 font-host-grotesk space-y-2">
            <li>Travel suppliers: airlines, hotels, DMCs, guides, insurers, visa agents, and car rentals.</li>
            <li>Payment processors: e.g., Razorpay and banking partners.</li>
            <li>Technology/service providers: hosting, CRM, analytics, support tools (under data-processing agreements).</li>
            <li>Affiliates/partners: where a booking is fulfilled jointly or via a channel partner.</li>
            <li>Authorities: immigration, security, taxation, or law enforcement when legally required.</li>
            <li>Corporate transactions: in case of merger/acquisition, subject to continuity of protections.</li>
          </ul>
          <p className="mt-3 font-host-grotesk leading-relaxed">
            We do not sell personal data.
          </p>
        </div>

        {/* Remaining Sections */}
        {[
          ["5) International Transfers", "Your information may be processed in countries other than India (e.g., destination countries, airline/hotel locations). We take reasonable steps to ensure adequate protection consistent with this Policy and applicable law."],
          ["6) Data Retention", "We keep data for as long as needed for bookings, legal/regulatory requirements, dispute resolution, and accounting/tax (typically 7–10 years for financial records). When no longer required, we securely delete or anonymize it."],
          ["7) Cookies & Analytics", "We use cookies/pixels to run the site, remember preferences, and analyze usage. You can control cookies in your browser settings; some features may not work without them. We use analytics tools (e.g., Google Analytics). Learn how Google uses data at: www.google.com/policies/privacy/partners/. You can opt out via the Analytics opt-out add-on."],
          ["8) Your Choices & Rights", "Access/Update: request a copy or correction of your data. Delete: request deletion where not required by law or legitimate interests. Opt-out marketing: use “Unsubscribe” or email us. Consent withdrawal: where processing is based on consent (e.g., sensitive info). Contact: contact@travelyollo.com (or use the site form)."],
          ["9) Children", "Our services aren’t directed to individuals under 18. If you believe a minor provided data without guardian consent, contact us to remove it."],
          ["10) Security", "We use administrative, technical, and physical safeguards to protect information. No method is 100% secure; please contact us immediately if you suspect unauthorized use of your account or data."],
          ["11) Grievance Officer (India)", "Name: Tina Bijlani\nEmail: tina@travelyollo.com\nAddress: A 802, AAKANKSHA, OFF YARI, RD, VERSOVA, ANDHERI WEST, Vesava, Mumbai-400061, Maharashtra\nResponse time: We aim to acknowledge within 48 hours and resolve within 30 days."],
          ["12) Changes to This Policy", "We may update this Policy. The “Last updated” date indicates the current version. Material changes will be notified on our website and, where required, by email."]
        ].map(([title, content], idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-noto-serif text-[#6C3B3F] mb-4">{title}</h2>
            <p className="whitespace-pre-line font-host-grotesk leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </section>
    </section>
  )
}

export default PrivacyPolicy
