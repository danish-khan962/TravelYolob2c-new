"use client";

import React from "react";
import Image from "next/image";
import blogBannerDesktop from "../../../../public/blog/blogPost/blogPost_1.png";
import blogBannerMobile from "../../../../public/blog/blogPost/blogPostMobile_1.png";
import scrollDownWhite from "../../../../public/scroll_down_white.gif";

interface BannerProps {
  featured_image?: string;
}

const Banner: React.FC<BannerProps> = ({ featured_image }) => {
  return (
    <div className="relative w-full h-[80vh]">

      <Image
        src={featured_image || blogBannerDesktop}
        alt="Blog banner desktop"
        fill
        priority
        className="hidden xxs:block object-cover object-center"
      />

      <Image
        src={featured_image || blogBannerMobile}
        alt="Blog banner mobile"
        fill
        priority
        className="block xxs:hidden object-cover object-center"
      />

      <Image
        src={scrollDownWhite}
        alt="scroll down"
        height={1000}
        width={1000}
        className="absolute left-1/2 transform -translate-x-1/2 bottom-16 z-[100] pointer-events-none h-[150px] w-auto"
      />

    </div>
  );
};

export default Banner;
