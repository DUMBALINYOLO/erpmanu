import React from 'react';
import Banner from '../../components/LandingPage/Banner';
import Feature from '../../components/LandingPage/Feature';
import Showcase from '../../components/LandingPage/Showcase';
import Testimonials from '../../components/LandingPage/Testimonials';
import Technology from '../../components/LandingPage/Technology';
import Pricing from '../../components/LandingPage/Pricing';
import Contact from '../../components/LandingPage/Contact';
import HelpSupport from '../HelpSupport';


class HomePage extends React.Component {
  render() {
    return (
      <div>
        <section id="banner">
          <Banner />
        </section>
        <section id="feature">
          <Feature />
        </section>
        <section id="showcase">
          <Showcase />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="tech">
          <Technology />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="faqs">
          <HelpSupport />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    );
  }
}

export default HomePage;