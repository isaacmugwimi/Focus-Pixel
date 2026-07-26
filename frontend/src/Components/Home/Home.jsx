import React from "react";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Portfolio from "./Portfolio/Portfolio";
import FadeInSection from "../Animations/FadeInSection";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import BannerCTA from "./BannerCTA/BannerCTA";
import Testimonial from "../Testimonials/Testimonial";
import Contact from "../Contact/Contact";

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
        <Testimonial />
      </FadeInSection>

      <FadeInSection>
        <BannerCTA />
      </FadeInSection>

      <FadeInSection>
        <Contact />
      </FadeInSection>
    </>
  );
};

export default Home;
