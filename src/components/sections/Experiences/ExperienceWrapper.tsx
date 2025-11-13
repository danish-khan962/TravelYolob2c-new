import React from "react";
import ExperienceDesktop from "./ExperienceDesktop"; // desktop swiper component
import ExperienceMobile from "./ExperienceMobile"; // mobile swiper component

const ExperienceWrapper = () => {
  return (
    <>
      <ExperienceMobile
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />

      <ExperienceDesktop
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />
    </>
  );
};

export default ExperienceWrapper;
