"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Black_Tint_for_Image from "../../../../public/images/black_tint.png"
import Black_Tint_Mobile from "../../../../public/images/black_tint_mobile.png"
import scrollDown from "../../../../public/scroll_down.gif"
import scrollDownWhite from "../../../../public/scroll_down_white.gif"

// Desktop images
import image1 from "../../../../public/blog/blogHero_1.png"
import image2 from "../../../../public/blog/blogHero_2.png"
import image3 from "../../../../public/blog/blogHero_3.png"
import image4 from "../../../../public/blog/blogHero_4.png"

// Mobile images
import image1_mobile from "../../../../public/blog/blogHero_1_mobile.png"
import image2_mobile from "../../../../public/blog/blogHero_2_mobile.png"
import image3_mobile from "../../../../public/blog/blogHero_3_mobile.png"
import image4_mobile from "../../../../public/blog/blogHero_4_mobile.png"

const SwiperImages = [
  { backgroundImage: image1 },
  { backgroundImage: image2 },
  { backgroundImage: image3 },
  { backgroundImage: image4 },
]

const SwiperImagesMobile = [
  { backgroundImage: image1_mobile },
  { backgroundImage: image2_mobile },
  { backgroundImage: image3_mobile },
  { backgroundImage: image4_mobile },
]


const Hero = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === SwiperImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // detect screen size for mobile adjustment
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Select image set based on screen size
  const currentImages = isMobile ? SwiperImagesMobile : SwiperImages

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
                index === 3
                  ? isMobile
                    ? "35% center"
                    : "center"
                  : "center",
            }}
          />
        ))}

        {/* Black Tint Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src={Black_Tint_for_Image}
            alt="overlay"
            fill
            priority
            className="object-cover w-full h-full object-right"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-start pt-[150px] sm:pt-0 sm:justify-center items-center gap-y-[66px] px-4 h-full text-center">
          <h1 className="font-noto-serif font-light italic text-[34px] sm:text-[40px] md:text-[45px] lg:text-[52px] capitalize leading-[42px] sm:leading-[45px] md:leading-[55px] lg:leading-[65px]">
            Where will your heart take you next?
          </h1>
        </div>

        <Image
          src={scrollDownWhite}
          alt="scroll down"
          height={1000}
          width={1000}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-48 sm:bottom-36 md:bottom-24 lg:bottom-16 z-[100] pointer-events-none h-[150px] w-auto"
        />
      </div>
    </section>
  )
}

export default Hero
