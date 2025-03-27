import React, { useState } from 'react';
import '../styles/PaymentForm.css';

const PaymentForm = ({ onSubmit }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paymentInfo.cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    }
    
    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Use format MM/YY';
    }
    
    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(paymentInfo);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardHolder">Card Holder Name</label>
        <input
          type="text"
          id="cardHolder"
          name="cardHolder"
          value={paymentInfo.cardHolder}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.cardHolder && <span className="error">{errors.cardHolder}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
        </div>
        
        <div className="form-group half">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
            placeholder="123"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
      </div>
      
      <button type="submit" className="payment-button">Complete Booking</button>
    </form>
  );
};

export default PaymentForm;