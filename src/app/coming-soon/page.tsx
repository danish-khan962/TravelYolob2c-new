import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import comingSoon_PNG from "../../../public/coming-soon/coming_soon.png"

const Page = () => {
    return (
        <section className='w-full  max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[50px] pb-[50px] sm:pt-[60px] sm:pb-[65px] md:pt-[80px] md:pb-[75px] lg:pt-[100px] lg:pb-[80px]'>
            <div className='relative w-full flex flex-col md:flex-row justify-center items-center gap-[65px]'>
                <div className='max-w-[550px] w-full'>
                    <h1 className='font-noto-serif italic font-normal text-[#6C3B3F] text-[28px] sm:text-[30px] md:text-[32px] lg:text-[36px]'>
                        We’re building something beautiful.
                        Hold your breath… it’s coming!
                    </h1>

                    <p className='font-host-grotesk font-light text-[#000000] leading-relaxed text-base sm:text-[16.5px] md:text-[17px] lg:text-[18px] mt-[25px] md:mt-[35px]' style={{letterSpacing: "1%"}}>
                        If you’d like to speak with of our travel experts, <br />
                        <p className='text-[#6C3B3F] group'>please call <Link href={"tel:15619414991"} className='group-hover:underline transition-all ease-in-out duration-200'>+1 561 941 4991</Link>.</p>
                    </p>
                </div>

                <div>
                    <Image
                    src={comingSoon_PNG}
                    alt='coming-soon'
                    height={1000}
                    width={1000}
                    className='max-w-[800px] w-full h-auto'
                    />
                </div>
            </div>
        </section>
    )
}

export default Page