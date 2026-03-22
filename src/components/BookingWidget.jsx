import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';

export default function BookingWidget({ listing }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const calculateTotal = () => {
    // simplified calculation for demo
    const basePrice = listing.price * 3;
    const cleaningFee = 1500;
    const serviceFee = Math.round(basePrice * 0.12);
    return basePrice + cleaningFee + serviceFee;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl sticky top-32"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="price-text text-2xl">{listing.currency}{listing.price.toLocaleString('en-IN')}</span>
          <span className="text-[var(--text-secondary)] body-text text-sm"> / night</span>
        </div>
        <div className="flex items-center gap-1 font-medium text-sm">
          <Star size={14} className="fill-[var(--accent-amber)] text-[var(--accent-amber)]" />
          <span>{listing.rating}</span>
          <span className="text-[var(--text-secondary)] underline cursor-pointer ml-1">
            {listing.reviewCount} reviews
          </span>
        </div>
      </div>

      <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl mb-4 overflow-hidden">
        <div className="flex border-b border-[var(--border-subtle)]">
          <div className="flex-1 p-3 border-r border-[var(--border-subtle)]">
            <div className="label-text text-[10px]">CHECK-IN</div>
            <input 
              type="date" 
              className="bg-transparent border-none outline-none text-sm w-full font-medium mt-1 text-[var(--text-primary)]"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex-1 p-3">
            <div className="label-text text-[10px]">CHECKOUT</div>
            <input 
              type="date" 
              className="bg-transparent border-none outline-none text-sm w-full font-medium mt-1 text-[var(--text-primary)]"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="p-3 w-full flex justify-between items-center cursor-pointer">
          <div>
            <div className="label-text text-[10px]">GUESTS</div>
            <div className="text-sm font-medium mt-1">{guests} guest{guests > 1 ? 's' : ''}</div>
          </div>
          <ChevronDown size={18} className="text-[var(--text-secondary)]" />
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-coral)] text-white font-bold py-4 rounded-xl text-lg relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        Reserve
      </motion.button>

      <div className="text-center text-[var(--text-secondary)] text-sm mt-4 mb-6">
        You won't be charged yet
      </div>

      <div className="flex justify-between body-text text-sm mb-3">
        <span className="underline cursor-pointer">{listing.currency}{listing.price.toLocaleString('en-IN')} x 3 nights</span>
        <span>{listing.currency}{(listing.price * 3).toLocaleString('en-IN')}</span>
      </div>
      <div className="flex justify-between body-text text-sm mb-3">
        <span className="underline cursor-pointer">Cleaning fee</span>
        <span>{listing.currency}1,500</span>
      </div>
      <div className="flex justify-between body-text text-sm mb-6 pb-6 border-b border-[var(--border-subtle)]">
        <span className="underline cursor-pointer">StayScape service fee</span>
        <span>{listing.currency}Math.round({listing.price} * 3 * 0.12).toLocaleString('en-IN')</span>
      </div>

      <div className="flex justify-between font-bold text-[17px]">
        <span>Total before taxes</span>
        <span>{listing.currency}{calculateTotal().toLocaleString('en-IN')}</span>
      </div>
    </motion.div>
  );
}
