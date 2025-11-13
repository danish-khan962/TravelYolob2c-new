import React from "react";
import SignatureExperiencesSection from "./SignatureExperiencesSection"; // desktop swiper component
import MobileExperienceCarousel from "./MobileExperienceCarousel"; // mobile swiper component

const SignatureExperiencesWrapper = () => {
  return (
    <>
      <MobileExperienceCarousel
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />

      <SignatureExperiencesSection
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />
    </>
  );
};

export default SignatureExperiencesWrapper;
