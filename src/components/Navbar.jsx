import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-display font-bold text-2xl tracking-tighter text-gradient">StayScape</span>
          </Link>

          {/* Search Pill */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <motion.div 
              className={`flex items-center bg-[var(--bg-surface)] border ${isSearchFocused ? 'border-[var(--accent-violet)] shadow-[0_0_15px_var(--accent-violet-glow)]' : 'border-[var(--border-subtle)] hover:border-[var(--text-muted)]'} rounded-full p-2 transition-all duration-300 cursor-pointer`}
              onClick={() => setIsSearchFocused(!isSearchFocused)}
            >
              <div className="px-5 font-sans text-sm font-medium text-[var(--text-primary)]">Anywhere</div>
              <div className="w-[1px] h-6 bg-[var(--border-subtle)]"></div>
              <div className="px-5 font-sans text-sm font-medium text-[var(--text-primary)]">Any week</div>
              <div className="w-[1px] h-6 bg-[var(--border-subtle)]"></div>
              <div className="px-5 font-sans text-sm text-[var(--text-secondary)]">Add guests</div>
              <div className="bg-[var(--accent-violet)] p-2 rounded-full text-white ml-2">
                <Search size={16} strokeWidth={3} />
              </div>
            </motion.div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 relative z-10">
            <Link to="/wishlist" className="hidden md:block font-sans text-sm font-medium hover:text-[var(--accent-coral)] transition-colors">
              Saved Stays
            </Link>
            <button className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-[var(--bg-surface)] transition-colors">
              <Globe size={18} />
            </button>
            
            <div className="relative">
              <div 
                className="flex items-center gap-3 border border-[var(--border-subtle)] rounded-full p-2 bg-[var(--bg-surface)] hover:shadow-lg transition-all cursor-pointer"
                onClick={() => {
                  if (isLoggedIn) setIsDropdownOpen(!isDropdownOpen);
                  else navigate('/login');
                }}
              >
                <Menu size={18} className="ml-2" />
                <div className="bg-[var(--bg-elevated)] p-1.5 rounded-full text-[var(--text-secondary)]">
                  <User size={18} />
                </div>
              </div>

              <AnimatePresence>
                {isDropdownOpen && isLoggedIn && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full mt-3 w-56 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xl overflow-hidden py-2 z-50 text-[var(--text-primary)]"
                  >
                    <button onClick={() => { setIsDropdownOpen(false); navigate('/dashboard'); }} className="w-full text-left px-5 py-3 hover:bg-[var(--bg-elevated)] transition-colors text-sm font-medium">
                      My Dashboard
                    </button>
                    <button onClick={() => { setIsDropdownOpen(false); navigate('/dashboard', { state: { tab: 'bookings' } }); }} className="w-full text-left px-5 py-3 hover:bg-[var(--bg-elevated)] transition-colors text-sm font-medium">
                      My Bookings
                    </button>
                    <div className="h-px bg-[var(--border-subtle)] my-1"></div>
                    <button onClick={() => { setIsDropdownOpen(false); logout(); navigate('/'); }} className="w-full text-left px-5 py-3 hover:bg-[var(--bg-elevated)] transition-colors text-sm font-medium text-[var(--accent-coral)]">
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.nav>
      
      {/* AuthModal removed */}
    </>
  );
}
