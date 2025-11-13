'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface TravelCategory {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    hrefUrl: string;
}

const travelCategories: TravelCategory[] = [
    {
        id: '1',
        title: 'Romantic Escapes',
        subtitle: 'Thrill meets luxury.',
        image: '/images/romantic_escapes.jpg',
        hrefUrl: '/experiences/romantic-esapces'
    },
    {
        id: '2',
        title: 'Family Getaways',
        subtitle: 'Romance in style.',
        image: '/images/family_getaways.jpg',
        hrefUrl: '/experiences/family-getaways'
    },
    {
        id: '3',
        title: 'Cultural Soujourns',
        subtitle: 'Travel that brings everyone closer.',
        image: '/images/cultural_soujourns.jpeg',
        hrefUrl: '/experiences/cultural-soujourns'
    },
    {
        id: '4',
        title: 'Scenic Escapes',
        subtitle: 'Barefoot bliss, elevated.',
        image: '/images/scenic_escapes.jpeg',
        hrefUrl: '/experiences/scenic-escapes'
    },
    {
        id: '5',
        title: 'Wildlife Encounters',
        subtitle: 'Wildlife experience.',
        image: '/images/wildlife_encounters.jpg',
        hrefUrl: '/experiences/wildlife-encounters'
    }
];

const BeyondItinerarySection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const totalItems = travelCategories.length;
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        setHasMounted(true);  // mark mounted on client

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!hasMounted) {
        // Don't render UI dependent on isMobile until mounted
        return null;
    }

    const itemsToShow = isMobile ? 1 : 3;
    const maxIndex = totalItems - itemsToShow;

    const handleNext = () => {
        swiperRef.current?.slideNext();
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const getVisibleCategories = () => {
        return travelCategories.slice(currentIndex, currentIndex + itemsToShow);
    };

    // Calculate progress (0 to 1)
    const progress = maxIndex > 0 ? currentIndex / maxIndex : 0;

    return (
        <>
            {/* Beyond the Itinerary Section */}
            <section className="relative w-full mt-[80px] sm:mt-[100px] lg:mt-[140px] overflow-hidden">
                <div className="flex flex-col lg:flex-row w-full">
                    <div className="flex flex-col gap-12 lg:gap-16 justify-start items-start w-full lg:w-[45%] px-4 sm:px-6 lg:px-0">
                        <div className="relative w-full">
                            <div className="w-[80%] lg:w-[60%] h-[340px] sm:h-[500px] lg:h-[600px] xl:h-[700px] bg-global-9 rounded-lg"></div>
                            <div className="absolute top-[40px] sm:top-[60px] lg:top-[80px] xl:top-[100px] right-[10%] lg:right-[15%] w-[230px] sm:w-[280px] lg:w-[320px] xl:w-[380px] h-[250px] sm:h-[350px] lg:h-[420px] xl:h-[480px]">
                                <Image
                                    src="/images/img_shutterstock_1995820526_566x448.png"
                                    alt="Travel Expert"
                                    width={448}
                                    height={566}
                                    className="w-full h-full object-cover rounded-t-[150px] rounded-b-[20px] ring-1 ring-black/5 shadow-lg"
                                />
                                <div className="absolute bottom-3 left-4 right-4">
                                    <Image
                                        src="/images/img_vector_black_900.svg"
                                        alt="Decorative Vector"
                                        width={402}
                                        height={480}
                                        className="w-full h-auto opacity-80"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] text-global-1 text-center lg:text-left font-noto-serif">
                            The World, Tailored To Your Passions...
                        </h2> */}
                    </div>
                    <div className="flex flex-col gap-6 sm:gap-8 justify-start items-start w-full lg:w-[55%] px-4 sm:px-6 lg:px-10 max-w-full lg:max-w-[650px] mt-8 lg:mt-0">
                        <div className="flex flex-col gap-4 sm:gap-6 ">
                            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-light italic leading-[24px] sm:leading-[26px] md:leading-[30px] lg:leading-[36px] font-noto-serif" style={{ color: '#6C3B3F' }}>
                                Beyond the itinerary<br />your passport to the extraordinary.
                            </h2>
                            <div className="flex flex-col gap-3 sm:gap-4">
                                <p className="text-[14px] sm:text-base md:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] md:leading-[26px] lg:leading-[26px]" style={{ color: '#312E29' }}>
                                    At TravelYollo, we don't just plan trips—we craft extraordinary experiences. Born from a passion for seamless, immersive, and unforgettable travel, we specialize in curating bespoke journeys that redefine luxury and adventure.
                                </p>
                                <p className="text-[14px] sm:text-base md:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] md:leading-[26px]" style={{ color: '#312E29' }}>
                                    We make travel feel effortless—so you can focus on what matters most: living the experience. Whether it's remote, rugged, or richly indulgent, every journey is crafted with care to blend seamless planning with unforgettable moments.
                                </p>
                                <p className="text-[14px] sm:text-base md:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] md:leading-[26px] " style={{ color: '#312E29' }}>
                                    Whether it's a private safari in the Serengeti, an exclusive villa retreat on the Amalfi Coast, or an Arctic expedition under the Northern Lights, we ensure every detail is meticulously designed for an unparalleled experience.
                                </p>
                                <p className="text-[14px] sm:text-base md:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] md:leading-[26px]" style={{ color: '#312E29' }}>
                                    At TravelYollo, we don't just take you places—we take you beyond the expected. Let's turn your travel dreams into reality.
                                </p>
                            </div>
                        </div>
                        <Link href={"/trip-planner"}>
                            <Button
                                variant="outline"
                                size="md"
                                className="rounded-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-[16px] font-host-grotesk font-normal leading-[16px] sm:leading-[18px] lg:leading-[22px] bg-transparent transition-transform duration-200 hover:scale-105 self-start mb-2 sm:mb-0"
                                style={{
                                    border: '1px solid #312E29',
                                    color: '#312E29',
                                    background: 'transparent'
                                }}
                            >
                                Talk to Our Travel Experts
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Section Title */}
                {/* <div className="text-center mt-16 lg:mt-24 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] text-global-3 max-w-[800px] mx-auto font-noto-serif">
                        Beyond the itinerary your passport to the extraordinary.
                    </h2>
                </div> */}
            </section>

            {/* Travel Categories Section */}
            <section className="w-full overflow-hidden mt-12 sm:mt-16 lg:mt-36">
                {/* Desktop - Title with Navigation */}
                <div className="hidden sm:flex items-center justify-between px-4 sm:px-6 lg:px-12">
                    <h2 className="text-[30px] md:text-[35px] lg:text-[40px] lg:ml-24 font-[300] italic leading-[35px] sm:leading-[40px] md:leading-[44px] lg:leading-[55px] text-global-1 text-start w-[70%] sm:w-auto font-noto-serif">
                        The World, Tailored To Your Passions...
                    </h2>

                    {/* Navigation Arrows with Progress Bar */}
                    <div className="flex gap-2 sm:gap-4 items-center">
                        <button
                            onClick={handlePrev}
                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            aria-label="Previous slide"
                            disabled={currentIndex === 0}
                        >
                            <Image src="/images/img_xmlid_222.svg" alt="Previous" width={8} height={14} />
                            <Image src="/images/img_xmlid_222.svg" alt="Previous" width={8} height={14} />
                        </button>

                        {/* Progress Bar */}
                        <div className="w-[80px] sm:w-[100px] md:w-[120px] mx-2">
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
                            onClick={handleNext}
                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                            aria-label="Next slide"
                            disabled={currentIndex === maxIndex}
                        >
                            <Image src="/images/img_arrow_right.svg" alt="Next" width={8} height={14} />
                            <Image src="/images/img_arrow_right.svg" alt="Next" width={8} height={14} />
                        </button>
                    </div>
                </div>

                {/* Mobile - Title Only */}
                <h2 className="block sm:hidden text-[30px] font-[300] italic leading-[35px] text-global-1 text-start px-4 font-noto-serif">
                    The World, Tailored To Your Passions...
                </h2>

                {/* Desktop - Slider with 3 items */}
                <div className="hidden sm:block relative mt-4 sm:mt-6 lg:mt-8">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={3}
                        spaceBetween={0}
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        allowTouchMove={false}
                        style={{ width: '100%' }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {travelCategories.map((category) => (
                            <SwiperSlide key={category.id} style={{ width: '33.3333%' }}>
                                <Link href={category.hrefUrl} className="block">
                                    <div className="relative group w-full h-[320px] md:h-[420px] lg:h-[520px] xl:h-[600px] overflow-hidden flex-shrink-0">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Overlay background */}
                                        <div className="absolute top-0 left-0 right-0 h-[80px] bg-[#F5F5F5] bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-500 z-10 pointer-events-none"></div>

                                        {/* Text content */}
                                        <div className="absolute top-0 left-0 right-0 h-[70px] flex flex-col items-center justify-center px-6 py-2 text-center pointer-events-none -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-20">
                                            <h3 className="text-global-1 text-[32px] font-light italic font-noto-serif">
                                                {category.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>

                {/* Mobile - Stacked Vertically */}
                <div className="block sm:hidden flex-col w-full mt-4">
                    {travelCategories.map((category) => (
                        <Link href={category.hrefUrl} className='block' key={category.id}>
                            <div
                                className="relative group w-full h-[450px] overflow-hidden"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover"
                                />

                                {/* Dim overlay on mobile */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>

                                {/* Text content: always centered on mobile */}
                                <div className="absolute top-0 left-0 right-0 h-full flex flex-col items-center justify-center px-4 py-2 text-center pointer-events-none">
                                    <h3 className="text-white text-[30px] font-light italic font-noto-serif">
                                        {category.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </>
    );
};

export default BeyondItinerarySection;
