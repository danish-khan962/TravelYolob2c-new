'use client';

import React, { useState, useEffect } from 'react';
import TripPlannerForm from '@/components/sections/TripPlanner/TripPlannerForm';
import Hero from '@/components/sections/TripPlanner/Hero';
import PackageCardGrid from '@/components/sections/TripPlanner/PackageCardGrid';
import PackageGrid2 from '@/components/sections/TripPlanner/PackageGrid2';
import toast from 'react-hot-toast';

const Page: React.FC = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [suggestedPackages, setSuggestedPackages] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSuggested, setLoadingSuggested] = useState(true);

  useEffect(() => {
    const fetchPopularPackages = async () => {
      try {
        const res = await fetch("/api/packages?package_type=popular");
        const data = await res.json();
        const formatted = data.results?.map((pkg: any) => ({
          id: pkg.id,
          slug: pkg.slug || "",
          title: pkg.title || "Untitled",
          image: pkg.image || "/images/default-package.jpg",
          duration:
            pkg.duration_days && pkg.duration_nights
              ? `${pkg.duration_days}D / ${pkg.duration_nights}N`
              : "",
        }));
        setDestinations(formatted);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularPackages();
  }, []);

  useEffect(() => {
    const fetchSuggestedPackages = async () => {
      try {
        const res = await fetch("/api/packages?package_type=signature");
        const data = await res.json();
        const formatted = data.results?.map((pkg: any) => ({
          id: pkg.id,
          slug: pkg.slug || "",
          title: pkg.title || "Untitled",
          image: pkg.image || "/images/default-package.jpg",
          duration:
            pkg.duration_days && pkg.duration_nights
              ? `${pkg.duration_days}D / ${pkg.duration_nights}N`
              : "",
        }));
        setSuggestedPackages(formatted || []);
      } catch (err) {
        console.error("Error fetching suggested packages:", err);
      } finally {
        setLoadingSuggested(false);
      }
    };
    fetchSuggestedPackages();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const packagesToShow = isSmallScreen ? destinations.slice(0, visibleCount) : destinations;

  return (
    <div>
      <Hero />

      <div className='px-4 md:px-10 lg:px-16 flex flex-col sm:flex-row gap-x-[130px] gap-y-[20px] mt-[60px] items-start sm:items-center'>
        <p className='font-noto-serif text-[30px] sm:text-[40px] font-light italic leading-tight'>
          What&apos;s your <br />
          dream destination?
        </p>
        <p className='max-w-[700px] w-full text-[16px] sm:text-[20px] leading-[22px] sm:leading-[28px]'>
          Start building your custom itinerary with the help of our expert travel designers. Whether you have a destination in mind or are seeking inspiration, we’ll take care of every detail.
        </p>
      </div>

      <div className='mt-[77px]'>
        <TripPlannerForm
          onSubmitSuccess={() =>
            toast.success("Thank you! Your trip inquiry has been successfully submitted.")
          }
          onSubmitError={() =>
            toast.error("Something went wrong. Please try again later.")
          }
        />
      </div>

      {/* Suggested Packages Section */}
      <div className='bg-white py-[60px] sm:py-[100px] mt-[100px]'>
        <div className='px-4 md:px-10 lg:px-26 mb-[55px] sm:mb-[40px]'>
          <p className='font-noto-serif text-[32px] sm:text-[40px] font-light italic leading-tight text-center sm:text-start'>
            Suggested Packages
          </p>
        </div>

        {loadingSuggested ? (
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

      <div className='bg-[#F9F9F9] mt-[100px] sm:mt-[135px]'>
        <div className='px-4 md:px-10 lg:px-26 pt-[55px] sm:pt-[104px] mb-[55px] sm:mb-[40px]'>
          <p className='font-noto-serif text-[32px] sm:text-[40px] font-light italic leading-tight text-center sm:text-start'>
            Popular Packages
          </p>
        </div>

        {loading ? (
          // Skeleton Loader Section
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

            {/* Small pulse CSS animation keyframes */}
            <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>
          </div>
        ) : (
          <PackageGrid2 destinations={packagesToShow} />
        )}

        {isSmallScreen && visibleCount < destinations.length && (
          <div className='flex justify-center items-center mt-[70px] mb-[130px]'>
            <button
              onClick={handleShowMore}
              className='py-2 w-[341px] text-[20px] font-medium font-host-grotesk sm:hidden border border-[#312E29] rounded-full hover:text-white hover:bg-[#312E29] hover:scale-105 cursor-pointer transition-all ease-in-out duration-200'
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
