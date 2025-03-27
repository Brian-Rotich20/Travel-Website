import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import '../styles/BookingConfirmationPage.css';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const bookingId = location.state?.bookingId;
  
  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID found');
      setLoading(false);
      return;
    }
    
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        const data = await response.json();
        
        if (data.success) {
          setBookingDetails(data.booking);
        } else {
          setError(data.message || 'Failed to fetch booking details');
        }
      } catch (err) {
        setError('Network error, please try again');
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [bookingId]);
  
  if (loading) {
    return (
      <div className="confirmation-loading">
        <div className="loader"></div>
        <p>Loading your booking confirmation...</p>
      </div>
    );
  }
  
  if (error || !bookingDetails) {
    return (
      <div className="confirmation-error">
        <h2>Something went wrong</h2>
        <p>{error || 'Unable to find booking information'}</p>
        <Link to="/account/bookings" className="view-bookings-button">
          View My Bookings
        </Link>
      </div>
    );
  }
  
  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="confirmation-icon">
            <Check size={40} />
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Your trip to {bookingDetails.packageDetails.destination} has been booked successfully</p>
        </div>
        
        <div className="confirmation-details">
          <div className="confirmation-section">
            <h3>Booking Reference</h3>
            <p className="booking-number">{bookingDetails.bookingNumber}</p>
          </div>
          
          <div className="confirmation-section">
            <h3>Trip Details</h3>
            <p><strong>Package:</strong> {bookingDetails.packageDetails.title}</p>
            <p><strong>Dates:</strong> {new Date(bookingDetails.startDate).toLocaleDateString()} - {new Date(bookingDetails.endDate).toLocaleDateString()}</p>
            <p><strong>Travelers:</strong> {bookingDetails.travelers.adults} adults, {bookingDetails.travelers.children} children</p>
          </div>
          
          <div className="confirmation-section">
            <h3>Contact Information</h3>
            <p><strong>Name:</strong> {bookingDetails.personalInfo.firstName} {bookingDetails.personalInfo.lastName}</p>
            <p><strong>Email:</strong> {bookingDetails.personalInfo.email}</p>
            <p><strong>Phone:</strong> {bookingDetails.personalInfo.phone}</p>
          </div>
          
          <div className="confirmation-section payment-section">
            <h3>Payment</h3>
            <p><strong>Total Amount:</strong> ${bookingDetails.totalAmount}</p>
            <p><strong>Status:</strong> <span className="status-paid">Paid</span></p>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/account/bookings" className="view-bookings-button">
            View My Bookings
          </Link>
          <button className="download-button">
            Download Confirmation
          </button>
        </div>
        
        <div className="confirmation-help">
          <p>Need help with your booking? <a href="/contact">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;