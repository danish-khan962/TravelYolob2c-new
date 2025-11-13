'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PackageCardProps {
    title: React.ReactNode;
    duration: string;
    image: string;
    slug: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ title, duration, image, slug }) => {
    return (
            <div className="relative max-w-[450px] w-full h-[510px] sm:h-[550px] md:h-[580px] lg:h-[610px] rounded-xl overflow-hidden shadow-lg">

                <Link href={`/destinations/${slug}`}>
                <Image
                    src={image}
                    alt="image"
                    fill
                    className="object-cover w-full h-full"
                /></Link>


                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-[72px] bg-[#F5F5F5] z-10" />

                <div className="absolute bottom-2 left-5 right-5 z-20 text-black flex flex-row justify-between items-end">
                    <h3 className="text-[16px] sm:text-[20px] font-medium leading-snug font-host-grotesk line-clamp-2">{title}</h3>
                    <p className="text-[14px] opacity-80 whitespace-nowrap font-host-grotesk">{`(${duration})`}</p>
                </div>
            </div>
    );
};

export default PackageCard;
