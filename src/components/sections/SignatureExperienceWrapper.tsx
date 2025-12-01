import React, { forwardRef } from "react";
import SignatureExperiencesSection, {
  SignatureExperiencesSectionHandle,
} from "./SignatureExperiencesSection"; // desktop swiper component
import MobileExperienceCarousel from "./MobileExperienceCarousel"; // mobile swiper component

const SignatureExperiencesWrapper = forwardRef<
  SignatureExperiencesSectionHandle,
  any
>((props, ref) => {
  return (
    <>
      <MobileExperienceCarousel
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />

      <SignatureExperiencesSection
        ref={ref}
        applySigTransforms={() => {}}
        scheduleSigTransforms={() => {}}
        sigCarouselRef={React.createRef()}
        scrollSigCarousel={() => {}}
      />
    </>
  );
});

export default SignatureExperiencesWrapper;
