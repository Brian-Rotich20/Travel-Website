import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Facebook, Chrome } from 'lucide-react';
import "../Styles/auth.css";

export const LoginPage = () => {
  return <AuthPage mode="login" />;
};

export const SignupPage = () => {
  return <AuthPage mode="signup" />;
};

const AuthPage = ({ mode = 'login' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add your authentication logic here
      // await authService.login(formData);
      console.log('Form submitted:', formData);
    } catch (error) {
      setErrors({
        submit: 'Authentication failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Add social login logic here
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login' ? (
              <>
                New to TravelSite?{' '}
                <Link to="/signup" className="auth-link">
                  Sign up for free
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Login here
                </Link>
              </>
            )}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {mode === 'login' && (
            <div className="remember-forgot">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="remember"
                  className="checkbox-input"
                />
                <label htmlFor="remember" className="form-label">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>
          )}

          {errors.submit && <span className="error-message">{errors.submit}</span>}

          <button
            type="submit"
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        <div className="social-divider">
          <div className="divider-line" />
          <span className="divider-text">Or continue with</span>
          <div className="divider-line" />
        </div>

        <div className="social-buttons">
          <button
            type="button"
            className="social-button"
            onClick={() => handleSocialLogin('google')}
          >
            <Chrome size={20} /> Google
          </button>
          <button
            type="button"
            className="social-button"
            onClick={() => handleSocialLogin('facebook')}
          >
            <Facebook size={20} /> Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;