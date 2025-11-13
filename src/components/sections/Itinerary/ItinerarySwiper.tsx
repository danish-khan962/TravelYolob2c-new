'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import ItineraryCard from './ItineraryCard'

interface ItinerarySwiperProps {
  packageId: string
  type?: 'destination' | 'experience'
  parentSlug?: string
}

type Attraction = {
  id: string
  image: string
  name: string
  description: string
  slug?: string
}

const ItinerarySwiper: React.FC<ItinerarySwiperProps> = ({ packageId, type = 'destination', parentSlug }) => {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const res = await fetch('/api/package-attractions')
        if (!res.ok) throw new Error('Failed to fetch attractions')
        const data = await res.json()
        console.log('Fetched attractions:', data)

        const filtered = Array.isArray(data?.results)
          ? data.results.filter(
            (item: any) => item.package === packageId && item.attraction
          )
          : []

        console.log('Filtered attractions:', filtered)

        const formatted =
          filtered.map((item: any) => ({
            id: item.attraction.id,
            name: item.attraction.name || 'Unnamed Attraction',
            description: item.attraction.description || 'No description available',
            image: item.attraction.image || '/images/default-attraction.jpg',
            slug: item.attraction.slug || item.attraction.id,
          })) || []

        setAttractions(formatted)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAttractions()
  }, [packageId])


  if (loading) {
    return (
      <div className="relative md:w-screen md:-ml-6 md:pl-6 lg:-ml-16 lg:pl-16 mt-6">
        <div className="flex gap-6 overflow-x-auto animate-pulse">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] lg:min-w-[430px] h-[500px] bg-[#F8F6F2] rounded-xl shadow-sm relative"
            >
              <div className="w-full h-[65%] bg-[#E4D2A4]/40 rounded-t-xl" />
              <div className="absolute bottom-0 left-0 w-full p-5 bg-[#FFFFFF]/70 backdrop-blur-sm rounded-b-xl">
                <div className="h-[20px] w-[80%] bg-[#E4D2A4]/60 rounded mb-3" />
                <div className="h-[16px] w-[90%] bg-[#E4D2A4]/40 rounded mb-2" />
                <div className="h-[16px] w-[60%] bg-[#E4D2A4]/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>
  }

  // Handle empty list
  if (attractions.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 font-host-grotesk text-lg mt-10">
        No top attractions found for this package.
      </div>
    )
  }

  return (
    <div className="relative md:w-screen md:-ml-6 md:pl-6 lg:-ml-16 lg:pl-16">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.1}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3.5 },
        }}
      >
        {attractions.map((item) => (
          <SwiperSlide key={item.id}>
            <ItineraryCard
              id={item.id}
              image={item.image}
              title={item.name}
              description={item.description}
              slug={item.slug}
              parentSlug={parentSlug}
              type={type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ItinerarySwiper
