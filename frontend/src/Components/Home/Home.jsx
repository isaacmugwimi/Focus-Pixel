import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Portfolio from "./Portfolio/Portfolio";
import FadeInSection from "../Animations/FadeInSection";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import BannerCTA from "./BannerCTA/BannerCTA";
import Testimonial from "../Testimonials/Testimonial";
import ContactTeaser from "./ContactTeaser/ContactTeaser";
import HowItWorks from "./HowItWorks/HowItWorks";
import AboutTeaser from "./AboutTeaser/AboutTeaser";

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
        <HowItWorks />
      </FadeInSection>

      <FadeInSection>
        <WhyChooseUs />
      </FadeInSection>

      <FadeInSection>
        <Testimonial />
      </FadeInSection>

      <FadeInSection>
        <AboutTeaser />
      </FadeInSection>

      <FadeInSection>
        <ContactTeaser />
      </FadeInSection>
    </>
  );
};

export default Home;
