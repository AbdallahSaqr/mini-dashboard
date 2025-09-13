import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Validation patterns
  const namePattern = /^[a-zA-Z\s]{2,50}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required';
        if (!namePattern.test(value)) return 'Please enter a valid name (2-50 characters, letters only)';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!emailPattern.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!passwordPattern.test(value)) {
          return 'Password must be at least 8 characters and contain both letters and numbers';
        }
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== allValues.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsLoading(true);
    setRegisterError('');

    try {
      const result = await register(formData);
      if (result.success) {
        setRegisterSuccess(result.message);
        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setRegisterError(result.error);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setRegisterError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card>
          <div className="card-inner">
            {/* Logo/Header */}
            <div className="text-center mb-4">
              <i className="bi bi-person-plus" style={{ 
                fontSize: '3rem', 
                background: 'linear-gradient(45deg, #14b8a6, #2563eb)', 
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}></i>
              <h2 className="mt-3 mb-1">Create Account</h2>
              <p className="text-muted">Sign up to get started</p>
            </div>

            {/* Register Messages */}
            {registerError && (
              <div className="alert alert-danger mb-4">
                <i className="bi bi-exclamation-circle me-2"></i>
                {registerError}
              </div>
            )}
            {registerSuccess && (
              <div className="alert alert-success mb-4">
                <i className="bi bi-check-circle me-2"></i>
                {registerSuccess}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <div className="invalid-feedback d-block mt-1">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <div className="invalid-feedback d-block mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-group mb-4">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-check"></i>
                  </span>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-custom w-100" 
                disabled={isLoading}
              >
                <span className="btn-inner d-flex align-items-center justify-content-center gap-2">
                  {isLoading ? (
                    <>
                      <i className="bi bi-arrow-repeat spin"></i>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus"></i>
                      Create Account
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-4">
              <p className="mb-0">
                Already have an account? {' '}
                <button 
                  onClick={() => navigate('/')} 
                  className="text-primary text-decoration-none bg-transparent border-0"
                  style={{ cursor: 'pointer' }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
