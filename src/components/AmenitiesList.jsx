import React from 'react';
import { Wifi, Home, Waves, Snowflake, Coffee, Utensils, MountainSnow, Bath, Dog, CheckCircle2 } from 'lucide-react';

const amenityIcons = {
  'WiFi': Wifi,
  'Ocean View': Waves,
  'Private Pool': Waves,
  'Air Conditioning': Snowflake,
  'AC': Snowflake,
  'Kitchen': Utensils,
  'Full Kitchen': Utensils,
  'Kitchenette': Coffee,
  'Mountain View': MountainSnow,
  'Lake View': Waves,
  'Coffee Maker': Coffee,
  'Heating': Home,
  'Pet Friendly': Dog,
  'Floor Heating': Home,
  'Outdoor Shower': Bath
};

export default function AmenitiesList({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="py-8 border-t border-[var(--border-subtle)]">
      <h3 className="section-title mb-6 text-xl">What this place offers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {amenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity] || CheckCircle2;
          return (
            <div key={index} className="flex items-center gap-4 text-[var(--text-primary)]">
              <Icon size={24} className="text-[var(--text-secondary)]" strokeWidth={1.5} />
              <span className="body-text">{amenity}</span>
            </div>
          );
        })}
      </div>
      
      <button className="mt-8 px-6 py-3 border border-[var(--border-primary)] rounded-xl font-semibold hover:bg-[var(--bg-elevated)] transition-colors">
        Show all amenities
      </button>
    </div>
  );
}
