import React from 'react';
import Image from 'next/image';

interface ProcessStep {
    id: string;
    number: string;
    title: string;
    description: string;
    icon: string;
}

const processSteps: ProcessStep[] = [
    {
        id: '1',
        number: '1',
        title: 'Discover',
        description: 'We listen to your vision and dreams.',
        icon: '/images/Group.png'
    },
    {
        id: '2',
        number: '2',
        title: 'Design',
        description: 'Our experts build a journey around you.',
        icon: '/images/img_group_gray_400.svg'
    },
    {
        id: '3',
        number: '3',
        title: 'Prepare',
        description: 'Everything is managed, down to the last detail.',
        icon: '/images/img_group_gray_400_74x46.svg'
    },
    {
        id: '4',
        number: '4',
        title: 'Travel',
        description: '24/7 concierge support, always just a message away.',
        icon: '/images/img_group_gray_400_60x64.svg'
    },
    {
        id: '5',
        number: '5',
        title: 'Reflect',
        description: 'We connect post-journey to make your next one even better.',
        icon: '/images/img_group_gray_400_56x70.svg'
    }
];

const CuratedProcessSection: React.FC = () => {
    return (
        <section className="w-full bg-global-10 py-[60px] sm:py-[80px] lg:py-[120px]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col gap-6 sm:gap-8 lg:gap-16">
                    <h2 className="text-[30px] sm:text-[35px] lg:text-[40px] font-light italic leading-[40px] sm:leading-[45px] lg:leading-[55px] text-global-1 font-noto-serif text-start lg:text-left w-[80%]">
                        Curated. Seamless. Deeply Personal.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-6">
                        {processSteps.map((step) => (
                            <div
                                key={step.id}
                                className="flex flex-col sm:block justify-between items-start h-auto sm:h-[250px] rounded-lg p-4 sm:p-4 lg:p-6 relative border-2"
                                style={{ backgroundColor: '#F0ECDF' }}
                            >
                                <div className="flex sm:hidden justify-between items-center w-full">
                                    <div className="flex flex-col">
                                        <span className="text-[18px] font-light italic text-global-3 font-noto-serif">
                                            {step.number}. {step.title}
                                        </span>
                                        <p className="text-[14px] font-host-grotesk font-normal leading-relaxed text-global-2 mt-1">
                                            {step.description}
                                        </p>
                                    </div>
                                    <Image
                                        src={step.icon}
                                        alt={step.title}
                                        width={75}
                                        height={75}
                                        className="w-[50px] h-[50px] ml-2"
                                    />
                                </div>

                                {/* Icon positioned at top right */}
                                <div className="hidden sm:block absolute top-4 right-4 lg:top-6 lg:right-6">
                                    <Image
                                        src={step.icon}
                                        alt={step.title}
                                        width={48}
                                        height={48}
                                        className="w-8 h-8 lg:w-12 lg:h-12"
                                    />
                                </div>

                                {/* Content positioned at bottom with consistent alignment */}
                                <div className="hidden sm:flex flex-col justify-end items-start w-full h-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex flex-col">
                                            <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-light italic text-global-3 font-noto-serif leading-tight">
                                                {step.number}
                                            </span>
                                            <h3 className="text-[20px] sm:text-[24px] lg:text-[28px] font-light italic text-global-3 font-noto-serif leading-tight">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <div className="h-[60px] sm:h-[66px] lg:h-[72px] flex items-start">
                                            <p className="text-[12px] sm:text-[14px] lg:text-[16px] font-host-grotesk font-normal leading-relaxed text-global-2">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CuratedProcessSection;
