// Dashboard.js
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const monthlyIncome = parseFloat(localStorage.getItem('monthlyIncome')) || 0;

  // Prepare summary per category (including unexpected charges)
  const summary = expenses.reduce((acc, curr) => {
    const total = curr.amount + (curr.unexpected || 0);
    const index = acc.findIndex((item) => item.category === curr.category);
    if (index !== -1) {
      acc[index].amount += total;
    } else {
      acc.push({ category: curr.category, amount: total });
    }
    return acc;
  }, []);

  const totalExpenses = expenses.reduce(
    (sum, curr) => sum + curr.amount + (curr.unexpected || 0),
    0
  );

  const balance = monthlyIncome - totalExpenses;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa00ff', '#ff0055'];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">📊 Spending Dashboard</h1>
        <p className="dashboard-description">
          Visualize how your monthly income is being spent.
        </p>
      </header>

      <div className="dashboard-summary">
        <p><strong>Monthly Income:</strong> ₹{monthlyIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ₹{totalExpenses.toFixed(2)}</p>
        <p><strong>Remaining Balance:</strong> ₹{balance.toFixed(2)}</p>
      </div>

      {summary.length === 0 ? (
        <p className="no-data">No expenses added yet. Go add some!</p>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={summary}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ category, amount }) => `${category}: ₹${amount.toFixed(2)}`}
              >
                {summary.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
