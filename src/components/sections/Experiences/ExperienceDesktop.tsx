"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Experience {
  id: string;
  slug: string;
  title: string;
  duration_days?: number | string;
  duration_nights?: number | string;
  image?: string;
}

interface ExperienceDesktopProps {
  applySigTransforms: () => void;
  scheduleSigTransforms: () => void;
  sigCarouselRef: React.RefObject<HTMLDivElement>;
  scrollSigCarousel: (direction: -1 | 1) => void;
}

const ExperienceDesktop: React.FC<ExperienceDesktopProps> = ({
  applySigTransforms,
  scheduleSigTransforms,
  sigCarouselRef,
  scrollSigCarousel,
}) => {
  const params = useParams();
  const parentSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || 'romantic-escapes';

  const [activeIndex, setActiveIndex] = useState(2); // Start with 3rd slide
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType>();
  const [displayData, setDisplayData] = useState<Experience[]>([]);
  const [realDataLength, setRealDataLength] = useState(0);

  const initialSlideIndex = 3;
  const slidesToDuplicate = 5; // Number of slides to duplicate at each end

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/packages?package_type=experience");
        if (!res.ok) throw new Error("Failed to fetch signature packages");

        const json = await res.json();
        const data: Experience[] = json.results.map((item: any) => ({
          id: item.id || "",
          slug: item.slug || item.id || "",
          title: item.title || "Untitled",
          duration_days: item.duration_days || "",
          duration_nights: item.duration_nights || "",
          image: item.image || "",
        }));

        setRealDataLength(data.length);

        // Duplicate slides for the pseudo-loop effect
        const frontDuplicates = data.slice(-slidesToDuplicate);
        const backDuplicates = data.slice(0, slidesToDuplicate);
        const loopedData = [...frontDuplicates, ...data, ...backDuplicates];

        setDisplayData(loopedData);
      } catch (error) {
        console.error("Error loading signature packages:", error);
      }
    }
    fetchData();
  }, []);

  const getYTransform = (slideIndex: number) => {
    const diff = slideIndex - activeIndex;
    switch (diff) {
      case -1:
        return "translateY(-50px)";
      case 0:
        return "translateY(30px)";
      case 1:
        return "translateY(100px)";
      case 2:
        return "translateY(150px)";
      case -3:
        return "translateY(200px)";
      default:
        return "translateY(100px)";
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);

    // Looping logic for continuous effect
    const totalSlides = swiper.slides.length;
    const isAtEnd = swiper.activeIndex >= totalSlides - slidesToDuplicate;
    const isAtBeginning = swiper.activeIndex < slidesToDuplicate;

    if (isAtEnd) {
      // Jump to the corresponding slide at the beginning
      swiper.slideTo(swiper.activeIndex - realDataLength, 0);
    } else if (isAtBeginning && swiper.previousIndex !== undefined) {
      // Jump to the corresponding slide at the end only if moving backward
      if (swiper.previousIndex > swiper.activeIndex) {
        swiper.slideTo(swiper.activeIndex + realDataLength, 0);
      }
    }
  };

  const handleProgress = (swiper: SwiperType, progressValue: number) => {
    const clamped = Math.min(Math.max(progressValue, 0), 1);
    setProgress(clamped);
  };

  const [isLoop, setIsLoop] = useState(false);

  useEffect(() => {
    const updateLoop = () => {
      setIsLoop(window.innerWidth >= 640);
    };

    updateLoop();
    window.addEventListener("resize", updateLoop);
    return () => window.removeEventListener("resize", updateLoop);
  }, []);

  const renderTitleWithBreaks = (title: string) =>
    title.split("||").map((line, idx, arr) => (
      <React.Fragment key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <div className="hidden sm:block w-full">
      <section className="w-full mt-[37px] sm:mt-[52px] lg:mt-[74px]">
        <div id="sig-carousel" className="px-0 py-24 sm:py-28 lg:py-36">
          <div
            className="relative overflow-visible"
            style={{
              paddingTop: "160px",
              paddingBottom: "80px",
              marginTop: "-300px",
              marginBottom: "-60px",
            }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={12}
              slidesPerView={1.2}
              centeredSlides={true}
              slidesPerGroup={1}
              slideToClickedSlide={false}
              speed={600}
              navigation={false}
              initialSlide={initialSlideIndex + slidesToDuplicate}
              pagination={{
                el: ".swiper-pagination-custom",
                clickable: true,
                type: "progressbar",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 15,
                  slidesPerGroup: 1,
                },
                768: {
                  slidesPerView: 2.8,
                  spaceBetween: 18,
                  slidesPerGroup: 1,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 12,
                  slidesPerGroup: 1,
                },
              }}
              className="signature-experiences-swiper overflow-visible"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              onProgress={handleProgress}
              onInit={(swiper) => {
                swiper.slideTo(initialSlideIndex + slidesToDuplicate, 0);
                setActiveIndex(initialSlideIndex + slidesToDuplicate);
                setProgress(swiper.progress ?? 0);
              }}
            >
              {displayData.map((experience, index) => (
                <SwiperSlide key={index}>
                  <Link href={`/experiences/package?slug=${experience.slug}&category=${parentSlug}`}>
                    <div
                      className="relative max-w-[350px] w-full transition-transform duration-300 ease-out cursor-pointer"
                      style={{
                        transformOrigin: "center bottom",
                        transform: getYTransform(index),
                      }}
                    >
                      <div className="relative">
                        {experience.image ? (
                          <div className="w-full h-[420px] rounded-t-[16px] overflow-hidden">
                            <Image
                              src={experience.image}
                              alt={typeof experience.title === "string"
                                ? experience.title.replace(/\|\|/g, " ")
                                : "Destination image"}
                              width={350}
                              height={420}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full aspect-[296/398] bg-global-7 animate-pulse rounded-t-[16px]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-global-1/80 to-transparent rounded-t-[16px]" />
                      </div>

                      <div className="bg-[#F5F5F5] rounded-b-[16px] px-4 py-3 flex justify-between items-end">
                        <h3 className="text-[14px] sm:text-[16px] font-host-grotesk font-medium leading-[20px] sm:leading-[22px] lg:leading-[26px] text-black flex-1">
                          {renderTitleWithBreaks(experience.title)}
                        </h3>
                        {(experience.duration_days || experience.duration_nights) && (
                          <span className="text-[10px] sm:text-[12px] lg:text-[14px] font-host-grotesk font-normal leading-[13px] sm:leading-[16px] lg:leading-[19px] text-black ml-2 whitespace-nowrap">
                            {experience.duration_days && experience.duration_nights
                              ? `(${experience.duration_days}D / ${experience.duration_nights}N)`
                              : experience.duration_days
                                ? `(${experience.duration_days}D`
                                : `${experience.duration_nights}N)`}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Navigation + Progress bar */}
      <div className="relative z-20 flex justify-center items-center w-full -mt-12 pointer-events-auto px-4">
        <button
          className="swiper-button-prev-custom w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous slide"
          onClick={handlePrevSlide}
        >
          <Image src="/images/img_xmlid_222.svg" alt="Previous" width={8} height={14} />
          <Image src="/images/img_xmlid_222.svg" alt="Previous" width={8} height={14} />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 mx-4 max-w-[300px] w-full">
          <div className="w-full h-[3px] bg-[#E7E7E7] rounded-full relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          className="swiper-button-next-custom w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next slide"
          onClick={handleNextSlide}
        >
          <Image src="/images/img_arrow_right.svg" alt="Next" width={8} height={14} />
          <Image src="/images/img_arrow_right.svg" alt="Next" width={8} height={14} />
        </button>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .signature-experiences-swiper {
          overflow: visible !important;
        }

        .signature-experiences-swiper .swiper-wrapper {
          cursor: grab;
          overflow: visible !important;
          transition-timing-function: ease-out !important;
        }

        .signature-experiences-swiper .swiper-wrapper:active {
          cursor: grabbing;
        }

        .signature-experiences-swiper .swiper-slide {
          overflow: visible !important;
          transition: transform 0.3s ease-out !important;
        }

        .signature-experiences-swiper .swiper-slide-active {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ExperienceDesktop;