"use client"

import React, { useState } from 'react'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";


const includedOptions = [
    "A fully customized itinerary based on your interests and schedule",
    "24/7 in-destination support from our local office",
    "All accommodation stays, transfers and scheduled activites are covered, unless otherwise listed in the itinerary",
    "A private driver for tours and transfers (in some countries our local private guides also act as your driver - your Destination Expert will discuss with you if applicable)",
    "Local private guides or shared tours that take you through your itinerary highlights and experiences, your final itinerary will confirm the type of tour",
    "A greeting at the airport or at your accomodation from one of our representatives - your expert will confirm your meet and greet location with you",
    "Breakfast each morning at your hotel, plus any meals indicated in the itinerary",
    "One suitcase and one carry-on per person for trip transfers",
]

const notIncludedOptions = [
    "Your international airfare - please do let your expert know if you'd like to receive pricing from our Air Team",
    "Travel insurances, which we offer and can be purchased after you've booked your tour",
    "Visas (unless noted)",
    "Tips for services and experiences",
    "Lunches, dinners and drinks (alcoholic and non-alcoholic), unless specified in the itinerary",
    "Excess baggage charges, and where applicable, baggage not included in your fare",
    "Personal charges such as laundry, phone calls, SIM cards or room service",
    "Early check-in or late check-out from hotels (unless otherwise specified)",
    "Additional sightseeing, activites and experiences outside of your itinerary",
    "Optional enchancements like room or flight upgrades, or local camera or video fees",
    "Passport fees, immunization costs, and local departure taxes (when applicable)"
]


const WhatIsIncluded = () => {
    const [isIncludedOpen, setIsIncludedOpen] = useState(false);
    const [isNotIncludedOpen, setIsNotIncludedOpen] = useState(false);

    const toggleIncluded = () => {
        setIsIncludedOpen(!isIncludedOpen);
    }

    const toggleNotIncluded = () => {
        setIsNotIncludedOpen(!isNotIncludedOpen);
    }

    return (
        <div className='pt-[116px] sm:pt-[105px]'>

            {/* What is included */}
            <div>
                <div className='flex justify-between place-items-baseline cursor-pointer' onClick={toggleIncluded}>
                    <p className='font-noto-serif font-light italic text-[32px] sm:text-[40px]'>What is included</p>
                    <span>
                        {isIncludedOpen ? (
                            <GoTriangleUp className='text-[#6C3B3F] text-2xl' />
                        ) : (
                            <GoTriangleDown className='text-[#6C3B3F] text-2xl' />
                        )}
                    </span>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out mt-[12px] ${isIncludedOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <ul className='flex flex-col pb-[15px] gap-2'>
                        {includedOptions.map((item: string, idx: number) => (
                            <li
                                key={idx}
                                className='flex items-start gap-3 font-host-grotesk text-base sm:text-[18px] md:text-[20px] leading-snug sm:leading-[22px] md:leading-[24px]'
                            >
                                <RiCheckboxBlankCircleFill className='flex-shrink-0 text-[#6C3B3F] text-[8px] sm:text-[9px] md:text-[10px] mt-[6px]' />
                                <span className='text-[#312E29]'>{item}</span>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className='w-full h-[1.5px] bg-[#6C3B3F]'></div>
            </div>

            {/* What is not included */}
            <div className='mt-[50px] sm:mt-[60px]'>
                <div className='flex justify-between place-items-baseline cursor-pointer' onClick={toggleNotIncluded}>
                    <p className='font-noto-serif font-light italic text-[32px] sm:text-[40px]'>What is not included</p>
                    <span>
                        {isNotIncludedOpen ? (
                            <GoTriangleUp className='text-[#6C3B3F] text-2xl' />
                        ) : (
                            <GoTriangleDown className='text-[#6C3B3F] text-2xl' />
                        )}
                    </span>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out mt-[12px] ${isNotIncludedOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <ul className='flex flex-col pb-[15px] gap-2'>
                        {notIncludedOptions.map((item: string, idx: number) => (
                            <li
                                key={idx}
                                className='flex items-start gap-3 font-host-grotesk text-base sm:text-[18px] md:text-[20px] leading-snug sm:leading-[22px] md:leading-[24px]'
                            >
                                <RiCheckboxBlankCircleFill className='flex-shrink-0 text-[#6C3B3F] text-[8px] sm:text-[9px] md:text-[10px] mt-[6px]' />
                                <span className='text-[#312E29]'>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='w-full h-[1.5px] bg-[#6C3B3F]'></div>
            </div>
        </div>
    )
}

export default WhatIsIncluded;
