import React, { useState } from 'react';
import './Predict.css';

const Predict = () => {
  const [amount, setAmount] = useState('');
  const [unexpected, setUnexpected] = useState('');
  const [thirdFeature, setThirdFeature] = useState('');  // New input for third feature
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setError('');
    setResult(null);

    // Input validation
    if (!amount || !unexpected || !thirdFeature) {
      setError('Please enter all three values.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          unexpected: parseFloat(unexpected),
          third_feature: parseFloat(thirdFeature),  // Send third feature here
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediction request failed');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      console.error(err);
      setError('Error making prediction. Check if backend is running and input format is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">🧠 ML Prediction</h1>
        <p className="dashboard-description">
          Get insights based on your expenses.
        </p>
      </header>

      <div className="chart-wrapper">
        <div className="form-group">
          <label className="form-label">Amount (₹):</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label className="form-label">Unexpected Expense (₹):</label>
          <input
            type="number"
            className="form-input"
            value={unexpected}
            onChange={(e) => setUnexpected(e.target.value)}
          />

          <label className="form-label">Third Feature:</label>
          <input
            type="number"
            className="form-input"
            value={thirdFeature}
            onChange={(e) => setThirdFeature(e.target.value)}
          />

          <button className="add-btn" onClick={handlePredict} disabled={loading}>
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}
        {result !== null && (
          <div className="prediction-result">
            <p className="dashboard-description">
              🧾 Prediction Result: <strong>₹ {parseFloat(result).toFixed(2)}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
