import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login'; 
import './App.css';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <main className="main-content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/search" element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
            <Route path="/watchlist" element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

