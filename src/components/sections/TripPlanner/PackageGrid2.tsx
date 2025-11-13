'use client';

import React from 'react';
import PackageCard from './PackageCard';

type Destination = {
  title: string;
  duration: string;
  image: string;
  slug:string;
};

type Props = {
  destinations: Destination[];
};

const PackageGrid2: React.FC<Props> = ({ destinations }) => {
  return (
    <div className="max-w-[1400px] w-full mx-auto">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 justify-items-center">
        {destinations.map((dest, index) => {
          const formattedTitle = dest.title.split('||').map((part, i) => (
            <span key={i}>
              {part.trim()}
              {i < dest.title.split('||').length - 1 && <br />}
            </span>
          ));

          return (
            <div key={index} className="w-full">
              <PackageCard
                slug={dest.slug}
                title={formattedTitle}
                duration={dest.duration}
                image={dest.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageGrid2;
