import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Validation patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!emailPattern.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!passwordPattern.test(value)) {
          return 'Password must be at least 8 characters and contain both letters and numbers with special characters';
        }
        return '';
      default:
        return '';
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setLoginError(result.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (type !== 'checkbox') {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card>
          <div className="card-inner">
            {/* Logo/Header */}
            <div className="text-center mb-4">
              <i className="bi bi-graph-up-arrow" style={{ fontSize: '3rem', background: 'linear-gradient(45deg, #14b8a6, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}></i>
              <h2 className="mt-3 mb-1">Welcome Back</h2>
              <p className="text-muted">Sign in to continue to Dashboard</p>
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="alert alert-danger mb-4">
                <i className="bi bi-exclamation-circle me-2"></i>
                {loginError}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
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

              <div className="form-group mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="password" className="form-label">Password</label>
                  <a href="#" className="text-sm text-primary text-decoration-none">Forgot password?</a>
                </div>
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
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <button 
                type="submit" 
                className="btn-custom w-100" 
                disabled={isLoading}
              >
                <span className="btn-inner d-flex align-items-center justify-content-center gap-2">
                  {isLoading ? (
                    <>
                      <i className="bi bi-arrow-repeat spin"></i>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right"></i>
                      Sign In
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="mb-0">
                Don't have an account? {' '}
                <button 
                  onClick={() => {
                    console.log('Navigating to register page...');
                    navigate('/register', { replace: true });
                  }} 
                  className="text-primary text-decoration-none bg-transparent border-0"
                  style={{ cursor: 'pointer' }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
