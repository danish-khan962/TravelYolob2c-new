'use client';

import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const Banner = () => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className='hidden sm:flex w-screen bg-[#FFFFFF] sticky top-0 z-50'>
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] py-3">
        <div className="flex items-center justify-between relative">

          {/* Logo */}
          <div className="hidden sm:block flex-shrink-0">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/new_logo_travelyollo.png"
                alt="TravelYollo Logo"
                width={260}
                height={42}
                className="w-[146px] h-[24px] sm:w-[200px] sm:h-[32px] md:w-[250px] md:h-[40px] lg:w-[250px] lg:h-[42px] xl:w-[292px] xl:h-[48px]"
                priority
              />
            </Link>
          </div>

          {/* Center Section: Call and Quote Info */}
          <div className="flex flex-wrap justify-start sm:justify-center items-center text-center gap-3 sm:gap-4 font-host-grotesk">
            <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-normal">
              Call us today until 6 pm
            </p>

            <div className="flex items-center gap-2 text-[12px] sm:text-[14px] lg:text-[18px] font-normal">
              <FaPhoneAlt />
              <Link href="tel:5619414991" className="hover:cursor-pointer hover:underline">
                +1 561-941-4991
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-[12px] sm:text-[14px] md:text-base lg:text-[18px] font-normal">Or</p>
              <Link href="/contact">
                <button className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-base font-normal text-white bg-[#312E29] py-2 px-4 sm:px-5 md:px-6 rounded-full hover:bg-opacity-90 transition-all duration-200">
                  Request a Quote
                </button>
              </Link>
            </div>
          </div>

          {/* <div className='flex flex-row justify-center items-center'>
             Login/User Menu 
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 text-base lg:text-[17px] 2xl:text-[20px] font-host-grotesk font-normal text-global-5 hover:text-header-1 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#6C3B3F] text-white flex items-center justify-center">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 pt-2 z-50">
                    <div className="w-48 bg-white rounded-lg shadow-xl border border-gray-300 py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                role="menuitem"
                className="
                  text-base lg:text-[17px] 2xl:text-[20px]
                  font-host-grotesk font-normal
                  leading-[22px] lg:leading-[27px]
                  text-white bg-[#171C28]
                  hover:bg-global-5 hover:bg-global-5/90
                  border border-transparent
                  rounded-[18px]
                  px-4 py-1 lg:px-[30px] lg:py-[4px]
                  transition-all duration-200 ease-in-out
                  hover:scale-105
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-global-5 focus:ring-opacity-50
                  ml-2
                "
              >
                Login
              </Link>
            )}
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Banner;
