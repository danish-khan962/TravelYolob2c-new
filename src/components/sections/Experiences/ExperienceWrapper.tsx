import React, { forwardRef } from "react";
import ExperienceDesktop, { ExperienceDesktopHandle } from "./ExperienceDesktop"; // desktop swiper component
import ExperienceMobile from "./ExperienceMobile"; // mobile swiper component

const ExperienceWrapper = forwardRef<ExperienceDesktopHandle, any>((props, ref) => {
  return (
    <>
      <ExperienceMobile
        applySigTransforms={() => { }}
        scheduleSigTransforms={() => { }}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => { }}
      />

      <ExperienceDesktop
        ref={ref}
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />
    </>
  );
});

export default ExperienceWrapper;
