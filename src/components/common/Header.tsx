'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export interface HeaderProps {
  className?: string;
}

interface MenuItem {
  readonly label: string;
  readonly href: string;
  readonly active?: boolean;
}

export function Header({ className = '' }: HeaderProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const travelCategories = [
    { id: '1', title: 'Romantic Escapes' },
    { id: '2', title: 'Family Getaways' },
    { id: '3', title: 'Cultural Soujourns' },
    { id: '4', title: 'Scenic Escapes' },
    { id: '5', title: 'Wildlife Encounters' }
  ];

  const menuItems: readonly MenuItem[] = [
    { label: 'Home', href: '/', active: pathname === '/' },
    { label: 'Destinations', href: '/destinations', active: pathname === '/destinations' },
    { label: 'Experiences', href: '/experiences', active: pathname === '/experiences' },
    { label: 'Trip Planner', href: '/trip-planner', active: pathname === '/trip-planner' },
    { label: 'Blog', href: '/blog', active: pathname === '/blog' },
    { label: 'Contact Us', href: '/contact', active: pathname === '/contact' }
  ] as const;

  const slugify = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <header className={`sticky z-[999] top-0 sm:top-14 md:top-[70px] w-full bg-header-1 ${className}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between sm:justify-center items-center py-4 sm:py-6 gap-2">
          {/* Logo */}
          <div className="block sm:hidden flex-shrink-0">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/img_layer_3.svg"
                alt="TravelYollo Logo"
                width={260}
                height={42}
                className="w-[146px] h-[24px] sm:w-[200px] sm:h-[32px] md:w-[250px] md:h-[40px] lg:w-[250px] lg:h-[42px] xl:w-[292px] xl:h-[48px]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden sm:flex" aria-label="Main navigation">
            <div className="flex items-center justify-center gap-6 lg:gap-4 xl:gap-8">
              {menuItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-base lg:text-[17px] 2xl:text-[20px]
                    font-host-grotesk font-normal
                    leading-[22px] lg:leading-[27px]
                    transition-all duration-200 ease-in-out
                    hover:scale-105 active:scale-95
                    rounded-sm px-2 py-1
                    ${item.active ? 'text-header-1' : 'text-global-5'}
                    hover:text-header-1
                  `}
                  aria-current={item.active ? 'page' : undefined}
                  tabIndex={0}
                >
                  {item.label}
                </Link>
              ))}

              {/* Experiences Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  type="button"
                  className={`
                    text-base lg:text-[17px] 2xl:text-[20px]
                    font-host-grotesk font-normal
                    leading-[22px] lg:leading-[27px]
                    transition-all duration-200 ease-in-out
                    hover:scale-105 active:scale-95
                    rounded-sm px-2 py-1
                    ${pathname === '/experiences' ? 'text-header-1' : 'text-global-5'}
                    hover:text-header-1
                    flex items-center gap-1
                  `}
                >
                  Experiences
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {categoriesOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-56 bg-white rounded-lg shadow-xl border border-gray-300 py-2">
                      {travelCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => {
                            setCategoriesOpen(false);
                            router.push(`/experiences/${slugify(category.title)}`);
                          }}
                          className="block w-full text-left px-4 py-2 text-base font-host-grotesk text-[#312E29] hover:bg-gray-100 hover:text-[#6C3B3F] transition-colors"
                          tabIndex={0}
                        >
                          {category.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {menuItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-base lg:text-[17px] 2xl:text-[20px]
                    font-host-grotesk font-normal
                    leading-[22px] lg:leading-[27px]
                    transition-all duration-200 ease-in-out
                    hover:scale-105 active:scale-95
                    rounded-sm px-2 py-1
                    ${item.active ? 'text-header-1' : 'text-global-5'}
                    hover:text-header-1
                  `}
                  aria-current={item.active ? 'page' : undefined}
                  tabIndex={0}
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </nav>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="flex sm:hidden p-2 relative z-50"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <svg
              className={`w-6 h-6 text-global-5 transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav
          id="mobile-menu"
          className={`${menuOpen ? 'block' : 'hidden'} mdx:hidden absolute top-full left-0 right-0 w-full bg-header-1 shadow-lg border-t border-global-5/10 z-40`}
          aria-label="Mobile navigation"
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col items-start gap-4">
              {menuItems.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    w-full text-left text-base sm:text-lg
                    font-host-grotesk font-normal
                    leading-[22px] sm:leading-[24px]
                    transition-all duration-200 ease-in-out
                    hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-header-text1 focus:ring-opacity-50
                    rounded-sm px-3 py-2
                    ${item.active ? 'text-header-1 bg-global-5/5' : 'text-global-5'}
                    hover:text-header-1 hover:bg-global-5/5
                  `}
                  aria-current={item.active ? 'page' : undefined}
                  tabIndex={0}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Experiences Dropdown */}
              <div className="w-full">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="w-full text-left text-base sm:text-lg font-host-grotesk font-normal leading-[22px] sm:leading-[24px] transition-all duration-200 ease-in-out rounded-sm px-3 py-2 text-global-5 hover:text-header-1 hover:bg-global-5/5 flex items-center justify-between"
                >
                  Experiences
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {categoriesOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {travelCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          setCategoriesOpen(false);
                          router.push(`/experiences/${slugify(category.title)}`);
                        }}
                        className="text-base font-host-grotesk text-global-5 hover:text-header-1 px-3 py-2 rounded-sm hover:bg-global-5/5 transition-colors text-left w-full"
                        tabIndex={0}
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {menuItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    w-full text-left text-base sm:text-lg
                    font-host-grotesk font-normal
                    leading-[22px] sm:leading-[24px]
                    transition-all duration-200 ease-in-out
                    hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-header-text1 focus:ring-opacity-50
                    rounded-sm px-3 py-2
                    ${item.active ? 'text-header-1 bg-global-5/5' : 'text-global-5'}
                    hover:text-header-1 hover:bg-global-5/5
                  `}
                  aria-current={item.active ? 'page' : undefined}
                  tabIndex={0}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
