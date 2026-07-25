import React from "react";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Portfolio from "./Portfolio/Portfolio";
import FadeInSection from "../Animations/FadeInSection";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import CTABanner from "./CTABanner/CTABanner";

const Home = () => {
  return (
    <>
      <Hero />

      <FadeInSection>
        <Services />
      </FadeInSection>

      <FadeInSection>
        <Portfolio />
      </FadeInSection>

      <FadeInSection>
        <WhyChooseUs />
      </FadeInSection>
      <FadeInSection>
        <CTABanner />
      </FadeInSection>
    </>
  );
};

export default Home;
