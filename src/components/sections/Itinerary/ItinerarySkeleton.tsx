import React from "react";

const ItinerarySkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section */}
      <div className="w-full h-[400px] sm:h-[600px] bg-gray-200 rounded-lg"></div>

      {/* Overview */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-[80px] sm:mt-[150px]">
        <div className="flex flex-col space-y-4">
          <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
            <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          </div>
        </div>

        {/* Top Attractions */}
        <div className="mt-[70px] space-y-6">
          <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[250px] h-[180px] sm:w-[300px] sm:h-[200px] bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Itinerary Plan */}
        <div className="mt-[120px] space-y-10">
          <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
          <div className="flex flex-col md:flex-row justify-between gap-10">
            {/* Timeline Placeholder */}
            <div className="flex-1 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
            {/* Map Placeholder */}
            <div className="h-[400px] md:h-[700px] flex-1 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* What is Included */}
        <div className="mt-[120px] space-y-6">
          <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-200 rounded w-full"></div>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden sm:flex gap-4 mt-[100px]">
            <div className="w-[223px] h-[54px] bg-gray-300 rounded-full"></div>
            <div className="w-[223px] h-[54px] bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 mt-[120px] pb-[120px] pt-[150px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[250px] bg-gray-200 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Buttons */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-[100px] sm:hidden">
        <div className="flex flex-col gap-4 mt-[100px]">
          <div className="w-full h-[54px] bg-gray-300 rounded-full"></div>
          <div className="w-full h-[54px] bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySkeleton;
