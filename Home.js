import React, { useState, useRef } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/40');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div>
      {/* 🔹 Navbar */}
      <div className="navbar">
        <div className="logo-text">💰Budget Optimizer</div>
        <div className="nav-actions">
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/SignupPage')}>Signup</Button>
          
          {/* Profile image trigger */}
          <img
            src={profileImage}
            alt="Profile"
            className="profile-icon"
            onClick={() => fileInputRef.current.click()}
          />
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* 🔹 Page Content */}
      <div className="home-container">
        <header className="header">
          <h1> </h1>
          <p className="title">💰 Budget Optimizer</p>
          <p className="description">
            Your AI-powered financial planner to track, predict, and optimize your budgets.
          </p>
        </header>

        <main className="main-content">
          <section className="card add-expense">
            <h2>💡 Add Expense</h2>
            <p>Analyze your Monthly expenses quickly and easily</p>
            <Button
              variant="contained"
              className="action-button"
              onClick={() => navigate('/add-expenses')}
            >
              Analyze Your Expenses
            </Button>
          </section>

          <section className="card view-insights">
            <h2>📊 View Insights</h2>
            <p>AI-driven analysis of your spending habits and smart tips to save more.</p>
            <Button
              variant="contained"
              className="action-button"
              onClick={() => navigate('/dashboard')}
            >
              Show Dashboard
            </Button>
          </section>

          <section className="card forecast-spending">
            <h2>📈 Forecast Spending</h2>
            <p>Predict your next month’s expenses using intelligent ML models.</p>
            <Button
              variant="contained"
              className="action-button"
              onClick={() => navigate('/predict')}
            >
              Predict Now
            </Button>
          </section>
        </main>

        <div className="get-started-container">
          <Button
            variant="contained"
            className={`get-started-button ${loading ? 'loading' : ''}`}
            disabled={loading}
            onClick={handleGetStarted}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Started'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
