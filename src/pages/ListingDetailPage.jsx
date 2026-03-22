import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share, Star, Medal, MapPin, CheckCircle2, X, ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';

import Footer from '../components/Footer';
import { listings } from '../data/listings';

export default function ListingDetailPage({ id: propId, onBack }) {
  const { id: urlId } = useParams();
  const id = propId || urlId;
  const navigate = useNavigate();

  // States
  const [isSaved, setIsSaved] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Booking widget states
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const listing = listings.find(l => l.id === id);

  // Lightbox keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showLightbox || !listing || !listing.images) return;
      if (e.key === 'Escape') setShowLightbox(false);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % listing.images.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + listing.images.length) % listing.images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, listing]);

  if (!listing) return <div className="min-h-screen bg-[#0D0D0F] flex items-center justify-center text-[#F2F2F5]">Loading...</div>;

  const handleReserve = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const nights = 5;
  const subtotal = listing.price * nights;
  const serviceFee = Math.round(subtotal * 0.12);
  const cleaningFee = 1200;
  const grandTotal = subtotal + serviceFee + cleaningFee;

  const mockReviews = [
    { name: 'Arjun M.', date: 'January 2026', text: `An absolute architectural dream. We watched the sunset through the glass walls and felt completely alone in the best possible way. ${listing.hostName} was an incredible host.` },
    { name: 'Priya S.', date: 'December 2025', text: `The location in ${listing.location} is totally unmatched. The pictures don't even do this place justice.` },
    { name: 'Rohan K.', date: 'November 2025', text: `If you are looking for a place to truly disconnect and recharge, this is the one. Simply breathtaking design and perfectly clean.` },
    { name: 'Neha V.', date: 'October 2025', text: `Everything was perfect from check-in to check-out. The amenities are exactly as described and the view is spectacular.` }
  ];

  const amenityIcons = {
    "Ocean View": "🌊", "Private Pool": "🏊", "WiFi": "📶", "Air Conditioning": "❄️", "Kitchen": "🍳",
    "Lake View": "🏞️", "Courtyard": "🌿", "Daily Breakfast": "☕", "AC": "❄️", "Concierge": "🛎️",
    "Mountain View": "⛰️", "Fireplace": "🔥", "Heating": "♨️", "Patio": "🪑", "Jungle View": "🌴",
    "Balcony": "🌅", "Breakfast Included": "🍳", "Coffee Maker": "☕", "River View": "🌊", "Private Ghat": "🛕",
    "Yoga Deck": "🧘", "Full Kitchen": "🍳", "City View": "🏙️", "Rooftop Terrace": "🌇", "Plunge Pool": "💦",
    "Garden View": "🌺", "Chef on call": "👨‍🍳", "Library": "📚", "Valley View": "⛰️", "Games Room": "🎱",
    "BBQ Grill": "🥩", "Fire Pit": "🔥", "Pet Friendly": "🐕", "Kitchenette": "🍳", "Waterfront": "⛵",
    "Chef Included": "👨‍🍳", "Sun Deck": "☀️", "Full Board": "🍽️", "Guided Tours": "🧭", "Outdoor Shower": "🚿",
    "Floor Heating": "♨️", "Grill": "🥩", "Terrace": "🌇"
  };

  const handleBack = () => {
    if (onBack) onBack();
    else navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-[#0D0D0F] font-sans text-[#F2F2F5]"
    >
      {/* SECTION 1 - BACK NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-[#0D0D0F] border-b border-[#2A2A30] h-[52px] flex items-center justify-between px-6 md:px-12">
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-[14px] font-medium border border-[#2A2A30] px-3 py-1.5 rounded-[12px] hover:border-[#7C3AED] transition-colors bg-transparent"
        >
          <ArrowLeft size={16} /> Back to listings
        </button>
        <div className="flex gap-2">
          <button className="p-2 border border-[#2A2A30] rounded-full hover:border-[#7C3AED] transition-colors bg-transparent flex items-center justify-center">
            <Share size={16} />
          </button>
          <motion.button 
            onClick={() => setIsSaved(!isSaved)}
            whileTap={{ scale: 0.8 }}
            className="p-2 border border-[#2A2A30] rounded-full hover:border-[#7C3AED] transition-colors bg-transparent flex items-center justify-center relative"
          >
            <motion.div animate={isSaved ? { scale: [0, 1.4, 1] } : { scale: 1 }}>
              <Heart size={16} className={isSaved ? "fill-[#FF4D6D] text-[#FF4D6D]" : "fill-transparent"} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* SECTION 2 - IMAGE GALLERY */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1400px] mx-auto px-0 md:px-12 mt-6"
      >
        <div className="relative w-full h-[60vw] md:h-[480px] md:rounded-[16px] overflow-hidden flex flex-col md:flex-row gap-[6px]">
          {/* Hero Image */}
          <div className="w-full md:w-[60%] h-full shrink-0">
            <img src={listing.images?.[0] || listing.image} alt="Hero" className="w-full h-full object-cover rounded-none" />
          </div>
          {/* Grid Images */}
          <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-[6px] w-[40%] h-full shrink-0">
            {listing.images?.slice(1, 3).map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover rounded-none" />
            ))}
          </div>
          {/* Show All Photos Pill */}
          <button 
            onClick={() => setShowLightbox(true)}
            className="absolute bottom-6 right-6 px-4 py-2 font-sans font-medium text-[13px] text-[#F2F2F5] transition-colors z-10 cursor-pointer"
            style={{ 
              background: 'rgba(20,20,22,0.85)', 
              backdropFilter: 'blur(8px)', 
              border: '1px solid rgba(255,255,255,0.15)', 
              borderRadius: '20px' 
            }}
          >
            Show all photos
          </button>
        </div>
      </motion.section>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 mt-10 pb-24">
        <div className="flex flex-col md:flex-row gap-16 relative">
          
          {/* LEFT COLUMN (65%) */}
          <div className="w-full md:w-[65%] shrink-0">
            
            {/* SECTION 3 - PROPERTY HEADER */}
            <header className="mb-10">
              <h1 className="font-display font-bold text-[36px] text-[#F2F2F5] tracking-[-0.02em] mb-[10px] leading-tight">
                {listing.title}
              </h1>
              <p className="font-sans font-normal text-[15px] text-[#9898A6]">
                {listing.guests} guests · {listing.beds} bedrooms · 1 baths · {listing.type}
              </p>
              <p className="font-sans font-medium text-[14px] text-[#7C3AED] mt-[6px]">
                📍 {listing.sublocation}, {listing.location}
              </p>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <div className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#F59E0B]" />)}
                </div>
                <span className="font-sans font-bold text-[15px] text-[#F2F2F5]">{listing.rating}</span>
                <span className="font-sans font-normal text-[15px] text-[#9898A6]">· {listing.reviewCount} reviews</span>
                {listing.isSuperhost && (
                  <span className="ml-2 bg-[#00A699] text-white px-2 py-0.5 rounded-full font-sans font-medium text-[11px]">
                    Superhost
                  </span>
                )}
              </div>
            </header>

            {/* SECTION 4 - HOST INFORMATION CARD */}
            <div className="bg-[#141416] border border-[#2A2A30] rounded-[16px] p-[20px] md:px-[24px] mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <img src={`https://i.pravatar.cc/112?u=${listing.id}`} alt={listing.hostName} className="w-[56px] h-[56px] rounded-full object-cover" />
                  <div>
                    <h3 className="font-sans font-semibold text-[16px] text-[#F2F2F5]">Hosted by {listing.hostName}</h3>
                    <p className="font-sans font-normal text-[13px] text-[#9898A6]">Superhost · Member since {listing.hostSince || '2020'} · Identity Verified</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-[#2A2A30] rounded-[12px] font-sans font-medium text-[13px] bg-transparent hover:border-[#7C3AED] transition-colors w-max">
                  Message Host
                </button>
              </div>
              <div className="flex gap-3 flex-wrap">
                <span className="px-[14px] py-[6px] border border-[#2A2A30] bg-[#1C1C20] rounded-full font-sans font-medium text-[12px] text-[#9898A6]">
                  ⭐ {listing.reviewCount} Reviews
                </span>
                <span className="px-[14px] py-[6px] border border-[#2A2A30] bg-[#1C1C20] rounded-full font-sans font-medium text-[12px] text-[#9898A6]">
                  ✓ Identity Verified
                </span>
                <span className="px-[14px] py-[6px] border border-[#2A2A30] bg-[#1C1C20] rounded-full font-sans font-medium text-[12px] text-[#9898A6]">
                  🏠 Superhost
                </span>
              </div>
            </div>

            {/* SECTION 5 - PROPERTY DESCRIPTION & DETAILS */}
            <section className="mb-10 pb-10 border-b border-[#2A2A30]">
              <h2 className="font-sans font-semibold text-[20px] text-[#F2F2F5] mb-4">About this place</h2>
              <motion.div 
                animate={{ height: showFullDesc ? "auto" : "75px" }} 
                className="overflow-hidden mb-2"
              >
                <p className="font-sans font-normal text-[15px] text-[#9898A6] leading-[1.75] whitespace-pre-wrap">
                  {listing.description}
                  {listing.description.length < 150 ? '' : ' \n\nWe provide all standard amenities. Enjoy your stay in a peaceful environment perfect for both work and relaxation.'}
                </p>
              </motion.div>
              <button 
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="font-sans font-medium text-[14px] text-[#7C3AED] hover:underline mb-8 bg-transparent border-none p-0 cursor-pointer"
              >
                {showFullDesc ? "Show less ↑" : "Show more ↓"}
              </button>
              
              <div className="bg-[#141416] rounded-[16px] border border-[#2A2A30] p-6 grid grid-cols-3 gap-4">
                <div>
                  <div className="font-sans font-normal text-[11px] uppercase text-[#52525E] mb-1">🛏 Bedrooms</div>
                  <div className="font-sans font-semibold text-[15px] text-[#F2F2F5]">{listing.beds} Bedrooms</div>
                </div>
                <div>
                  <div className="font-sans font-normal text-[11px] uppercase text-[#52525E] mb-1">👥 Guests max</div>
                  <div className="font-sans font-semibold text-[15px] text-[#F2F2F5]">{listing.guests} Guests</div>
                </div>
                <div>
                  <div className="font-sans font-normal text-[11px] uppercase text-[#52525E] mb-1">🏠 Type</div>
                  <div className="font-sans font-semibold text-[15px] text-[#F2F2F5]">{listing.type}</div>
                </div>
              </div>
            </section>

            {/* SECTION 7 - AMENITIES GRID */}
            <section className="mb-10 pb-10 border-b border-[#2A2A30]">
              <h2 className="font-sans font-semibold text-[20px] text-[#F2F2F5] mb-6">What this place offers</h2>
              <motion.div 
                variants={{
                  show: { transition: { staggerChildren: 0.05 } },
                  hidden: {}
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                {listing.amenities?.map(amenity => (
                  <motion.div 
                    key={amenity}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="bg-[#141416] border border-[#2A2A30] rounded-[12px] p-[14px] px-[16px] flex items-center gap-3 transition-colors duration-200 hover:border-[#7C3AED] group"
                  >
                    <span className="text-[20px] leading-none flex items-center justify-center">{amenityIcons[amenity] || "✨"}</span>
                    <span className="font-sans font-medium text-[14px] text-[#9898A6] group-hover:text-[#F2F2F5] transition-colors">{amenity}</span>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* SECTION 10 - REVIEWS SECTION */}
            <section className="mb-10 pb-10 border-b border-[#2A2A30]">
              <h2 className="font-sans font-semibold text-[20px] text-[#F2F2F5] mb-6">Guest Reviews</h2>
              
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="flex flex-col w-[120px] shrink-0">
                  <span className="font-display font-bold text-[48px] text-[#F2F2F5] leading-none mb-1">{listing.rating}</span>
                  <div className="flex text-[#F59E0B] mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#F59E0B]" />)}
                  </div>
                  <span className="font-sans font-normal text-[14px] text-[#9898A6]">{listing.reviewCount} reviews</span>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {['Cleanliness', 'Communication', 'Check-in', 'Accuracy', 'Location', 'Value'].map((cat, i) => {
                    const score = (4.7 + (i * 0.05)).toFixed(1);
                    return (
                      <div key={cat} className="flex items-center justify-between gap-4">
                        <span className="font-sans font-normal text-[13px] text-[#9898A6] w-24">{cat}</span>
                        <div className="flex-1 h-[4px] bg-[#2A2A30] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: `${(score/5)*100}%` }}></div>
                        </div>
                        <span className="font-sans font-normal text-[13px] text-[#F2F2F5]">{score}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <motion.div 
                variants={{
                  show: { transition: { staggerChildren: 0.08 } },
                  hidden: {}
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {mockReviews.map((rev, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0 }
                    }}
                    className="bg-[#141416] border border-[#2A2A30] rounded-[16px] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <img src={`https://i.pravatar.cc/112?u=${listing.id}R${i}`} alt="Reviewer" className="w-[40px] h-[40px] rounded-full object-cover" />
                        <div>
                          <div className="font-sans font-medium text-[15px] text-[#F2F2F5]">{rev.name}</div>
                          <div className="font-sans font-normal text-[12px] text-[#9898A6]">{rev.date}</div>
                        </div>
                      </div>
                      <div className="flex text-[#F59E0B] mb-3">
                        {[...Array(5)].map((_, idx) => <Star key={idx} size={12} className="fill-[#F59E0B]" />)}
                      </div>
                      <p className="font-sans font-normal text-[14px] text-[#9898A6] leading-[1.6]">
                        {rev.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* SECTION 11 - LOCATION SECTION */}
            <section>
              <h2 className="font-sans font-semibold text-[20px] text-[#F2F2F5] mb-2">Where you'll be</h2>
              <p className="font-sans font-medium text-[15px] text-[#7C3AED] mb-6">{listing.sublocation}, {listing.location}, India</p>
              
              <div className="bg-[#141416] border border-[#2A2A30] rounded-[16px] h-[280px] flex flex-col items-center justify-center pt-8 pb-4 px-4 overflow-hidden relative">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #7C3AED 1.5px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#7C3AED]/20 flex items-center justify-center mb-3">
                    <MapPin size={24} className="text-[#7C3AED]" />
                  </div>
                  <div className="font-sans font-semibold text-[#F2F2F5]">{listing.sublocation}, {listing.location}</div>
                  <div className="font-sans font-normal text-[12px] text-[#52525E] mt-1">Exact location provided after booking</div>
                </div>
              </div>
            </section>
            
          </div>

          {/* RIGHT COLUMN (35%) */}
          {/* SECTION 6 - STICKY BOOKING WIDGET */}
          <div className="w-full md:w-[35%] shrink-0">
            <div className="md:sticky md:top-[156px] top-auto bg-[#1C1C20] border border-[#2A2A30] rounded-[20px] p-[28px] w-full shadow-2xl md:shadow-none">
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-normal text-[28px] text-[#FF4D6D]">{listing.currency}{listing.price.toLocaleString('en-IN')}</span>
                  <span className="font-sans font-normal text-[14px] text-[#9898A6]">/ night</span>
                </div>
                <div className="font-sans font-normal text-[12px] text-[#9898A6] mt-1">
                  ★ {listing.rating} · {listing.reviewCount} reviews
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-[#141416] border-[1.5px] border-[#2A2A30] focus-within:border-[#7C3AED] focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.2)] rounded-[10px] p-[10px] px-[14px] transition-all">
                  <div className="font-sans font-bold uppercase text-[10px] text-[#52525E]">Check-in</div>
                  <input type="text" placeholder="Add date" className="bg-transparent w-full outline-none text-[14px] text-[#F2F2F5] mt-0.5 placeholder:text-[#52525E]" />
                </div>
                <div className="bg-[#141416] border-[1.5px] border-[#2A2A30] focus-within:border-[#7C3AED] focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.2)] rounded-[10px] p-[10px] px-[14px] transition-all">
                  <div className="font-sans font-bold uppercase text-[10px] text-[#52525E]">Check-out</div>
                  <input type="text" placeholder="Add date" className="bg-transparent w-full outline-none text-[14px] text-[#F2F2F5] mt-0.5 placeholder:text-[#52525E]" />
                </div>
              </div>

              <div className="bg-[#141416] border-[1.5px] border-[#2A2A30] rounded-[10px] p-[12px] px-[14px] mb-6">
                <div className="font-sans font-bold uppercase text-[10px] text-[#52525E] mb-3">Guests</div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans font-medium text-[14px] text-[#F2F2F5]">Adults</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-[28px] h-[28px] rounded-full border-[1.5px] border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:border-[#7C3AED] transition-colors"><Minus size={14}/></button>
                    <span className="font-sans font-medium w-4 text-center text-[#F2F2F5]">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="w-[28px] h-[28px] rounded-full border-[1.5px] border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:border-[#7C3AED] transition-colors"><Plus size={14}/></button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-sans font-medium text-[14px] text-[#F2F2F5]">Children</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))} className="w-[28px] h-[28px] rounded-full border-[1.5px] border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:border-[#7C3AED] transition-colors"><Minus size={14}/></button>
                    <span className="font-sans font-medium w-4 text-center text-[#F2F2F5]">{childrenCount}</span>
                    <button onClick={() => setChildrenCount(childrenCount + 1)} className="w-[28px] h-[28px] rounded-full border-[1.5px] border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:border-[#7C3AED] transition-colors"><Plus size={14}/></button>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(255,77,109,0.35)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReserve}
                className="relative overflow-hidden w-full h-[52px] rounded-[12px] font-sans font-semibold text-[15px] text-white mb-4"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #FF4D6D)' }}
              >
                <span className="relative z-10">Reserve</span>
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite]"></div>
              </motion.button>

              <div className="text-center font-sans font-normal text-[11px] text-[#52525E] mb-6">
                You won't be charged yet
              </div>

              <div className="space-y-3">
                <div className="flex justify-between font-sans font-normal text-[14px] text-[#9898A6]">
                  <span>{listing.currency}{listing.price.toLocaleString('en-IN')} × {nights} nights</span>
                  <span>{listing.currency}{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-sans font-normal text-[14px] text-[#9898A6]">
                  <span>Cleaning fee</span>
                  <span>{listing.currency}{cleaningFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-sans font-normal text-[14px] text-[#9898A6]">
                  <span>Service fee (12%)</span>
                  <span>{listing.currency}{serviceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-px w-full bg-[#2A2A30] my-4"></div>
                <div className="flex justify-between font-sans font-semibold text-[16px] text-[#F2F2F5]">
                  <span>Total</span>
                  <span>{listing.currency}{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* SECTION 8 - PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {showLightbox && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-transparent"
            ></motion.div>

            <button 
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 w-[40px] h-[40px] rounded-full bg-[#1C1C20] border border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:bg-[#2A2A30] transition-colors z-[10000]"
            >
              <X size={20} />
            </button>
            
            <button onClick={() => setLightboxIndex(i => (i - 1 + listing.images.length) % listing.images.length)} className="absolute left-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#1C1C20]/80 border border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:bg-[#2A2A30] transition-colors z-[10000]">
              <ArrowLeft size={24} />
            </button>
            <button onClick={() => setLightboxIndex(i => (i + 1) % listing.images.length)} className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full bg-[#1C1C20]/80 border border-[#2A2A30] flex items-center justify-center text-[#F2F2F5] hover:bg-[#2A2A30] transition-colors z-[10000]">
              <ArrowRight size={24} />
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center max-w-[90vw] mx-auto p-12 z-[9999]">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={lightboxIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3 }}
                  src={listing.images[lightboxIndex]}
                  alt={`Lightbox ${lightboxIndex}`}
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-[12px] shadow-2xl"
                />
              </AnimatePresence>
              <div className="absolute bottom-8 font-sans font-medium text-[14px] text-[#9898A6]">
                {lightboxIndex + 1} / {listing.images.length}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 9 - RESERVE SUCCESS TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[999] bg-[#1C1C20] border border-[#00A699] rounded-[12px] p-[14px] px-[20px] min-w-[320px] shadow-xl flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#00A699] flex items-center justify-center text-white shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="font-sans font-bold text-[#F2F2F5] text-[15px]">Reservation Requested!</div>
              <div className="font-sans font-normal text-[#9898A6] text-[13px] mt-0.5">You won't be charged until the host confirms.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for button shimmer animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { left: -100%; top: -10%; transform: rotate(20deg); }
          100% { left: 200%; top: -10%; transform: rotate(20deg); }
        }
      `}} />

    </motion.div>
  );
}
