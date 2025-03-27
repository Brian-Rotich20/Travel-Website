import { useEffect, useState } from 'react';
import image1 from "../assets/image1.jpg";
import maasaimara from "../assets/maasamara2.jpeg";
import LakeNai from "../assets/Lake_Naivasha.jpeg";
import amboseli from "../assets/AmboseliNational.jpeg";
import nairobi from "../assets/nairobi.jpeg";
import samburu from "../assets/samburu.jpeg";
import mombasa from "../assets/mombasa2.jpeg";

import Accommodation from "../components/Accommodations.jsx";
import WhyUs from "../components/WhyUs.jsx";
import "../Styles/home.css";
import { MapPin, Wifi, Car, Coffee, Star, Bath } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const API_KEY = "05cceb5a5f2a49ed8007751ae2b608eb";

  // Fetch places with autocomplete
  const fetchPlaces = async (query) => {
    if (!query.trim()) {
      setPlaces([]);
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.geoapify.com/v2/places?` + 
        new URLSearchParams({
          categories: 'tourism,accommodation,entertainment,leisure,natural,national_park',
          filter: 'rect:33.9098987,-4.7682,41.899578,5.506', // Bounding box for Kenya
          bias: 'proximity:36.8219,-1.2921', // Bias results towards Nairobi
          text: query,
          lang: 'en',
          limit: '10',
          apiKey: API_KEY
        })
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Process and format the suggestions
      const newSuggestions = data.features.map(feature => ({
        id: feature.properties.place_id,
        name: feature.properties.name,
        formatted: feature.properties.formatted,
        category: feature.properties.category,
        // Extract additional details if available
        details: {
          rating: feature.properties.rating,
          address: feature.properties.address_line1,
          type: feature.properties.tourism || feature.properties.leisure
        }
      }));

      setSuggestions(newSuggestions);
      setPlaces(data.features);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle selection from suggestions
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]); // Clear suggestions after selection
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        fetchPlaces(searchQuery);
      }
    }, 300); // Reduced debounce time for better responsiveness

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const destinations = [
    { id: 1, name: 'Masaai Mara', image: maasaimara, description: 'A top safari destination in Western Kenya.' },
    { id: 2, name: 'Lake Naivasha', image: LakeNai, description: 'Beautiful freshwater lake in the Great Rift Valley.' },
    { id: 3, name: 'Amboseli', image: amboseli, description: 'Famous for large elephant herds and views of Mount Kilimanjaro.' },
    { id: 4, name: 'Nairobi', image: nairobi, description: 'The vibrant capital city of Kenya.' },
    { id: 5, name: 'Samburu', image: samburu, description: 'The ultimate luxury safari lodge in northern Kenya.' },
    { id: 6, name: 'Mombasa', image: mombasa, description: 'Experience luxury in the beach.' },
  ];

  const scrollLeft = () => {
    const container = document.querySelector('.destination-grid');
    container?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = document.querySelector('.destination-grid');
    container?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <img src={image1} alt='Travel Destination' />
        </div>
        <div className="overlay">
          <h1>Discover Kenya</h1>
          <p>Find your next adventure here in Kenya</p>
          <div className="search-container">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search for destinations, parks, hotels..." 
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isLoading && <div className="loading-spinner"></div>}
            </div>
            
            {suggestions.length > 0 && (
              <div className="search-results">
                {suggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id} 
                    className="search-result-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <h3>{suggestion.name}</h3>
                    <div className="result-details">
                      <div className="location">
                        <MapPin className="icon" />
                        <p>{suggestion.formatted}</p>
                      </div>
                      {suggestion.details.type && (
                        <span className="type-badge">
                          {suggestion.details.type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {searchQuery && suggestions.length === 0 && !isLoading && (
              <div className="no-results">
                <p>No places found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="top-destinations">
        <h2 className="section-title">Top Destinations</h2>
        <div className="destination-container">
          <button className="scroll-button left" onClick={scrollLeft}>❮</button>
          <div className="destination-grid">
            {destinations.map((destination) => (
              <div key={destination.id} className="destination-card">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="destination-image"
                />
                <div className="destination-info">
                  <h3 className="destination-title">{destination.name}</h3>
                  <p className="destination-description">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>❯</button>
        </div>
      </section>
      <WhyUs/>
      <Accommodation />
    </div>
  );
}