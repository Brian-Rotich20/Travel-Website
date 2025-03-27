import React from 'react';
import { Shield, Clock, Award, Users, Globe, Headphones } from 'lucide-react';
import "../Styles/whyus.css";

const features = [
  {
    icon: <Shield />,
    title: "Secure Booking",
    description: "Your journey begins with peace of mind. Our bank-level encryption and secure payment systems ensure your personal information remains protected at every step.",
    highlight: "100% Secure Transactions"
  },
  {
    icon: <Clock />,
    title: "24/7 Support",
    description: "Travel with confidence knowing our expert support team is just a message away, any time of day or night. We're here when you need us most.",
    highlight: "Always Available"
  },
  {
    icon: <Award />,
    title: "Best Price Guarantee",
    description: "Experience luxury without compromise. Our price match promise ensures you get exceptional value, backed by our unbeatable guarantee.",
    highlight: "Value Assured"
  },
  {
    icon: <Users />,
    title: "Local Expertise",
    description: "Step into authenticity with our network of local experts. Unlock hidden gems and create memories that go beyond the tourist trail.",
    highlight: "Authentic Experiences"
  },
  {
    icon: <Globe />,
    title: "Global Network",
    description: "From bustling cities to remote hideaways, our worldwide network of partners ensures seamless travel experiences across all continents.",
    highlight: "Worldwide Coverage"
  },
  {
    icon: <Headphones />,
    title: "Personalized Service",
    description: "Your dreams, your way. Our travel consultants craft bespoke journeys that reflect your unique style, preferences, and aspirations.",
    highlight: "Tailored For You"
  }
];

const FeatureCard = ({ icon, title, description, highlight }) => (
  <div className="feature-card">
    <div className="feature-icon">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="feature-content">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      <span className="feature-highlight">{highlight}</span>
    </div>
  </div>
);

export default function WhyUs() {
  return (
    <section className="why-us">
      <div className="why-us-container">
        <div className="why-us-header">
          <span className="why-us-overline">Experience Excellence</span>
          <h2 className="why-us-title">Why Choose Our Travel Expertise</h2>
          <p className="why-us-subtitle">
            Join thousands of satisfied travelers who trust us to transform their travel dreams into reality. 
            Our commitment to excellence, personalized service, and innovative solutions ensures every journey 
            becomes an unforgettable story.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}