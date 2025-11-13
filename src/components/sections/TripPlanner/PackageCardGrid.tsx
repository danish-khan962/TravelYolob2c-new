'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode } from 'swiper/modules';

import PackageCard from '@/components/sections/TripPlanner/PackageCard';

interface Destination {
  title: string;
  duration: string;
  image: string;
  slug: string
}

const PackageCardGrid: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const fetchTrendingPackages = async () => {
      try {
        const res = await fetch('/api/packages?package_type=trending');
        if (!res.ok) throw new Error(`Failed to fetch trending packages: ${res.status}`);

        const data = await res.json();
        console.log("Fetched trending packages:", data);

        const formatted = data.results?.map((pkg: any) => ({
          title: pkg.title || "Untitled",
          duration:
            pkg.duration_days && pkg.duration_nights
              ? `${pkg.duration_days}D / ${pkg.duration_nights}N`
              : "",
          image: pkg.image || "/images/default-package.jpg",
          slug: pkg.slug || "",
        })) || [];

        setDestinations(formatted);
      } catch (err) {
        console.error("Error fetching trending packages:", err);
      }
    };

    fetchTrendingPackages();
  }, []);

  const renderTitle = (title: string) => {
    // Support for titles using '||' as line breaks
    return title.split('||').map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        {idx < title.split('||').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={21}
        freeMode={true}
        modules={[FreeMode]}
        className="px-4 pb-4"
      >
        {destinations.map((dest, index) => (
          <SwiperSlide
            key={index}
            style={{ width: '280px' }}
            className={`!w-[320px] sm:!w-[320px] md:!w-[360px] transition-all duration-200 cursor-pointer ${selectedIndex === index ? 'border-4 border-[#5F2E2E] rounded-2xl' : ''
              }`}
            onClick={() => setSelectedIndex(index)}
          >
            <PackageCard
              slug={dest.slug}
              title={renderTitle(dest.title)}
              duration={dest.duration}
              image={dest.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PackageCardGrid;
