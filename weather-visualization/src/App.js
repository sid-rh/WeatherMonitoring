import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HistoricalTrends from './components/HistoricalTrends';
import AlertLog from './components/AlertLog';
import Navbar from './components/Navbar';
import DailySummary from './components/DailySummary';
import CitySelector from './components/CitySelector';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <CitySelector />
          <Routes>
            <Route path="/" element={<DailySummary/>} />
            <Route path="/trends" element={<HistoricalTrends/>} />
            <Route path="/alerts" element={<AlertLog/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
