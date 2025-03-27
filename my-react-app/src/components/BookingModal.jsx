// BookingModal.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ isOpen, onClose, packageDetails }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    adults: 2,
    children: 0,
    addOns: [],
    totalPrice: packageDetails.basePrice
  });
  
  const navigate = useNavigate();
  
  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save booking data to state/context
      navigate('/checkout', { state: { bookingData, packageDetails } });
    }
  };
  
  // Render different steps based on current step value
  return (
    <div className={`booking-modal ${isOpen ? 'open' : ''}`}>
      <div className="booking-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        {step === 1 && (
          <div className="booking-dates">
            <h3>Select Your Dates</h3>
            <DatePicker
              selectsRange
              startDate={bookingData.startDate}
              endDate={bookingData.endDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setBookingData({...bookingData, startDate: start, endDate: end});
              }}
              minDate={new Date()}
            />
          </div>
        )}
        
        {step === 2 && (
          <div className="booking-travelers">
            <h3>Travelers</h3>
            <div className="traveler-selector">
              <label>Adults</label>
              <div className="quantity-selector">
                <button onClick={() => setBookingData({...bookingData, adults: Math.max(1, bookingData.adults - 1)})}>-</button>
                <span>{bookingData.adults}</span>
                <button onClick={() => setBookingData({...bookingData, adults: bookingData.adults + 1})}>+</button>
              </div>
            </div>
            
            <div className="traveler-selector">
              <label>Children</label>
              <div className="quantity-selector">
                <button onClick={() => setBookingData({...bookingData, children: Math.max(0, bookingData.children - 1)})}>-</button>
                <span>{bookingData.children}</span>
                <button onClick={() => setBookingData({...bookingData, children: bookingData.children + 1})}>+</button>
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <p><strong>Package:</strong> {packageDetails.title}</p>
              <p><strong>Dates:</strong> {bookingData.startDate.toLocaleDateString()} - {bookingData.endDate.toLocaleDateString()}</p>
              <p><strong>Travelers:</strong> {bookingData.adults} adults, {bookingData.children} children</p>
              <p><strong>Total:</strong> ${calculateTotal(bookingData, packageDetails)}</p>
            </div>
          </div>
        )}
        
        <div className="booking-actions">
          {step > 1 && <button className="back-button" onClick={() => setStep(step - 1)}>Back</button>}
          <button className="continue-button" onClick={handleContinue}>
            {step < 3 ? 'Continue' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate total
const calculateTotal = (bookingData, packageDetails) => {
  const duration = Math.ceil((bookingData.endDate - bookingData.startDate) / (1000 * 60 * 60 * 24));
  const adultPrice = packageDetails.basePrice * bookingData.adults * duration;
  const childrenPrice = packageDetails.childPrice * bookingData.children * duration;
  return adultPrice + childrenPrice;
};

export default BookingModal;