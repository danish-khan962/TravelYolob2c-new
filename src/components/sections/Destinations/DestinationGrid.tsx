'use client';

import React, { useEffect, useState } from 'react';
import DestinationCard from './DestinationCard';
import TripPlannerForm from '../TripPlanner/TripPlannerForm';
import PackageGrid2 from '../TripPlanner/PackageGrid2';
import { FiChevronDown } from 'react-icons/fi';

interface Destination {
  title: string;
  duration: string;
  image: string;
  id: string;
  slug: string;
}

interface DestinationGridProps {
  regionId?: string;
  seasonId?: string;
  suggestedPackages?: any[];
  loadingPackages?: boolean;
}

const DestinationGrid: React.FC<DestinationGridProps> = ({
  regionId,
  seasonId,
  suggestedPackages = [],
  loadingPackages = false
}) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [screenWidth, setScreenWidth] = useState<number>(0);

 useEffect(() => {
  const fetchDestinations = async () => {
    try {
      const params = new URLSearchParams({ package_type: 'destination' });

      // Apply filters only when present
      if (regionId) params.append('region', regionId);
      if (seasonId) params.append('season', seasonId);

      const res = await fetch(`/api/packages?${params.toString()}`);
      if (!res.ok) throw new Error(`Failed to fetch destinations: ${res.status}`);

      const data = await res.json();
      console.log("Fetched destination packages for:", { regionId, seasonId });

      const formattedData = data.results.map((pkg: any) => ({
        id: pkg.id,
        slug: pkg.slug,
        title: pkg.title || "Untitled",
        duration: pkg.duration_days && pkg.duration_nights
          ? `(${pkg.duration_days}D / ${pkg.duration_nights}N)`
          : "",
        image: pkg.image || "/images/default-package.jpg",
      }));

      setDestinations(formattedData);
    } catch (err) {
      console.error("Error loading destination packages:", err);
    }
  };

  // ✅Only fetch after regionId or seasonId are defined (avoids early fetch)
  if (regionId || seasonId) {
    fetchDestinations();
  } else {
    // Optional: fetch all destinations when no filter is applied
    fetchDestinations();
  }
}, [regionId, seasonId]);


  //  Track screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = screenWidth < 640;
  const isMediumScreen = screenWidth >= 640 && screenWidth < 1024;
  const isLargeScreen = screenWidth >= 1024;

  const destinationsToShow = destinations.slice(0, visibleCount);

  const handleShowMore = () => {
    if (isSmallScreen) {
      setVisibleCount((prev) => Math.min(prev + 6, destinations.length));
    } else if (isMediumScreen) {
      setVisibleCount((prev) => Math.min(prev + 2, destinations.length));
    } else if (isLargeScreen) {
      setVisibleCount((prev) => Math.min(prev + 3, destinations.length));
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto">
      {/* Empty State */}
      {destinations.length === 0 && (regionId || seasonId) && (
        <>
          <div className="flex flex-col items-center justify-center px-4">
            <p className="text-[#6C3B3F] text-[24px] sm:text-[32px] font-light italic font-noto-serif text-center leading-normal mb-[60px]">
              We are curating this journey for you
            </p>

            <div className="w-full">
              <TripPlannerForm />
            </div>
          </div>

          {/* Suggested Packages Section */}
          <div className='bg-white py-[60px] sm:py-[100px] mt-[100px]'>
            <div className='px-4 md:px-10 lg:px-26 mb-[55px] sm:mb-[40px]'>
              <p className='font-noto-serif text-[32px] sm:text-[40px] font-light italic leading-tight text-center sm:text-start'>
                Suggested Packages
              </p>
            </div>

            {loadingPackages ? (
              <div className="max-w-[1400px] w-full mx-auto">
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 justify-items-center">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse relative max-w-[450px] w-full h-[510px] sm:h-[550px] md:h-[580px] lg:h-[610px] rounded-xl overflow-hidden bg-gray-200 shadow-md"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />

                      <div className="absolute bottom-0 left-0 w-full h-[72px] bg-gray-100 z-10 flex justify-between items-center px-5">
                        <div className="h-4 w-[70%] bg-gray-300 rounded"></div>
                        <div className="h-4 w-[20%] bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <PackageGrid2 destinations={suggestedPackages} />
            )}
          </div>
        </>
      )}

      {/* Grid */}
      {destinations.length > 0 && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[20px] sm:gap-y-6 justify-items-center">
          {destinationsToShow.map((dest, index) => (
            <div
              key={index}
              className={`
                w-full
                ${index % 3 === 1 ? 'lg:-translate-y-[10%]' : ''}
                transition-transform duration-300
              `}
            >
              <DestinationCard
                title={
                  <>
                    {dest.title.split('||').map((line, i) => (
                      <React.Fragment key={i}>
                        {line.trim()}
                        {i < dest.title.split('||').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </>
                }
                id={dest.id}
                duration={dest.duration}
                image={dest.image}
                slug={dest.slug}
              />
            </div>
          ))}
        </div>
      )}


      {/* Show more button */}
      {isSmallScreen && visibleCount < destinations.length && (
        <div className="flex justify-center items-center mt-[70px]">
          <button
            onClick={handleShowMore}
            className="py-2 w-[341px] text-[20px] font-medium font-host-grotesk sm:hidden border border-[#312E29] rounded-full hover:text-white hover:bg-[#312E29] hover:scale-105 cursor-pointer transition-all ease-in-out duration-200"
          >
            Show more
          </button>
        </div>
      )}

      {/* Chevron */}
      {!isSmallScreen && visibleCount < destinations.length && (
        <div className="max-sm:hidden flex justify-center items-center mt-[20px]">
          <FiChevronDown
            className="cursor-pointer text-[30px] hover:scale-110 transition-transform duration-200"
            onClick={handleShowMore}
          />
        </div>
      )}
    </div>
  );
};

export default DestinationGrid;
