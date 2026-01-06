import React from "react"
import Image from "next/image"
import Black_Tint_for_Image from "../../../../public/images/black_tint.png"
import Black_Tint_Mobile from "../../../../public/images/black_tint_mobile.png"
import scrollDown from "../../../../public/scroll_down.gif"
import scrollDownWhite from "../../../../public/scroll_down_white.gif"

const Hero = ({ title, image_landscape, image_portrait, duration, price }: { title: string, image_landscape: string, image_portrait: string, duration: string, price?: number }) => {
  return (
    <section className="relative w-screen h-full text-white">
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-no-repeat bg-center"
        />
        <Image
          src={image_landscape}
          alt={title}
          fill
          priority
          className="hidden md:block object-cover w-full h-full"
        />
        
        <Image
          src={image_portrait}
          alt={title}
          fill
          priority
          className="object-cover w-full h-full md:hidden"
        />

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
        <div className="relative z-10 flex flex-col justify-start pt-[150px] sm:pt-0 sm:justify-center items-center gap-y-[18px] sm:gap-y-[96px] px-4 h-full text-center">
          <h1 className="font-noto-serif font-light italic text-[34px] sm:text-[40px] md:text-[45px] lg:text-[52px] capitalize leading-[42px] sm:leading-[45px] md:leading-[55px] lg:leading-[65px]">
            {title}
          </h1>
          {/* <p className="text-base sm:text-[20px] md:text-[24px] font-medium font-host-grotesk">
            {duration}
          </p> */}
        </div>

        <Image
          src={scrollDownWhite}
          alt="scroll down"
          height={1000}
          width={1000}
          className="absolute left-1/2 transform -translate-x-1/2 bottom-48 sm:bottom-36 md:bottom-24 lg:bottom-16 z-[100] pointer-events-none h-[150px] w-auto"
        />

        {/* Days and Price block */}
        <div className="w-full flex justify-center items-center absolute bottom-0 z-50">
            <p className="font-host-grotesk bg-[#000000]/60 backdrop-blur-sm font-light italic text-[17px] sm:text-[20px] md:text-[22px] lg:text-[25px] py-3 px-6 text-white rounded-t">
              Starting from <span className="font-medium"> ${price} </span> per person*
            </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
