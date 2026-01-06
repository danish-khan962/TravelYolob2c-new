'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DestinationCardProps {
  title: React.ReactNode;
  duration: string;
  image: string;
  id: string;
  slug: string;
  price?: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ title, duration, image, slug, id, price }) => {
  return (
    <div className="relative max-w-[450px] w-full h-[510px] sm:h-[550px] md:h-[580px] lg:h-[610px] rounded-xl overflow-hidden shadow-lg cursor-pointer">
      <Link href={`/destinations/${slug}`}>
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-black/100 via-black/30 to-transparent z-10" />

        {/* Gray block background behind text */}
        <div className="absolute bottom-0 left-0 w-full bg-[#F5F5F5] rounded-b-xl px-5 py-[9px] flex justify-between items-center z-20 max-h-[72px] h-full">
          <h3 className="text-[16px] sm:text-[20px] font-medium leading-snug font-host-grotesk text-black line-clamp-2">
            {title}
          </h3>
          <div className='flex flex-col justify-start items-start gap-y-1'>
            <p className="text-[14px] font-host-grotesk text-black opacity-80 whitespace-nowrap ml-2">
              {duration}
            </p>
            <p className="text-[14px] font-host-grotesk text-black opacity-80 whitespace-nowrap ml-2">
              ${price}*
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DestinationCard;
