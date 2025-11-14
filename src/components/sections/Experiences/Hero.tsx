"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"

import Black_Tint_for_Image from "../../../../public/images/black_tint.png"
import Black_Tint_Mobile from "../../../../public/images/black_tint_mobile.png"

// Romantic Escapes images
import romantic_escapes_desktop from "../../../../public/experiences/romantic_escapes_desktop.png"
import romantic_escapes_mobile from "../../../../public/experiences/romantic_escapes_mobile.png"

// Family getaways images
import family_getaways_desktop from "../../../../public/experiences/family_getaways_desktop.png"
import family_getaways_mobile from "../../../../public/experiences/family_getaways_mobile.png"

// Cultural Sojourns images
import cultural_soujourns_desktop from "../../../../public/experiences/cultural_soujourn_desktop.png"
import cultural_soujourns_mobile from "../../../../public/experiences/cultural_soujourn_mobile.png"

// Scenic Escapes images
import scenic_escapes_desktop from "../../../../public/experiences/scenic_escapes_desktop.png"
import scenic_escapes_mobile from "../../../../public/experiences/scenic_escapes_mobile.png"

// Wildlife Encounters images
import wildlife_encounters_desktop from "../../../../public/experiences/wildlife_encounters_desktop.png"
import wildlife_encounters_mobile from "../../../../public/experiences/wildlife_encounters_mobile.png"

const imagesBySlug = {
  "romantic-escapes": {
    desktop: [romantic_escapes_desktop],
    mobile: [romantic_escapes_mobile],
  },
  "family-getaways": {
    desktop: [family_getaways_desktop],
    mobile: [family_getaways_mobile],
  },
  "cultural-soujourns": {
    desktop: [cultural_soujourns_desktop],
    mobile: [cultural_soujourns_mobile],
  },
  "scenic-escapes": {
    desktop: [scenic_escapes_desktop],
    mobile: [scenic_escapes_mobile],
  },
  "wildlife-encounters": {
    desktop: [wildlife_encounters_desktop],
    mobile: [wildlife_encounters_mobile],
  },
}

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // 🔹 Get slug from the URL
  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug

  // 🔹 Banner text based on slug
  const getBannerText = (slug: string | undefined) => {
    switch (slug) {
      case "romantic-escapes":
        return "Love. Explore. Cherish every moment."
      case "family-getaways":
        return "Together, where memories begin."
      case "cultural-soujourns":
        return "Discover stories that shaped the world."
      case "scenic-escapes":
        return "Find peace where beauty meets horizon."
      case "wildlife-encounters":
        return "Embrace the wild, live the wonder."
      default:
        return "Indulge your senses, your stories begin here."
    }
  }

  const bannerText = getBannerText(slug)

  // 🔹 Detect screen size for mobile adjustment
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // 🔹 Select images based on slug (fallback to empty)
  const slugImages = imagesBySlug[slug as keyof typeof imagesBySlug] || {
    desktop: [],
    mobile: [],
  }

  const SwiperImages = slugImages.desktop.map((img) => ({ backgroundImage: img }))
  const SwiperImagesMobile = slugImages.mobile.map((img) => ({ backgroundImage: img }))

  const currentImages = isMobile ? SwiperImagesMobile : SwiperImages

  // 🔹 Auto-slide effect
  useEffect(() => {
    if (!currentImages.length) return
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5200)
    return () => clearInterval(interval)
  }, [currentImages])

  return (
    <section className="relative w-screen h-full text-white">
      <div className="relative w-full h-screen">
        {/* Fading backgrounds on top */}
        {currentImages.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-no-repeat bg-center"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              backgroundImage: `url(${item.backgroundImage.src})`,
              zIndex: index === activeIndex ? 4 : 0,
              backgroundPosition:
                index === 2
                  ? isMobile
                    ? "30% center"
                    : "center"
                  : "center",
            }}
          />
        ))}

        {/* Black Tint Overlay */}
        <div className="absolute inset-0 z-10">
          {/* Desktop (>=sm = 640px) */}
          <Image
            src={Black_Tint_for_Image}
            alt="overlay desktop"
            fill
            priority
            className="object-cover w-full h-full hidden sm:block"
          />
          {/* Mobile */}
          <Image
            src={Black_Tint_Mobile}
            alt="overlay mobile"
            fill
            priority
            className="object-cover w-full h-full block sm:hidden max-[500px]:block"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-start pt-[240px] sm:pt-0 sm:justify-center items-center gap-y-[66px] px-4 h-full text-center">
          <h1 className="font-noto-serif font-light italic text-[34px] sm:text-[40px] md:text-[45px] lg:text-[52px] capitalize leading-[42px] sm:leading-[45px] md:leading-[55px] lg:leading-[65px] transition-opacity duration-700 ease-in-out">
            {bannerText}
          </h1>
        </div>
      </div>
    </section>
  )
}

export default Hero
