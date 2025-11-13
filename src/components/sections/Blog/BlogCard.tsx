
import React from 'react'
import Image, {StaticImageData} from 'next/image'
import Link from 'next/link'

type BlogCardProps = {
  image: StaticImageData | string
  author: string
  date: string
  title: string
  description: string
  id: string
  slug: string
}

const BlogCard: React.FC<BlogCardProps> = ({ image, author, date, title, description, slug }) => {
  return (
    <div className='max-w-[640px] w-full border-2 rounded-lg shadow-md'>
      <Link href={`/blog/${slug}`}>
        <Image
        src={image}
        alt='blog_card_img'
        height={1000}
        width={1000}
        className='h-[250px] md:h-[335px] object-cover w-full rounded-t-md'
      />
      </Link>

      <div className='pl-[20px] pt-2 pb-[30px] pr-[20px] md:pr-[60px]'>
        <p className='text-[15px] text-[#6C3B3F] italic font-host-grotesk'>
          By {author} • {date}
        </p>
        <p className='text-[16px] md:text-[20px] font-medium text-black font-host-grotesk mt-[20px] md:mt-[30px]'>
          {title}
        </p>
        <p className='text-[14px] md:text-[16px] text-[#787878] font-host-grotesk mt-5 md:mt-9'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default BlogCard
