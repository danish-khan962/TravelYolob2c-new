'use client';
import React, { useRef, useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useExperiencesStore } from '@/store/experiencesStore';

// Import new section components
import HeroSection from '@/components/sections/HeroSection';
import NotJustTravelSection from '@/components/sections/NotJustTravelSection';
import BeyondItinerarySection from '@/components/sections/BeyondItinerarySection';
import CuratedProcessSection from '@/components/sections/CuratedProcessSection';
import TravelerStoriesSection from '@/components/sections/TravelerStoriesSection';
import TrendingSection from '@/components/sections/TrendingSection';
import CallToActionSection from '@/components/sections/CallToActionSection';
import SignatureExperiencesWrapper from '@/components/sections/SignatureExperienceWrapper';



const HomePage: React.FC = () => {
  const sigCarouselRef = useRef<HTMLDivElement | null>(null);
  const sigRafRef = useRef<number | null>(null);

  const scrollSigCarousel = (direction: -1 | 1) => {
    const el = sigCarouselRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    if (slides.length === 0) return;

    const currentLeft = el.scrollLeft;
    let activeIndex = 0;
    let minDelta = Number.POSITIVE_INFINITY;
    slides.forEach((child, idx) => {
      const delta = Math.abs(child.offsetLeft - currentLeft);
      if (delta < minDelta) {
        minDelta = delta;
        activeIndex = idx;
      }
    });

    const nextIndex = Math.max(0, Math.min(slides.length - 1, activeIndex + direction));
    slides[nextIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  const scheduleSigTransforms = () => {
    if (sigRafRef.current) cancelAnimationFrame(sigRafRef.current);
    sigRafRef.current = requestAnimationFrame(applySigTransforms);
  };

  const applySigTransforms = () => {
    const el = sigCarouselRef.current;
    if (!el) return;

    const slides = Array.from(el.children) as HTMLElement[];
    if (slides.length === 0) return;

    const containerRect = el.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const baseAmplitude = 60;
    const waveFrequency = 0.0008;
    const centerBoost = 1.8;
    const scaleVariation = 0.15;

    slides.forEach((slide) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distanceFromCenter = slideCenter - containerCenter;
      const normalizedDistance = distanceFromCenter / containerRect.width;
      const sineInput = distanceFromCenter * waveFrequency;
      let sineValue = Math.sin(sineInput);

      if (Math.abs(normalizedDistance) < 0.3) {
        sineValue *= centerBoost;
      }

      const baselineOffset = sineValue * baseAmplitude;
      const scaleOffset = 1 + (sineValue * scaleVariation);

      slide.style.transform = `translateY(${baselineOffset}px) scale(${scaleOffset})`;
      slide.style.transformOrigin = 'center bottom';
    });
  };

  const { items: experiences, loading: experiencesLoading, fetchAll } = useExperiencesStore();

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute arched transforms on mount, after data load, and on resize
  useEffect(() => {
    applySigTransforms();
    const onResize = () => scheduleSigTransforms();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (sigRafRef.current) cancelAnimationFrame(sigRafRef.current);
    };
  }, [experiencesLoading]);



  // Gentle auto-scroll for Trending carousel
  const trendingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = trendingRef.current || document.getElementById('trending-carousel');
    if (!el) return;

    let rafId: number | null = null;
    let running = true;
    let last = performance.now();
    const speedPxPerSec = 30; // gentle speed

    const step = (now: number) => {
      const dt = Math.min(100, now - last) / 1000; // clamp to avoid jumps
      last = now;
      if (!running) {
        rafId = requestAnimationFrame(step);
        return;
      }
      el.scrollLeft += speedPxPerSec * dt;
      const maxScroll = el.scrollWidth - el.clientWidth - 1;
      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = 0; // loop
      }
      rafId = requestAnimationFrame(step);
    };

    const onMouseEnter = () => { running = false; };
    const onMouseLeave = () => { running = true; };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(step);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full bg-global-12 antialiased overflow-x-hidden">

      {/* Main Content Stack */}
      <div className="relative w-full">
        {/* Hero Section */}
        <HeroSection />

        {/* Not Just Travel Section */}
        <NotJustTravelSection />

        {/* Signature Travel Experiences Section */}
        {/*
<SignatureExperiencesSection
  applySigTransforms={applySigTransforms}
  scheduleSigTransforms={scheduleSigTransforms}
  sigCarouselRef={sigCarouselRef}
  scrollSigCarousel={scrollSigCarousel}
/>
*/}
        <div className='mt-[75px] md:mt-[80px]'>
          <div className="hidden md:flex relative z-10 flex-col justify-center items-center sm:justify-start sm:items-start h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col items-start text-start sm:items-center sm:block">
              <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-light italic leading-[40px] sm:leading-[55px] md:leading-[65px] lg:leading-[79px] capitalize mb-2 sm:mb-4 lg:mb-[8px] text-balance font-noto-serif">
                Dream Destinations, Designed For You.
              </h1>
              <p className="text-[#312E29] text-[14px] sm:text-[16px] md:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] md:leading-[24px] lg:leading-[27px] mb-[28px] sm:mb-[36px] lg:mb-[48px] mt-3 sm:mt-4 lg:mt-5 max-w-[535px] w-full">
                From romantic coastlines to vibrant cities and hidden retreats, discover places that inspire your wanderlust and turn every journey into a story worth telling.
              </p>
            </div>
          </div>

          <div className="flex md:hidden relative z-10 flex-col justify-start items-start h-full max-w-[1440px] px-4">
            <div className="flex flex-col items-start text-start">
              <h1 className="text-[30px] font-light italic leading-[40px] capitalize mb-2 font-noto-serif">
                Dream Destinations, Designed For You.
              </h1>
              <p className="text-[#312E29] text-[16px] font-host-grotesk font-light leading-[22px] mb-[28px] mt-3 max-w-[535px] w-full">
                From romantic coastlines to vibrant cities and hidden retreats, discover places that inspire your wanderlust and turn every journey into a story worth telling.
              </p>
            </div>
          </div>
          <SignatureExperiencesWrapper />

          <div className="hidden md:flex justify-center mt-[37px] sm:mt-[45px] lg:mt-[50px] px-4 sm:px-6 lg:px-8">
            <Link href={"/destinations"}>
              <Button
              variant="primary"
              size="md"
              className="bg-global-13 text-global-5 rounded-full px-4 sm:px-7 lg:px-[40px] py-2 sm:py-3 lg:py-[14px] text-sm sm:text-base lg:text-[18px] font-host-grotesk font-normal leading-[17px] sm:leading-[20px] lg:leading-[24px] hover:scale-105 transition-all ease-in-out duration-200"
            >
              View All Destinations
            </Button>            
            </Link>
          </div>
        </div>

        <div className="flex md:hidden justify-center mt-[37px] px-4">
          <Link className='w-full' href={"/destinations"}>
              <Button
            variant="primary"
            size="md"
            className="bg-global-13 text-global-5 rounded-full w-[241px] h-[54px] text-[18px] font-host-grotesk font-normal hover:scale-105 transition-all duration-200"
          >
            View All Destinations
          </Button>
          </Link>
        </div>

        {/* Beyond the Itinerary & Travel Categories Section */}
        <BeyondItinerarySection />

        {/* Trending Section */}
        <TrendingSection />

        {/* Curated Process Section */}
        <CuratedProcessSection />

        {/* Traveler Stories Section */}
        <TravelerStoriesSection />

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>

    </div>
  );
};

export default HomePage;

// Auto-scroll effect for Trending carousel
// Keeps the carousel moving slowly; pauses on hover via CSS pointer events if wired.
// Hooks must be inside component, so add below declarations.
