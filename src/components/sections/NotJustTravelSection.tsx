'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const travelItems = [
  {
    id: 1,
    text: (
      <>
        Your Personal <br />
        Travel Concierge
      </>
    ),
    image: '/images/img_1_shutterstock_1995820526.png',
  },
  {
    id: 2,
    text: (
      <>
        Handpicked Experiences <br />
        Across the World
      </>
    ),
    image: '/images/img_2_shutterstock_1995820526.png',
  },
  {
    id: 3,
    text: (
      <>
        Luxury in <br />
        the Details
      </>
    ),
    image: '/images/img_3_shutterstock_1995820526.png',
  },
  {
    id: 4,
    text: (
      <>
        Trusted by Travelers <br />
        Who&apos;ve Seen the World
      </>
    ),
    image: '/images/img_4_shutterstock_1995820526.png',
  },
];

const NotJustTravelSection: React.FC = () => {
  return (
    <section className="w-full h-auto sm:h-[1000px] md:h-[630px] lg:h-[700px] bg-global-10 py-[48px] sm:py-[68px] lg:py-[96px] mt-[-1px]">
      <div className="w-full  max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] text-global-1 mb-[54px] sm:mb-[76px] lg:mb-[108px] font-noto-serif">
          <span className="uppercase">N</span>
          <span className="lowercase">ot Just Travel. </span>
          <span className="uppercase">A </span>
          <span className="lowercase">Journey Curated for You.</span>
        </h2>

        {/* Mobile View: Swiper with centered text inside image */}
        <div className="block sm:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.1} className="w-full" loop={true}>
            {travelItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative flex items-center justify-center text-center w-full h-[371px] mb-6">
                  <Image
                    src={item.image}
                    alt="Travel Feature"
                    fill
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[146px] rounded-b-[20px]"
                  />
                  <div className="relative z-10 px-4">
                    <p className="text-white text-[24px] font-light italic leading-[30px] font-noto-serif">
                      {item.text}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-[146px] rounded-b-[20px]" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop View: Hover reveal */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-8 justify-evenly items-center -mt-[50px]">
          {travelItems.map((item) => (
            <div
              key={item.id}
              className="relative group max-w-[292px] w-full h-[370px] flex items-center justify-center text-center cursor-pointer"
            >
              {/* Background Image (hidden initially) */}
              <Image
                src={item.image}
                alt="Travel Feature"
                fill
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-[146px] rounded-b-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
              />

              {/* Overlay for dark effect */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-[146px] rounded-b-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" /> */}

              {/* Text (centered, moves down on hover) */}
              <p className="relative z-10 text-[20px] lg:text-[24px] font-light italic leading-[26px] lg:leading-[31px] text-black font-noto-serif transition-all duration-700 ease-in-out group-hover:translate-y-[235px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NotJustTravelSection;
