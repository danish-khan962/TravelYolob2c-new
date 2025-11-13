"use client"

import DestinationGrid from '@/components/sections/Destinations/DestinationGrid'
import Hero from '@/components/sections/Destinations/Hero'
import PackageGrid2 from '@/components/sections/TripPlanner/PackageGrid2'
import { buildApiUrl } from '@/config/api'
import React, { useState, useEffect } from 'react'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

interface Region {
  id: string;
  name: string;
}

interface Season {
  id: string;
  name: string;
}

const page = () => {
  // dropdown toggles
  const [regionChevron, setRegionChevron] = useState(false);
  const [seasonsChevron, setSeasonsChevron] = useState(false);

  // selected states
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

  // dropdown options from backend
  const [regions, setRegions] = useState<Region[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);

  // Suggested packages
  const [suggestedPackages, setSuggestedPackages] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  // Fetch regions and seasons from backend
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // Fetch regions
        const regionsRes = await fetch(buildApiUrl('regions/'));
        if (regionsRes.ok) {
          const regionsData = await regionsRes.json();
          setRegions(regionsData.results || regionsData);
        }

        // Fetch seasons
        const seasonsRes = await fetch(buildApiUrl('seasons/'));
        if (seasonsRes.ok) {
          const seasonsData = await seasonsRes.json();
          setSeasons(seasonsData.results || seasonsData);
        }
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  // Fetch suggested/popular packages
  useEffect(() => {
    const fetchSuggestedPackages = async () => {
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
        setSuggestedPackages(formatted || []);
      } catch (err) {
        console.error("Error fetching suggested packages:", err);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchSuggestedPackages();
  }, []);

  // Scroll to filters after region is preselected
useEffect(() => {
  const savedFilters = sessionStorage.getItem("preselectedFilters");

  if (!savedFilters) return; // nothing saved

  const { regionName } = JSON.parse(savedFilters);

  if (!regionName) return;

  // Wait until regions are loaded
  if (regions.length === 0) return;

  // Try to find region from backend OR use fallback
  const matchedRegion =
    regions.find(
      (r) => r.name.toLowerCase() === regionName.toLowerCase()
    ) || { id: regionName, name: regionName }; // fallback for titles like "Bali", "India"

  setSelectedRegion(matchedRegion);

  // Cleanup saved filter
  sessionStorage.removeItem("preselectedFilters");

  // Smooth scroll
  setTimeout(() => {
    const filterSection = document.getElementById("destination-filters");
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 600);
}, [regions]);


  // toggle functions
  const handleRegionChevronOpen = () => {
    setRegionChevron(!regionChevron);
    setSeasonsChevron(false);
  }

  const handleSeasonsChevronOpen = () => {
    setSeasonsChevron(!seasonsChevron);
    setRegionChevron(false);
  }

  // handle selection
  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setRegionChevron(false);
  }

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
    setSeasonsChevron(false);
  }

  // Clear filters
  const clearRegion = () => {
    setSelectedRegion(null);
  }

  const clearSeason = () => {
    setSelectedSeason(null);
  }

  return (
    <div>

      <Hero />

      <div className='w-full flex justify-center items-center px-4'>
        <div className='max-w-[748px] w-full mt-[72px] sm:mt-32'>
          {/* Desktop */}
          <div className='w-full px-12 hidden sm:block'>
            <p className='text-[#6C3B3F] text-[24px] font-light italic font-noto-serif text-center leading-normal'>We’ve spent years on the ground, building trusted connections and curating one-of-a-kind experiences - so you don’t have to.
            </p>
            <p className='text-[#6C3B3F] text-[24px] font-light italic font-noto-serif text-center leading-normal'>Every journey is designed by us, with insight, care, and an instinct
              for what feels personal and truly unforgettable.
            </p>
          </div>
          {/* Mobile */}
          <div className='max-w-[375px w-[100%] sm:hidden'>
            <p className='text-[#6C3B3F] text-[16px] font-light italic font-noto-serif text-start leading-normal'>We’ve spent years on the ground, building trusted connections and curating one-of-a-kind experiences - so you don’t have to. Every journey is designed by us, with insight, care, and an instinct
              for what feels personal and truly unforgettable.</p>
          </div>
          <p className='text-[#6C3B3F] text-[16px] sm:text-[24px] font-light italic font-noto-serif text-start  sm:text-center leading-normal mt-[40px] w-[250px] sm:w-full'>Here are a few regions we know intimately, and love designing around: </p>
        </div>
      </div>

      {/* Filters */}
      <div
        id="destination-filters"
        className='w-full flex flex-col sm:flex-row justify-center items-center gap-x-6 mt-[100px] sm:mt-[200px] px-4 gap-y-6 relative'>
        {/* Region */}
        <div className='relative w-full sm:w-[250px]'>
          <div
            onClick={handleRegionChevronOpen}
            className={`cursor-pointer flex flex-row justify-between items-center text-base md:text-[18px] lg:text-[20px] font-host-grotesk w-full h-[50px] border border-[#312E29] py-2 px-4 rounded-full transition-all duration-200
              ${selectedRegion ? 'bg-[#312E29] text-white' : 'bg-transparent text-[#312E29]'}`}
          >
            <span>{selectedRegion ? selectedRegion.name : 'Region'}</span>
            <div className="flex items-center gap-2">
              {selectedRegion && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearRegion();
                  }}
                  className="text-white hover:text-gray-300 text-xl"
                >
                  ×
                </button>
              )}
              {regionChevron ? (
                <FiChevronUp className={`text-[20px] sm:text-[30px] ${selectedRegion ? 'text-white' : 'text-[#312E29]'}`} />
              ) : (
                <FiChevronDown className={`text-[20px] sm:text-[30px] ${selectedRegion ? 'text-white' : 'text-[#312E29]'}`} />
              )}
            </div>
          </div>

          {regionChevron && (
            <div className='absolute top-[60px] left-0 w-full bg-white border border-[#312E29] rounded-xl shadow-md z-10 max-h-[300px] overflow-y-auto'>
              {regions.map((region) => (
                <div
                  key={region.id}
                  onClick={() => handleRegionSelect(region)}
                  className='px-4 py-2 hover:font-medium transition-all duration-200 ease-in-out cursor-pointer text-[16px] font-host-grotesk hover:bg-gray-50'
                >
                  {region.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seasons */}
        <div className='relative w-full sm:w-[250px]'>
          <div
            onClick={handleSeasonsChevronOpen}
            className={`cursor-pointer flex flex-row justify-between items-center text-base md:text-[18px] lg:text-[20px] font-host-grotesk w-full h-[50px] border border-[#312E29] py-2 px-4 rounded-full transition-all duration-200
              ${selectedSeason ? 'bg-[#312E29] text-white' : 'bg-transparent text-[#312E29]'}`}
          >
            <span>{selectedSeason ? selectedSeason.name : 'Seasons'}</span>
            <div className="flex items-center gap-2">
              {selectedSeason && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSeason();
                  }}
                  className="text-white hover:text-gray-300 text-xl"
                >
                  ×
                </button>
              )}
              {seasonsChevron ? (
                <FiChevronUp className={`text-[20px] sm:text-[30px] ${selectedSeason ? 'text-white' : 'text-[#312E29]'}`} />
              ) : (
                <FiChevronDown className={`text-[20px] sm:text-[30px] ${selectedSeason ? 'text-white' : 'text-[#312E29]'}`} />
              )}
            </div>
          </div>

          {seasonsChevron && (
            <div className='absolute top-[60px] left-0 w-full bg-white border border-[#312E29] rounded-xl shadow-md z-10 max-h-[300px] overflow-y-auto'>
              {seasons.map((season) => (
                <div
                  key={season.id}
                  onClick={() => handleSeasonSelect(season)}
                  className='px-4 py-2 hover:font-medium transition-all duration-200 ease-in-out cursor-pointer text-[16px] font-host-grotesk hover:bg-gray-50'
                >
                  {season.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='mt-[51px] sm:mt-[124px] mb-[100px] sm:mb-[78px]'>
        {regions.length > 0 && (
          <DestinationGrid
            key={selectedRegion?.id || 'all'}
            regionId={selectedRegion?.id}
            seasonId={selectedSeason?.id}
            suggestedPackages={suggestedPackages}
            loadingPackages={loadingPackages}
          />
        )}
      </div>
    </div>
  )
}

export default page
