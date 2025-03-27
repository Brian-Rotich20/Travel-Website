// CheckoutPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, packageDetails } = location.state || {};
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({...personalInfo, [name]: value});
  };
  
  const handleSubmit = async (paymentInfo) => {
    try {
      // Create booking in database
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          packageId: packageDetails.id,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          travelers: {
            adults: bookingData.adults,
            children: bookingData.children
          },
          personalInfo,
          paymentInfo: {
            ...paymentInfo,
            amount: calculateTotal(bookingData, packageDetails)
          }
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        navigate('/booking-confirmation', { state: { bookingId: data.bookingId } });
      }
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle error state
    }
  };
  
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-summary">
          <h2>Booking Summary</h2>
          <div className="summary-details">
            <p><strong>Package:</strong> {packageDetails?.title}</p>
            <p><strong>Dates:</strong> {bookingData?.startDate.toLocaleDateString()} - {bookingData?.endDate.toLocaleDateString()}</p>
            <p><strong>Travelers:</strong> {bookingData?.adults} adults, {bookingData?.children} children</p>
            <p><strong>Total:</strong> ${calculateTotal(bookingData, packageDetails)}</p>
          </div>
        </div>
        
        <div className="checkout-form">
          <h2>Personal Information</h2>
          <div className="form-group">
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          {/* Add other personal info fields */}
          
          <h2>Payment Information</h2>
          <PaymentForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;