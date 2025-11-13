'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

import { useRouter } from "next/navigation";

interface TrendingPackage {
    id: string;
    title: string;
    duration_days: number;
    duration_nights: number;
    image: string;
    slug: string;
    region: string;
    season: string;
}

const TrendingSection: React.FC = () => {
    const router = useRouter();

    const handleCardClick = (item: any) => {
        // Store region & season temporarily
        // Store only region temporarily
        if (item?.title) {
            sessionStorage.setItem(
                "preselectedFilters",
                JSON.stringify({
                    regionName: item.title,
                })
            );
        }


        // Redirect to /destinations (no query in URL)
        router.push("/destinations");
    };

    const [trendingItems, setTrendingItems] = useState<TrendingPackage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingPackages = async () => {
            try {
                const response = await fetch(`/api/packages?package_type=trending`);
                if (!response.ok) throw new Error(`Failed to fetch trending packages: ${response.status}`);

                const data = await response.json();
                console.log("Fetched trending packages:", data.results);

                const allowedTitles = ["Dubai", "Bali", "India", "Thailand", "UK", "Vietnam", "Spain"];

                const formattedData = data.results
                    .map((pkg: any) => ({
                        id: pkg.id,
                        slug: pkg.slug,
                        title: pkg.title,
                        duration_days: pkg.duration_days,
                        duration_nights: pkg.duration_nights,
                        image: pkg.image || "/images/default-package.jpg",
                        region: pkg.region && typeof pkg.region === "object"
                            ? pkg.region
                            : { id: pkg.region_id || pkg.region, name: pkg.region_name || pkg.region },
                        season: pkg.season && typeof pkg.season === "object"
                            ? pkg.season
                            : { id: pkg.season_id || pkg.season, name: pkg.season_name || pkg.season },
                    }))
                    .filter((pkg: any) =>
                        allowedTitles.some((title) =>
                            pkg.title?.toLowerCase().includes(title.toLowerCase())
                        )
                    );
                setTrendingItems(formattedData);
            } catch (error) {
                console.error("Error fetching trending packages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingPackages();
    }, []);

    if (loading) {
        return (
            <section>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                    <h2 className="text-[26px] sm:text-[28px] lg:text-[40px] font-light italic leading-[26px] sm:leading-[36px] lg:leading-[55px] text-global-1 font-noto-serif">
                        Trending Destinations
                    </h2>
                    <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] lg:leading-[28px] text-global-2 mt-2.5 sm:mt-2 max-w-[600px]">
                        Explore trending escapes that inspire travel with beauty, history, and unforgettable moments.
                    </p>

                    {/* // Skeletion of Card */}
                    <div className="mt-6 sm:mt-8 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-pulse">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="relative w-full h-[400px] bg-gray-200 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden"
                            >
                                <div className="absolute bottom-0 left-0 right-0 bg-[#F5F5F5] px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="h-4 sm:h-5 w-3/4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-3 sm:h-4 w-1/3 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        )
    }

    return (
        <section className="w-full py-[60px] sm:py-[80px] lg:py-[120px]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                <h2 className="text-[26px] sm:text-[28px] lg:text-[40px] font-light italic leading-[26px] sm:leading-[36px] lg:leading-[55px] text-global-1 font-noto-serif">
                    Trending Destinations
                </h2>
                <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-host-grotesk font-light leading-[19px] sm:leading-[22px] lg:leading-[28px] text-global-2 mt-2.5 sm:mt-2 max-w-[600px]">
                    Explore trending escapes that inspire travel with beauty, history, and unforgettable moments.
                </p>

                {/* Swiper */}
                <div className="block mt-6 sm:mt-8 lg:mt-16">
                    <Swiper
                        spaceBetween={16}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        modules={[Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.1, // below sm
                            },
                            640: {
                                slidesPerView: 2.2, // sm to md
                            },
                            768: {
                                slidesPerView: 3, // md and above
                            },
                        }}
                    >
                        {trendingItems.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div onClick={() => handleCardClick(item)} className="cursor-pointer">
                                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden sm:rounded-xl lg:rounded-2xl">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="100vw"
                                            loading='lazy'
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-[#F5F5F5] px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-end">
                                            <h3 className="text-black text-[14px] sm:text-[16px] lg:text-[20px] font-medium">{item.title}</h3>
                                            {/* <p className="text-[#000000] text-[12px] sm:text-[14px]">{`(${item.duration_days}D / ${item.duration_nights}N)`}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;
