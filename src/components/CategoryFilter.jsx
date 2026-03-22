import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palmtree, Mountain, Building2, Tent, Ship, Castle } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Stays', icon: Sparkles },
  { id: 'beach', label: 'Beachfront', icon: Palmtree },
  { id: 'mountains', label: 'Mountains', icon: Mountain },
  { id: 'urban', label: 'Urban Lofts', icon: Building2 },
  { id: 'historical', label: 'Historical', icon: Castle },
  { id: 'camps', label: 'Glamping', icon: Tent },
  { id: 'boats', label: 'Houseboats', icon: Ship },
];

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag implementation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-md pt-28 pb-4 z-40 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing w-full pb-2"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <div 
                key={category.id}
                onClick={() => !isDragging && setActiveCategory(category.id)}
                className={`flex flex-col items-center gap-2 min-w-max transition-all duration-300 pb-2 border-b-2 ${
                  isActive ? 'border-[var(--text-primary)] text-[var(--text-primary)] opacity-100' : 'border-transparent text-[var(--text-secondary)] opacity-70 hover:opacity-100 hover:border-[var(--border-subtle)]'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                <span className="font-sans text-sm font-medium">{category.label}</span>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
