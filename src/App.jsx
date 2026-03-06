import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// In lines ko aise sahi karein:
import BankAuthPage from './components/BankAuthPage'; 
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankAuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;