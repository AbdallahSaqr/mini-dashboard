import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <Card>
          <div className="card-inner text-center">
            {/* Error Code */}
            <div className="error-code">
              <span>4</span>
              <div className="zero-container">
                <div className="zero-inner">
                  <i className="bi bi-emoji-dizzy"></i>
                </div>
              </div>
              <span>4</span>
            </div>

            {/* Error Message */}
            <h1 className="error-title">Page Not Found</h1>
            <p className="error-description">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="error-actions">
              <button 
                className="btn-custom" 
                onClick={() => navigate(-1)}
              >
                <span className="btn-inner d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-arrow-left"></i>
                  Go Back
                </span>
              </button>
              <button 
                className="btn-custom" 
                onClick={() => navigate('/dashboard')}
              >
                <span className="btn-inner d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-house"></i>
                  Go Home
                </span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
