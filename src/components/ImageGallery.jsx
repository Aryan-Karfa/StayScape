import React from 'react';
import { motion } from 'framer-motion';
import { Grid } from 'lucide-react';

export default function ImageGallery({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 mt-24 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[450px] md:h-[550px] rounded-2xl overflow-hidden">
        
        {/* Main large image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-1 md:col-span-2 row-span-2 relative group cursor-pointer"
        >
          <img 
            src={images[0]} 
            alt="Main property view" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
        </motion.div>

        {/* Smaller grid images */}
        {images.slice(1, 5).map((img, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            className={`hidden md:block relative group cursor-pointer ${
              index === 1 ? 'md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2' :
              index === 2 ? 'md:col-start-4 md:col-end-5 md:row-start-1 md:row-end-2' :
              index === 3 ? 'md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3' :
              'md:col-start-4 md:col-end-5 md:row-start-2 md:row-end-3'
            }`}
          >
            <img 
              src={img} 
              alt={`Property detail ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
          </motion.div>
        ))}
      </div>

      <button className="absolute bottom-6 right-10 md:right-16 bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-subtle)] text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[var(--bg-elevated)] transition-colors shadow-lg">
        <Grid size={16} />
        Show all photos
      </button>
    </div>
  );
}
