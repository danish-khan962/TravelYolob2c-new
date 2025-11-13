import React from "react";

const BlogPostSkeleton = () => {
  return (
    <div className="relative w-screen">
      {/* Banner Placeholder */}
      <div className="w-full h-[300px] md:h-[420px] bg-gray-200 animate-pulse" />

      {/* Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col mdplus:flex-row md:justify-between mt-[25px] md:mt-[37px] gap-x-[26px]">
        {/* Left Section */}
        <div className="w-full mdplus:w-[70%] mdplus:border-r border-[#D0D0D0] pr-0 mdplus:pr-[26px] pb-[80px] animate-pulse">
          {/* Author & Date */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>

          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>

          {/* Paragraphs */}
          <div className="space-y-4 mb-8">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
          </div>

          {/* Quote */}
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>

          {/* Second Paragraphs */}
          <div className="space-y-4 mb-8">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          </div>

          {/* Image Grid */}
          <div className="flex flex-col sm:flex-row gap-[17px] mb-8">
            <div className="w-full sm:w-1/2 h-[280px] bg-gray-200 rounded-xl"></div>
            <div className="w-full sm:w-1/2 h-[280px] bg-gray-200 rounded-xl"></div>
          </div>

          {/* Third Paragraphs */}
          <div className="space-y-4 mb-10">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
            <div className="h-4 bg-gray-200 rounded w-9/12"></div>
          </div>

          {/* Navigation buttons (mobile) */}
          <div className="flex justify-between mt-6 sm:hidden">
            <div className="w-[170px] h-[75px] border border-gray-300 rounded-md bg-gray-100"></div>
            <div className="w-[170px] h-[75px] border border-gray-300 rounded-md bg-gray-100"></div>
          </div>

          {/* Swiper area desktop */}
          <div className="hidden sm:flex justify-between items-center mt-6">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="flex gap-8 w-full justify-center">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-[107px] h-[73px] bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-[200px] bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:flex-1 mt-[89px] md:mt-0 animate-pulse">
          {/* Latest Posts */}
          <div className="mb-10">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[107px] h-[73px] bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-[200px] bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <hr className="h-[1px] bg-gray-200 w-full mb-8" />

          {/* Newsletter */}
          <div className="mb-10">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="w-full h-[50px] bg-gray-200 rounded-full mb-4"></div>
            <div className="w-full h-[50px] bg-gray-200 rounded-full"></div>
          </div>

          <hr className="h-[1px] bg-gray-200 w-full mb-8" />

          {/* Follow Us */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[50px] h-[50px] bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
