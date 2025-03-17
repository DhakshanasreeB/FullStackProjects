import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="container">
        <h1>Welcome to SmartHome AI</h1>
        <p>Your personal assistant for a smarter home.</p>
        <button className="btn" onClick={() => navigate("/chatbot")}>
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
