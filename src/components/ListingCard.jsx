import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';

export default function ListingCard({ listing, index, onClick }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const liked = isWishlisted(listing.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="block relative aspect-square overflow-hidden rounded-2xl">
        {listing.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-[var(--bg-surface)]/90 backdrop-blur-md px-3 py-1 rounded-full label-text !text-[10px]">
            New
          </div>
        )}
        
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); toggleWishlist(listing.id); }}
        className="absolute top-4 right-4 z-10 p-2"
      >
        <motion.div whileTap={{ scale: 0.8 }}>
          <Heart 
            size={24} 
            className={`drop-shadow-md transition-colors ${liked ? 'fill-[var(--accent-coral)] text-[var(--accent-coral)]' : 'fill-black/30 text-white hover:scale-110'}`} 
          />
        </motion.div>
      </button>

      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="card-title truncate pr-4">{listing.location}, {listing.sublocation}</h3>
          <div className="flex items-center gap-1 text-[var(--text-primary)] font-medium text-sm">
            <Star size={14} className="fill-[var(--accent-amber)] text-[var(--accent-amber)]" />
            <span>{listing.rating}</span>
          </div>
        </div>
        
        <p className="text-[var(--text-secondary)] text-[15px] mt-0.5">{listing.type} • {listing.beds} {listing.beds > 1 ? 'beds' : 'bed'}</p>
        
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-semibold text-[16px]">{listing.currency}{listing.price.toLocaleString('en-IN')}</span>
          <span className="text-[var(--text-secondary)] text-[15px]">night</span>
        </div>
      </div>
    </motion.div>
  );
}
