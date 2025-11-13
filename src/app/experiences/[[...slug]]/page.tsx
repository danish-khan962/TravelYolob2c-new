"use client"

import Hero from '@/components/sections/Experiences/Hero'
import React, { useEffect, useState } from 'react'
import WhatIsIncluded from '../../../components/sections/Experiences/WhatIsIncluded'
import Testimonials from '../../../components/sections/Experiences/Testimonials'
import BlogCard from '@/components/sections/Blog/BlogCard'
import EnquiryForm from '@/components/sections/Experiences/EnquiryForm'
import vector from "../../../../public/images/img_vector.svg"
import Image from 'next/image'
import ExperienceWrapper from '@/components/sections/Experiences/ExperienceWrapper'

import { useParams } from "next/navigation";


type BlogPost = {
  image: string
  author: string
  date: string
  title: string
  description: string
}


const page = () => {
  const [blogData, setBlogData] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch("/json/blogData.json")
      .then((res) => res.json())
      .then((data) => setBlogData(data.slice(0, 3)))
  }, [])


  // Content for different itinieary pages
  const params = useParams();

  // If there are multiple segments (e.g., /experiences/romantic-escapes/bali-package),
  // let the nested [slug] route handle it
  if (Array.isArray(params?.slug) && params.slug.length > 1) {
    return null;
  }

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const getContent = (slug: string | undefined) => {
    switch (slug) {
      case "romantic-escapes":
        return {
          overview:
            "Whispers of candlelight dinners, secret beaches, and sunsets shared in perfect silence. Crafted for two, made to remember.",
          itinerary:
            "Curated journeys designed to celebrate love and connection. From sunrise walks and vineyard tours to secluded hideaways and starlit dinners, every moment is crafted to inspire closeness and lasting memories."
        };
      case "family-getaways":
        return {
          overview:
            "Where laughter echoes louder, adventures feel closer, and every journey becomes a family story worth retelling.",
          itinerary:
            "Curated journeys that bring laughter and togetherness. From adventure trails and wildlife encounters to storytelling evenings and family-friendly activities, every moment is crafted to inspire connection and shared memories."
        };
      case "cultural-soujourns":
        return {
          overview:
            "Step into living history, taste heritage in every meal, and lose yourself in the rhythm of a world rich in stories.",
          itinerary:
            "Curated journeys that reveal the soul of a destination. From guided tours and traditional cooking classes to local festivals and hidden gems, every moment is crafted to inspire curiosity, connection, and lasting memories."
        };
      case "scenic-escapes":
        return {
          overview:
            "From misty peaks to endless coastlines, find beauty in every turn and peace in every horizon.",
          itinerary:
            "Curated journeys that celebrate nature’s grandeur. From misty peaks and coastal walks to tranquil lakes and hidden scenic spots, every moment is crafted to inspire wonder, reflection, and lasting memories."
        };
      case "wildlife-encounters":
        return {
          overview:
            "Wake to the call of the wild and witness nature unfold in all its untamed beauty, curated with care and comfort.",
          itinerary:
            "Curated journeys into the wild. From morning safaris and animal encounters to peaceful lodge stays, every moment is crafted to inspire awe, connection with nature, and unforgettable memories."
        };
      default:
        return {
          overview:
            "Think private safaris, glacier hikes, and hot air balloons—designed for those who crave excitement with comfort.",
          itinerary:
            "Curated journeys designed to immerse you in culture, history, and adventure. From sunrise hikes and heritage walks to culinary trails and hidden gems, every moment is crafted to inspire, connect, and create memories that last a lifetime."
        };
    }
  };

  const { overview, itinerary } = getContent(slug);

  // Helper function to format slug into readable title
  const getExperienceTitle = (slug: string | undefined) => {
    if (!slug) return "Adventure";

    const titleMap: Record<string, string> = {
      "romantic-escapes": "Romantic Escapes",
      "family-getaways": "Family Getaways",
      "cultural-soujourns": "Cultural Soujourns",
      "scenic-escapes": "Scenic Escapes",
      "wildlife-encounters": "Wildlife Encounters"
    };

    return titleMap[slug] || "Adventure";
  };

  const experienceTitle = getExperienceTitle(slug);

  return (
    <div className='overflow-x-hidden'>
      <Hero />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-[17px]">
        <p className='font-host-grotesk text-base sm:text-[18px] md:text-[22px] lg:text-[24px]'> Experiences{"  >>  "} <span className='text-[#6C3B3F]'> {experienceTitle} </span> </p>

        <div className='flex flex-col items-start mt-[55px] sm:mt-[70px]'>
          <h1 className='text-[32px] sm:text-[40px] text-[#000000] font-noto-serif font-light italic'>Package Overview</h1>
          <p className='max-w-[321px] sm:max-w-[830px] w-full font-host-grotesk font-light text-base sm:text-[20px] mt-[15px] sm:mt-[24px] sm:leading-snug text-[#312E29]'>
            {overview}
          </p>
        </div>

        <div className='flex flex-col items-start mt-[55px] sm:mt-[60px]'>
          <h1 className='text-[32px] sm:text-[40px] font-noto-serif font-light italic'>Experiences Itinerary</h1>
          <p className='max-w-[351px] sm:max-w-[810px] w-full font-host-grotesk font-light text-base sm:text-[20px] mt-[17px] sm:mt-[12px] sm:leading-snug text-[#312E29]'>
            {itinerary}
          </p>
        </div>

        <div className='w-full sm:w-screen mt-[56px] sm:mt-[100px]'>
          <ExperienceWrapper />
        </div>
      </div>


      <div className='w-full bg-[#F9F9F9] mt-[73px] sm:mt-[120px]'>
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-[17px]">
          <WhatIsIncluded />
        </div>

        {/* Testimonials */}
        <div className='pt-[120px] sm:pt-[150px]'>
          <Testimonials packageId=""  />
        </div>

        {/* Blogs */}
        {/* <div className='w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-[75px] sm:mt-[120px] pb-[86px] sm:pb-[120px]'>
          <h2
            className="hidden md:block text-[32px] sm:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] font-noto-serif"
            style={{ color: '#000000' }}
          >
            Blogs
          </h2>
          <div className='w-full flex justify-center items-center mt-[65px] sm:mt-[79px]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5'>
              {blogData.map((post, index) => (
                <BlogCard
                  key={index}
                  image={post.image}
                  author={post.author}
                  date={post.date}
                  title={post.title}
                  description={post.description}
                />
              ))}
            </div>
          </div>
        </div> */}


      </div>


      {/* Enquiry or booking form section */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-[50px] md:mt-[60px]">
        <h2
          className="text-[32px] sm:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] font-noto-serif"
          style={{ color: '#000000' }}
        >
          Enquiry or Booking Form
        </h2>

        <div className='relative w-full flex flex-col justify-start sm:justify-center items-start sm:items-center'>
          <div className="relative max-w-[789px] w-full text-start sm:text-center z-10">
            <p className=' text-[#6C3B3F] font-noto-serif font-light italic text-base sm:text-[18px] md:text-[20px] lg:text-[24px] text-start sm:text-center leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[34px] mt-[61px] sm:mt-[100px] max-w-[365px] sm:max-w-[1000px] w-full z-10'>
              Have a question, an idea, or just want to talk through what&apos;s possible? <br />
              We&apos;re ready when you are — no pressure, just a conversation.
            </p>
          </div>

          <Image
            src={vector}
            alt="vector background"
            height={1000}
            width={1000}
            className="absolute right-[20%] top-6 sm:top-10 sm:right-[30%] w-[161px] h-[150px] md:h-[192px]  md:w-[191px] opacity-100"
          />
        </div>

        <div className='mt-[67px] sm:mt-[60px] mb-[75px] sm:mb-[100px]'>
          <EnquiryForm />
        </div>
      </div>
    </div>
  )
}

export default page
