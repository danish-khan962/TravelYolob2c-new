"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Black_Tint_for_Image from "../../../../public/images/black_tint.png"
import Black_Tint_Mobile from "../../../../public/images/black_tint_mobile.png"

import greece from "../../../../public/destinations/greece.png"
import eiffel from "../../../../public/destinations/eiffel.png"
import eiffelMobile from "../../../../public/destinations/eiffel_mobile.png"
import sea from "../../../../public/destinations/sea.png"

const SwiperImages = [
  { backgroundImage: greece },
  { backgroundImage: eiffel },
  { backgroundImage: sea },
]

const SwiperImagesMobile = [
  { backgroundImage: greece },
  { backgroundImage: eiffelMobile },
  { backgroundImage: sea },
]

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState(SwiperImages.length - 1)
  const transitionDuration = 1000
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const currentImages = isMobile ? SwiperImagesMobile : SwiperImages

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(activeIndex)
      setActiveIndex((prevIndex) =>
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, currentImages.length])

  return (
    <section className="relative w-screen h-full text-white">
      <div className="relative w-full h-screen">
        {/* Background layer - shows previous image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${currentImages[previousIndex].backgroundImage.src})`,
            backgroundPosition:
              previousIndex === 1
                ? isMobile
                  ? "30% center"
                  : "center"
                : "center",
            zIndex: 0,
          }}
        />

        {/* Active slides layer */}
        {currentImages.map((item, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-no-repeat"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              backgroundImage: `url(${item.backgroundImage.src})`,
              backgroundPosition:
                index === 1
                  ? isMobile
                    ? "30% center"
                    : "center"
                  : "center",
              zIndex: index === activeIndex ? 5 : 1,
            }}
          />
        ))}

        {/* Black Tint Overlay */}
        <div className="absolute inset-0 z-10">
          <Image
            src={Black_Tint_for_Image}
            alt="overlay desktop"
            fill
            priority
            className="object-cover w-full h-full hidden sm:block"
          />
          <Image
            src={Black_Tint_Mobile}
            alt="overlay mobile"
            fill
            priority
            className="object-cover w-full h-full block sm:hidden max-[500px]:block"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-start pt-[101px] sm:pt-0 sm:justify-center items-center gap-y-[66px] px-4 h-full text-center">
          <div
            className="flex flex-col justify-center items-center text-center transition-all duration-1000 ease-in-out opacity-100 translate-y-0"
          >
            <h1 className="block md:hidden font-noto-serif font-light italic text-[34px] sm:text-[40px] md:text-[45px] lg:text-[52px]  leading-[42px] sm:leading-[45px] md:leading-[55px] lg:leading-[65px]">
              Discover the World, <br />
              One Extraordinary Place at a Time.
            </h1>
            <h1 className="hidden md:block font-noto-serif font-light italic text-[34px] sm:text-[40px] md:text-[45px] lg:text-[52px]  leading-[42px] sm:leading-[45px] md:leading-[55px] lg:leading-[65px]">
              Discover the World, One Extraordinary Place at a Time.
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
