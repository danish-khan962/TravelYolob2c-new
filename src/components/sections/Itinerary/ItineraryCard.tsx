import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type ItineraryCardProps = {
  image: string
  title: string
  description: string
  id: string;
  slug?: string;
  parentSlug?: string;
  type?: 'destination' | 'experience';
}

const ItineraryCard = ({ image, title, description, id, slug, parentSlug, type = 'destination' }: ItineraryCardProps) => {
  // Build the href based on type
  const href = type === 'experience' && parentSlug && slug
    ? `/experiences/package?slug=${slug}&category=${parentSlug}`
    : `/destinations/${slug || id}`;

  return (
    <Link href={href}>
      <div className='max-w-[503px] w-full flex flex-col'>
        <div className="relative w-full max-w-[503px] aspect-[4/4] rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 503px"
            priority={false}
          />
        </div>


        <p className='mt-[18px] sm:mt-[25px] font-host-grotesk text-[20px] font-medium'>{title}</p>

        <p className='max-w-[294px] sm:max-w-[415px] w-full mt-[6px] sm:mt-[9px] text-[#312E29] font-host-grotesk text-base'>
          {description}
        </p>
      </div>
    </Link>
  )
}

export default ItineraryCard
