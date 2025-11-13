import React from 'react'
import Hero from '@/components/sections/Contact/Hero'
import Image from 'next/image'
import vector from "../../../public/images/img_vector.svg"
import Contact from '@/components/sections/Contact/Contact'
import AccordionItem from '@/components/sections/Contact/AccordionItem'
import Link from 'next/link'
import AstaLogo from "../../../public/contact/asta-logo.png"

const page = () => {
  return (
    <div>
      <Hero />

      <div className='relative px-4 md:px-0'>
        <div className="relative w-full flex justify-center items-center my-[5rem] md:my-32">
          <div className="relative max-w-[789px] w-full text-start md:text-center z-10">
            <p className="font-noto-serif text-[#6C3B3F] text-[16px] w-[302px] md:w-full md:text-[24px] font-light italic">
              Have a question, an idea, or just want to talk through what&apos;s possible?<br />
              We&apos;re ready when you are — no pressure, just a conversation.
            </p>
          </div>

          <Image
            src={vector}
            alt="vector background"
            className="absolute right-[30%] w-[161px] h-[192px]  md:w-[191px] md:h-[228px] opacity-100"
          />
        </div>

        {/* Contact form */}
        <Contact />
      </div>

      {/* FAQ */}
      <div className='w-full bg-[#F9F9F9] flex flex-col justify-center items-center mt-10'>
        {/* <div className='mt-12 mb-16 md:mt-40 md:mb-20 flex flex-col justify-center items-center'>
          <h1 className='font-noto-serif font-light italic text-[18px] md:text-[40px] text-[#6C3B3F] text-center'>Prefer to speak with someone?</h1>
          <p className='text-[16px] md:text-[18px] text-[#312E29] text-center mt-5 font-host-grotesk'>
            Call us at 
            <Link href={"tel:561-941-4991"} className='ml-2 hover:underline transition-all ease-out duration-200'>
              +1 561-941-4991
            </Link>
          </p>
          <p className='text-center mt-2'><Link href={"mailto:contact@travelyollo.com"} className='text-[16px] md:text-[18px] text-[#312E29] text-center font-host-grotesk hover:underline'> contact@travelyollo.com </Link></p>
          <p className='text-center mt-2 text-[16px] md:text-base text-[#312E29] font-host-grotesk'>211 HANA ROAD, EDISON, NJ 08817, USA  </p>
          <p className='text-[16px] md:text-[18px] text-[#312E29] text-center mt-2 font-host-grotesk'>(Mon–Fri, 9am–6pm EST)</p>

          <Image
          src={AstaLogo}
          alt='asta logo'
          height={1000}
          width={1000}
          className='h-fit w-fit mt-8'
          />
        </div> */}

        <hr className='bg-[#E4E4E4] w-full' />
      </div>

      <div className='w-full bg-[#F9F9F9] px-4 md:px-0'>
        <div className=' pt-20 pb-10'>
          <h1 className='font-noto-serif font-light italic text-[32px]  md:text-[40px] text-[#6C3B3F] text-start md:text-center'>FAQs</h1>
          <p className='text-[16px] md:text-[18px] text-[#312E29] mt-5 capitalize text-start md:text-center'>You Might Be Wondering....</p>
        </div>

        <AccordionItem />
      </div>
    </div>
  )
}

export default page
