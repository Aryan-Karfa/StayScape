import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import { listings } from '../data/listings';
import { Link } from 'react-router-dom';

export default function HomePage({ onSelectListing }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredListings = activeCategory === 'all' 
    ? listings 
    : listings.filter(l => {
        if (activeCategory === 'beach' && l.amenities.includes('Ocean View')) return true;
        if (activeCategory === 'mountains' && l.amenities.includes('Mountain View')) return true;
        if (activeCategory === 'historical' && l.type === 'Historical') return true;
        if (activeCategory === 'urban' && l.type === 'Apartment') return true;
        if (activeCategory === 'camps' && l.type === 'Tent') return true;
        if (activeCategory === 'boats' && l.type === 'Boat') return true;
        return false;
      });

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm mb-6 text-[var(--accent-coral)] font-medium">
            <Sparkles size={14} /> 
            <span>Curated stays for the modern traveler</span>
          </div>
          <h1 className="hero-xl mb-6">
            Find spaces that <br/>
            <span className="text-gradient">inspire you.</span>
          </h1>
          <p className="body-text text-[var(--text-secondary)] text-lg max-w-2xl">
            Discover extraordinary homes, from minimalist coastal lofts to historic mountain chalets. Redefining your next getaway with unparalleled curation.
          </p>
        </motion.div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-violet)] rounded-full blur-[150px] opacity-20 hidden md:block mix-blend-screen pointer-events-none"></div>
      </section>

      <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 ${filteredListings.length === 0 ? 'hidden' : ''}`}
          >
            {filteredListings.map((listing, idx) => (
              <ListingCard key={listing.id} listing={listing} index={idx} onClick={() => onSelectListing(listing.id)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredListings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <MapPin size={48} className="mb-4 text-[var(--text-secondary)]" />
            <h3 className="section-title text-xl mb-2">No exact matches</h3>
            <p className="body-text text-center text-sm">Try changing or removing some of your filters.</p>
          </div>
        )}
      </main>

      {/* Trending Destinations Row */}
      <section className="bg-[var(--bg-surface)] mt-12 py-20 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="section-title mb-2">Trending Destinations</h2>
              <p className="body-text text-[var(--text-secondary)]">Most searched locations this week</p>
            </div>
            <button className="hidden md:flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent-violet)] transition-colors font-medium">
              Explore all <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['Goa', 'Manali', 'Udaipur', 'Coorg'].map((dest, i) => (
              <div key={i} className="group relative h-48 md:h-64 rounded-2xl overflow-hidden cursor-pointer">
                <img 
                  src={listings.find(l => l.location === dest)?.image || listings[0].image}
                  alt={dest}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                  <h3 className="card-title text-white flex items-center gap-2">
                    <MapPin size={16} />
                    {dest}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          <button className="md:hidden mt-8 w-full py-4 border border-[var(--border-subtle)] rounded-xl font-semibold flex items-center justify-center gap-2">
            Explore all <ChevronRight size={18} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
