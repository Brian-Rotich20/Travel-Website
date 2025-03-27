import { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import "../Styles/navbar.css";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isContactOpen) setIsContactOpen(false);
    };

    const toggleContact = () => {
        setIsContactOpen(!isContactOpen);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    return (
        <header className="header">
            {/* Top bar with quick contacts */}
            <div className="top-bar">
                <div className="contact-info2">
                    <a href="tel:+1234567890"><Phone size={16} /> +254720060728</a>
                    <a href="mailto:info@travelsite.com"><Mail size={16} /> info@travelsite.com</a>
                    <span><MapPin size={16} /> 123 Travel Street, City</span>
                </div>
                <div className="social-links1">
                    <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
                    <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
                    <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
                </div>
            </div>

            {/* Main navbar */}
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <h1>TravelSite</h1>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/destinations">Destinations</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li className='auth-buttons'>
                        <div className='button-group'>
                             <Link to="/login">Login</Link>
                             <Link to="/signup">Sign Up</Link>      
                        </div>

                    </li>
                    <li className="book-now"><Link to="/booking">Book Now</Link></li>
                </ul>

                {/* Mobile Menu Button */}
                <button className="menu-button" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
        </header>
    );
};

export default Navbar;