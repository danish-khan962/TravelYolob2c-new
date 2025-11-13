'use client';
import React, { useState } from 'react';

interface RatingBarProps {
  rating?: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
}

const RatingBar: React.FC<RatingBarProps> = ({
  rating = 0,
  maxRating = 5,
  onRatingChange,
  readonly = false,
  size = 'md',
  className = '',
  showValue = false
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState<number>(rating);

  const sizes = {
    sm: 'w-3 h-3 sm:w-4 sm:h-4',
    md: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6',
    lg: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8'
  };

  const handleStarClick = (starIndex: number) => {
    if (readonly) return;
    
    const newRating = starIndex + 1;
    setCurrentRating(newRating);
    onRatingChange?.(newRating);
  };

  const handleStarHover = (starIndex: number) => {
    if (readonly) return;
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const getStarColor = (starIndex: number) => {
    const activeRating = hoverRating || currentRating;
    return starIndex < activeRating ? 'text-yellow-400' : 'text-gray-300';
  };

  return (
    <div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
      <div 
        className="flex items-center gap-0.5 sm:gap-1"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: maxRating }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`
              ${sizes[size]}
              ${getStarColor(index)}
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
              rounded-sm
            `}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            disabled={readonly}
            aria-label={`Rate ${index + 1} out of ${maxRating} stars`}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
      
      {showValue && (
        <span className="text-sm sm:text-base text-gray-600 ml-1 sm:ml-2 font-medium">
          {currentRating}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default RatingBar;