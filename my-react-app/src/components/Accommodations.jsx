import React, { useState } from 'react';
import { MapPin, Wifi, Car, Coffee, Star, Bath } from 'lucide-react';
import "../Styles/accomodation.css";
import sarova from "../assets/sarova.jpeg";
import apartment from "../assets/apartment.jpeg";
import spa from "../assets/spa.jpeg";
import villa from "../assets/villa.jpeg";

export default function Accommodation() {
  const [selectedType, setSelectedType] = useState('all');

  const accommodations = [
    {
      id: 1,
      type: 'hotel',
      name: 'Sarova Hotel',
      location: 'Nairobi',
      image: sarova,
      price:" KES 8500",
      rating: 4.8,
      reviews: 128,
      amenities: ['wifi', 'parking', 'breakfast', 'spa'],
    },
    {
      id: 2,
      type: 'apartment',
      name: 'City View Apartments',
      location: 'Champs-Élysées, Paris',
      image: apartment,
      price: "KES 15000",
      rating: 4.6,
      reviews: 84,
      amenities: ['wifi', 'parking', 'kitchen'],
    },
    {
      id: 3,
      type: 'resort',
      name: 'Beachfront Resort & Spa',
      location: 'Mombasa',
      image: spa,
      price: 'KES 20000',
      rating: 4.9,
      reviews: 256,
      amenities: ['wifi', 'parking', 'breakfast', 'spa', 'pool'],
    },
    {
      id: 4,
      type: 'villa',
      name: 'Luxury Villa Provence',
      location: 'Provence',
      image: villa,
      price: "KES 9400",
      rating: 4.9,
      reviews: 64,
      amenities: ['wifi', 'parking', 'pool', 'kitchen'],
    },
  ];

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi size={16} />;
      case 'parking':
        return <Car size={16} />;
      case 'breakfast':
        return <Coffee size={16} />;
      case 'spa':
        return <Bath size={16} />;
      default:
        return null;
    }
  };

  const filteredAccommodations = selectedType === 'all'
    ? accommodations
    : accommodations.filter(acc => acc.type === selectedType);

  return (
    <section className="accommodation-section">
      <div className="accommodation-header">
        <h2 className="accommodation-title">Where to Stay</h2>
        <p className="accommodation-subtitle">
          Find the perfect accommodation for your journey, from luxury hotels to cozy apartments
        </p>
      </div>

      <div className="accommodation-filters">
        {['all', 'hotel', 'apartment', 'resort', 'villa'].map(type => (
          <button
            key={type}
            className={`filter-tag ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="accommodation-grid">
        {filteredAccommodations.map(accommodation => (
          <div key={accommodation.id} className="accommodation-card">
            <img
              src={accommodation.image}
              alt={accommodation.name}
              className="accommodation-image"
            />
            <div className="accommodation-details">
              <div className="accommodation-type">{accommodation.type}</div>
              <h3 className="accommodation-name">{accommodation.name}</h3>
              <div className="accommodation-location">
                <MapPin size={16} />
                {accommodation.location}
              </div>
              
              <div className="amenities-list">
                {accommodation.amenities.slice(0, 3).map(amenity => (
                  <div key={amenity} className="amenity-item">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {accommodation.amenities.length > 3 && (
                  <div className="amenity-item">+{accommodation.amenities.length - 3}</div>
                )}
              </div>

              <div className="price-rating">
                <div className="price">
                  {accommodation.price} <span>/ night</span>
                </div>
                <div className="rating">
                  <Star size={16} fill="currentColor" />
                  {accommodation.rating}
                  <span>({accommodation.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}