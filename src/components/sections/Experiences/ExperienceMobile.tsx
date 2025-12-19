"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Experience {
  id: string;
  slug: string;
  title: string;
  duration_days?: number | string;
  duration_nights?: number | string;
  image?: string;
}

interface ExperienceMobileProps {
  applySigTransforms: () => void;
  scheduleSigTransforms: () => void;
  sigCarouselRef: React.RefObject<HTMLDivElement>;
  scrollSigCarousel: (direction: -1 | 1) => void;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, "-");
}

const ExperienceMobile: React.FC<ExperienceMobileProps> = ({
  applySigTransforms,
  scheduleSigTransforms,
  sigCarouselRef,
  scrollSigCarousel,
}) => {
  const params = useParams();
  const parentSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || 'romantic-escapes';
    const stableSlug = React.useMemo(() => parentSlug, [parentSlug]);

  const [activeIndex, setActiveIndex] = useState(2);
  const [progress, setProgress] = useState(0);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const swiperRef = useRef<SwiperType>();
  const initialSlideIndex = 3;

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      const newIndex = Math.max(0, activeIndex - 1);
      swiperRef.current.slideTo(newIndex);
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      const newIndex = Math.min(experiences.length - 1, activeIndex + 1);
      swiperRef.current.slideTo(newIndex);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleProgress = (swiper: SwiperType, progress: number) => {
    setProgress(progress);
  };

  const handleSlideChangeTransitionStart = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const [isLoop, setIsLoop] = useState(false);

  useEffect(() => {
    const updateLoop = () => {
      setIsLoop(window.innerWidth >= 640);
    };

    updateLoop();
    window.addEventListener('resize', updateLoop);
    return () => window.removeEventListener('resize', updateLoop);
  }, []);

  
  useEffect(() => {
  async function fetchExperiences() {
    try {
      const subtypeRes = await fetch("/api/experience-subtypes");
      if (!subtypeRes.ok) {
        setExperiences([]);
        setIsLoop(false);
        return;
      }

      const subtypeJson = await subtypeRes.json();
      const subtypeList: any[] = subtypeJson?.data?.results || [];

      const matchedSubtype = subtypeList.find(
        (item) => slugify(item.name) === stableSlug
      );

      if (!matchedSubtype) {
        setExperiences([]);
        setIsLoop(false);
        return;
      }

      const subtypeId = matchedSubtype.id;

      let allData: Experience[] = [];
      let page = 1;
      const pageSize = 20;
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(
          `/api/packages?package_type=experience&experience_subtypes=${subtypeId}&page=${page}`
        );

        if (!res.ok) {
          setExperiences([]);
          setIsLoop(false);
          return;
        }

        const json = await res.json();
        const results = json.results || [];

        const mapped: Experience[] = results.map((item: any) => ({
          id: item.id || "",
          slug: item.slug || item.id || "",
          title: item.title || "Untitled",
          duration_days: item.duration_days || "",
          duration_nights: item.duration_nights || "",
          image: item.image_portrait || "",
        }));

        allData.push(...mapped);

        if (results.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      }

      setExperiences(allData);
      setIsLoop(window.innerWidth >= 640 && allData.length > 1);
    } catch {
      setExperiences([]);
      setIsLoop(false);
    }
  }

  fetchExperiences();
}, [stableSlug]);



  return (
    <div className="block sm:hidden w-full">
      <section className="w-full mt-[37px]">
        <div id="sig-carousel" className="px-0 py-24">
          <div
            className="relative overflow-visible"
            style={{
              paddingTop: '160px',
              paddingBottom: '80px',
              marginTop: '-300px',
              marginBottom: '-60px',
            }}
          >
            {experiences.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination]}
                simulateTouch={false}
                allowTouchMove={false}
                spaceBetween={32}
                slidesPerView={1.2}
                centeredSlides={true}
                slidesPerGroup={1}
                speed={600}
                loop={true}
                navigation={false}
                initialSlide={initialSlideIndex}
                breakpoints={{
                  360: { slidesPerView: 1.2, spaceBetween: 20 },
                  500: { slidesPerView: 2, spaceBetween: 20 },
                  640: { slidesPerView: 2.2, spaceBetween: 40 },
                  768: { slidesPerView: 3.5, spaceBetween: 40 },
                  1024: { slidesPerView: 5.5, spaceBetween: 28 },
                }}
                className="signature-experiences-swiper overflow-visible"
                style={{
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '30px',
                  paddingBottom: '30px',
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
                onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
                onProgress={handleProgress}
                onInit={(swiper) => {
                  swiper.slideTo(initialSlideIndex, 0);
                  setActiveIndex(initialSlideIndex);
                }}
              >
                {experiences.map((experience, index) => (
                  <SwiperSlide key={index}>
                    <Link href={`/experiences/package?slug=${experience.slug}&category=${parentSlug}`}>
                      <div className="relative w-full max-w-[400px] transition-transform duration-300 ease-out cursor-pointer">
                        <div className="relative">
                          {experience.image ? (
                            <div className="w-full h-[420px] rounded-t-[16px] overflow-hidden">
                              <Image
                                src={experience.image}
                                alt={
                                  typeof experience.title === "string"
                                    ? experience.title
                                    : "Destination image"
                                }
                                width={296}
                                height={420}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-[420px] bg-global-7 animate-pulse rounded-t-[16px]" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-global-1/80 to-transparent rounded-t-[16px]" />
                        </div>

                        <div className="bg-[#F5F5F5] rounded-b-[16px] px-4 py-3 flex justify-between items-end">
                          <h3 className="text-[14px] font-host-grotesk font-medium leading-[18px] text-black flex-1 line-clamp-3">
                            {typeof experience.title === 'string'
                              ? experience.title.split('||').map((line, idx) => (
                                <React.Fragment key={idx}>
                                  {line}
                                  {idx !== experience.title.split('||').length - 1 && <br />}
                                </React.Fragment>
                              ))
                              : null}
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
            )}
          </div>
        </div>
      </section>

      {/* Navigation + Progress bar */}
      <div className="relative z-20 flex justify-center items-center w-full -mt-28 pointer-events-auto px-4">
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

export default ExperienceMobile;
