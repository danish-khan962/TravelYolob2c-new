import React from 'react';

interface SectionLayoutProps {
    title?: string;
    subtitle?: string;
    titlePosition?: 'left' | 'center';
    titleMargin?: string;
    subtitleWidth?: string;
    subtitleMargin?: string;
    containerPadding?: string;
    containerMaxWidth?: string;
    spacing?: string;
    // New: standard vertical padding around the children/content area
    contentSpacing?: string;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
    title,
    subtitle,
    titlePosition = 'left',
    titleMargin = 'ml-[90px] sm:ml-[126px] lg:ml-[180px]',
    subtitleWidth = 'w-full sm:w-[50%] lg:w-[30%]',
    subtitleMargin = 'ml-[90px] sm:ml-[126px] lg:ml-[180px]',
    containerPadding = 'px-4 sm:px-6 lg:px-8',
    containerMaxWidth = 'max-w-[1440px]',
    // Compact spacing for title/subtitle area
    spacing = 'pt-6 pb-2 sm:pt-8 sm:pb-3 lg:pt-10 lg:pb-4',
    // Standardized spacing for content area
    contentSpacing = 'py-8 sm:py-10 lg:py-12',
    children,
    className = '',
    id
}) => {
    const titleClasses = titlePosition === 'center'
        ? 'text-center mx-auto'
        : titleMargin;

    return (
        <div className={`w-full ${className}`} id={id}>
            {/* Title and Subtitle Section */}
            {(title || subtitle) && (
                <section className={`w-full ${spacing}`}>
                    <div className={`w-full ${containerMaxWidth} mx-auto ${containerPadding}`}>
                        {title && (
                            <h2
                                className={`text-[24px] sm:text-[32px] lg:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] text-global-1 font-noto-serif ${titleClasses}`}
                            >
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p
                                className={`text-[13px] sm:text-[16px] lg:text-[18px] font-host-grotesk font-light leading-[18px] sm:leading-[21px] lg:leading-[25px] text-global-2 ${subtitleWidth} ${subtitleMargin} ${title ? 'mt-2 sm:mt-4 lg:mt-4' : ''}`}
                            >
                                {subtitle}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Content Section - Edge-to-edge for children with standard spacing */}
            <section className={`w-full ${contentSpacing}`}>
                {children}
            </section>
        </div>
    );
};

export default SectionLayout;
