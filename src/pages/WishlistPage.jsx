import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import { listings } from '../data/listings';
import { useWishlist } from '../hooks/useWishlist';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [savedListings, setSavedListings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSavedListings(listings.filter(l => wishlist.includes(l.id)));
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        <h1 className="hero-lg mb-8">Saved Stays</h1>
        
        {savedListings.length > 0 ? (
          <AnimatePresence>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {savedListings.map((listing, idx) => (
                <ListingCard key={listing.id} listing={listing} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-[var(--bg-surface)] p-6 rounded-full mb-6 relative">
              <Heart size={48} className="text-[var(--text-secondary)]" strokeWidth={1} />
            </div>
            <h2 className="section-title text-2xl mb-4">No saved stays yet</h2>
            <p className="body-text text-[var(--text-secondary)] mb-8 max-w-sm">
              As you search, tap the heart icon to save your favorite places to stay.
            </p>
            <Link to="/" className="bg-[var(--text-primary)] text-[var(--bg-base)] px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
              Start exploring
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
