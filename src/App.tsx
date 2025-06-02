import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/Landing';
import CheckoutPage from './pages/CheckOut';
import CartModal from './components/CartModal'; // make sure the path is correct

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // modal control

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(savedMode === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const openCartSlider = () => setIsCartOpen(true);
  const closeCartSlider = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <Router>
        <div className={`app ${darkMode ? 'dark' : ''}`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          
          {/* 👇 Modal should be available globally */}
          <CartModal isOpen={isCartOpen} onClose={closeCartSlider} />

          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              {/* 👇 Pass openCartSlider to CheckoutPage */}
              <Route path="/checkout" element={<CheckoutPage openCartSlider={openCartSlider} />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
