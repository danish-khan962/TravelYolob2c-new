'use client'

import React, { useState } from 'react'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

const AccordionItem = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const FAQ = [
    { question: "What is the best way to reach you, email, phone, or chat?", answer: "You can reach us via email, phone, or live chat. Each method is monitored to ensure your questions are answered promptly." },
    { question: "I submitted a request but have not heard back, what should I do?", answer: "Please check your spam or junk folder first. If you still have not received a response, contact us directly via phone or live chat." },
    { question: "Who should I contact for booking changes or cancellations?", answer: "All booking-related questions can be sent to our reservations team through the Contact Us form or directly via the listed email." },
    { question: "Can I submit special requests through the Contact Us page?", answer: "Absolutely. Let us know your preferences, dietary needs, accessibility requirements, or other requests, and we will do our best to assist." },
    { question: "How do I escalate an urgent issue during my trip?", answer: "Our 24/7 support number is the fastest way to get immediate assistance if something comes up during travel." },
    { question: "What information should I include when contacting you?", answer: "Please include your booking ID, if applicable, full name, and a clear description of your question or concern. This helps us respond faster." },
    { question: "Do you offer support for group or corporate inquiries?", answer: "Yes. Use our Contact Us page to specify group bookings, corporate trips, or special event needs, and we will connect you with a dedicated team member." },
    { question: "Can I provide feedback or report an issue with the website or booking process?", answer: "Definitely. We welcome feedback to improve our service. Use the Contact Us form to let us know about bugs, suggestions, or concerns." },
  ]

  const toggleAccordion = (index: any) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <div className="max-w-[1032px] w-full mx-auto flex flex-col gap-4 pb-[100px] sm:pb-[150px]">
      {FAQ.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          {/* Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <p className="text-[#1D1D1F] text-[16px] md:text-[20px] font-medium font-host-grotesk">
              {item.question}
            </p>
            {openIndex === index ? (
              <FiChevronUp className="text-[#6C3B3F] text-[25px] md:text-[30px]" />
            ) : (
              <FiChevronDown className="text-[#6C3B3F] text-[25px] md:text-[30px]" />
            )}
          </div>

          {/* Content */}
          {openIndex === index && (
            <div className="mt-6">
              <p className="text-[#3A3A3A] text-[14px] md:text-[18px] font-normal font-host-grotesk">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AccordionItem
