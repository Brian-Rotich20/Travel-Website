import React from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import '../Styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", url: "/about" },
      { name: "Our Team", url: "/team" },
      { name: "Careers", url: "/careers" }
    ],
    support: [
      { name: "Help Center", url: "/help" },
      { name: "Safety Information", url: "/safety" },
      { name: "Booking Policy", url: "/policy" }
    ],
    legal: [
      { name: "Terms & Conditions", url: "/terms" },
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Cookie Policy", url: "/cookies" },
      { name: "Sitemap", url: "/sitemap" }
    ]
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, url: "https://facebook.com", name: "Facebook" },
    { icon: <Twitter size={20} />, url: "https://twitter.com", name: "Twitter" },
    { icon: <Instagram size={20} />, url: "https://instagram.com", name: "Instagram" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <Youtube size={20} />, url: "https://youtube.com", name: "YouTube" }
  ];

  const contactInfo2 = [
    { icon: <Phone size={20} />, text: "+254 720060728" },
    { icon: <Mail size={20} />, text: "contact@travelsite.com" },
    { icon: <MapPin size={20} />, text: "123 Travel Street, City, Country" }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="brand-name">TravelSite</h2>
            <p className="brand-description">
              Discover the world with us. Creating unforgettable travel experiences since 2010.
            </p>
            <div className="contact-info">
              {contactInfo2.map((item, index) => (
                <div key={index} className="contact-item">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h3>Company</h3>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h3>Support</h3>
              <ul>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h3>Legal</h3>
              <ul>
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-icon"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="footer-divider"></div>
          
          <div className="copyright">
            <p>&copy; {currentYear} TravelSite. All rights reserved.</p>
            <p className="newsletter-text">
              Subscribe to our newsletter for travel updates and exclusive offers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;