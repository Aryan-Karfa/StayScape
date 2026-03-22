import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { listings } from '../data/listings';

export default function BookingConfirmPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = listings.find(l => l.id === id);
    if (found) setListing(found);
  }, [id]);

  if (!listing) return <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col">
      <nav className="py-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="font-display font-bold text-2xl tracking-tighter text-gradient">StayScape</Link>
          <div className="text-sm font-medium text-[var(--text-secondary)]">Step 3 of 3</div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center py-20 px-6 max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-[var(--accent-violet)]/20 p-6 rounded-full mb-8 relative border border-[var(--accent-violet)]/30 backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-[var(--accent-violet-glow)] rounded-full blur-[40px] opacity-50"></div>
          <CheckCircle size={64} className="text-[var(--accent-violet)] relative z-10" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hero-lg text-center mb-4"
        >
          Pack your bags!
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--text-secondary)] text-center text-lg max-w-lg mb-12"
        >
          Your reservation at <span className="text-[var(--text-primary)] font-medium">{listing.title}</span> is confirmed and ready.
        </motion.p>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center shadow-2xl"
        >
          <img src={listing.image} alt="Property" className="w-full md:w-48 h-48 object-cover rounded-2xl" />
          
          <div className="w-full">
            <h3 className="card-title text-xl mb-6">{listing.location}, {listing.sublocation}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <Calendar size={20} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-coral)]">Dates</span>
                  <span className="text-[var(--text-primary)] font-medium text-[15px]">Apr 12 - Apr 15, 2026</span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[var(--border-subtle)]"></div>
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <Users size={20} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-coral)]">Guests</span>
                  <span className="text-[var(--text-primary)] font-medium text-[15px]">2 Adults</span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[var(--border-subtle)]"></div>
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <MapPin size={20} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-coral)]">Address</span>
                  <span className="text-[var(--text-primary)] font-medium text-[15px]">Sent to your email</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 w-full max-w-2xl flex flex-col sm:flex-row gap-4"
        >
          <Link to="/" className="flex-1 bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold py-4 px-6 rounded-xl flex items-center justify-center transition-colors">
            Back to Home
          </Link>
          <Link to="/" className="flex-1 bg-white text-black font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            Browse more stays <ArrowRight size={18} />
          </Link>
        </motion.div>

      </main>
    </div>
  );
}
