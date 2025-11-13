import React from "react"
import Image from "next/image"
import Black_Tint_for_Image from "../../../../public/images/black_tint.png"
import Black_Tint_Mobile from "../../../../public/images/black_tint_mobile.png"

const Hero = ({ title, image, duration }: { title: string, image: string, duration: string }) => {
  return (
    <section className="relative w-screen h-full text-white">
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-no-repeat bg-center itineraryHero-bg"
        />
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover w-full h-full"
        />

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
          {/* Mobile (<500px → Tailwind doesn’t have 500px by default, so we use `max-[500px]:block` */}
          <Image
            src={Black_Tint_Mobile}
            alt="overlay mobile"
            fill
            priority
            className="object-cover w-full h-full block sm:hidden max-[500px]:block"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-start pt-[150px] sm:pt-0 sm:justify-center items-center gap-y-[18px] sm:gap-y-[96px] px-4 h-full text-center">
          <h1 className="font-noto-serif font-light italic text-[34px] sm:text-[40px] md:text-[45px] lg:text-[52px] capitalize leading-[42px] sm:leading-[45px] md:leading-[55px] lg:leading-[65px]">
            {title}
          </h1>
          <p className="text-base sm:text-[20px] md:text-[24px] font-medium font-host-grotesk">
            {duration}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
