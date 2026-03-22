import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/HomePage';
import ListingDetailPage from './pages/ListingDetailPage';
import BookingConfirmPage from './pages/BookingConfirmPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function MainContent() {
  const [selectedId, setSelectedId] = useState(null);
  
  return (
    <div>
      {selectedId === null ? (
        <HomePage onSelectListing={(id) => setSelectedId(id)} />
      ) : (
        <ListingDetailPage
          id={selectedId}
          onBack={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/book/:id" element={<BookingConfirmPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
