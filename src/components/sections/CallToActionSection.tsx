import React from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const CallToActionSection: React.FC = () => {
    return (
        <section className="w-full pt-[80px] sm:pt-[100px] lg:pt-[120px] pb-[40px] sm:pb-[50px] lg:pb-[60px]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center">
                    <h2
                        className="text-[30px] sm:text-[35px] lg:text-[40px] font-light italic leading-[35px] sm:leading-[38px] lg:leading-[48px] font-noto-serif mb-8 sm:mb-12 lg:mb-16 capitalize"
                        style={{ color: '#6C3B3F' }}
                    >
                        Let Us Craft Something Beautiful Together
                    </h2>
                    <div className="inline-flex items-center rounded-full bg-global-13 border border-global-2 px-6 mt-[27px] shadow-md transition-all duration-200">
                        <Link href={"/contact"}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="bg-transparent text-global-5 font-host-grotesk font-normal text-[16px] px-14 sm:px-3 py-0 h-auto min-w-0 focus:outline-none focus:ring-2 focus:ring-global-2 rounded-full"
                                aria-label="Book a Discovery Call outline-none border-none"
                                // Prevent any hover state by not using hover classes
                                // and ensuring the button background/text never changes on hover
                                style={{ backgroundColor: 'transparent', color: 'var(--global-text-5)' }}
                            >
                                Book a Discovery Call
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
