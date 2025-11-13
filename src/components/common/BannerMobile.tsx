'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'

const BannerMobile = () => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className={`md:hidden flex flex-row justify-center items-center w-screen transition-all duration-300 ${
        isSticky
          ? 'fixed bottom-0 left-0 right-0 z-[999999]'
          : 'fixed bottom-0 left-0 right-0 z-[999999]'
      }`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="w-[50%] h-[56px] font-host-grotesk flex justify-center items-start gap-[8px] bg-white text-black shadow-md py-2">
        <FaPhoneAlt />
        <div className="flex flex-col justify-start items-start">
          <Link href="tel:5619414991" className="hover:cursor-pointer hover:underline">
            +1 561-941-4991
          </Link>
          <p className="font-host-grotesk text-sm">
            until 6 pm
          </p>
        </div>
      </div>

      <div className="w-[50%] h-[56px] flex justify-center items-center font-host-grotesk text-base font-normal bg-[#171C28] text-white cursor-pointer">
        Request a Quote
      </div>
    </section>
  )
}

export default BannerMobile
