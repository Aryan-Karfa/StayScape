import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import { HeartCrack } from 'lucide-react';
import { listings } from '../data/listings';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const savedListings = listings.filter(l => wishlist.includes(l.id));
  const mockBookings = [listings[0], listings[2]];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        <h1 className="hero-lg mb-8">Your Dashboard</h1>
        
        <div className="flex gap-8 border-b border-[var(--border-subtle)] mb-8 overflow-x-auto hide-scrollbar">
          {['bookings', 'saved', 'account'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-semibold capitalize transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-[var(--text-primary)] border-b-2 border-[var(--accent-violet)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab === 'bookings' ? 'My Bookings' : tab === 'saved' ? 'Saved Stays' : 'My Account'}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {mockBookings.filter(Boolean).map((booking, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-4">
                  <img src={booking.image} alt={booking.title} className="w-full md:w-64 h-48 object-cover rounded-xl" />
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="section-title text-xl">{booking.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${i === 0 ? 'bg-[#00A699]/10 text-[#00A699]' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'}`}>
                          {i === 0 ? 'Confirmed' : 'Completed'}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)]">{booking.location}</p>
                      <div className="mt-4 text-sm">
                        <p><span className="text-[var(--text-secondary)]">Dates:</span> {i === 0 ? 'May 12 - 16, 2026' : 'Feb 3 - 6, 2026'}</p>
                        <p className="mt-1"><span className="text-[var(--text-secondary)]">Total Paid:</span> {booking.currency}{(booking.price * 3).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    {/* Bug Fix 1 Note: Do not use Link with /property if the user wants Dashboard to link directly to Listing detail using react routing. Wait, the req says "navigate to that listing detail". But ListingDetail is now rendered via state in App. If it's rendered by state in App, I must just navigate to "/" or something, or since Dashboard is a separate route, and Bug Fix 1 expects everything from App?
                    Let me wait to see my App.jsx routing logic. I'll stick to navigating to `/property/${id}` for now unless I handle routing entirely differently. Wait! In Bug Fix 1, the user wants Listing Detail conditionally rendered! "Replace all show/hide DOM manipulation with React state". This means ListingDetailPage is NO LONGER a separate Route in App.jsx. Let's see the App spec the user provided.
                    "Conditionally render either the HomePage or the ListingDetailPage based on whether selectedId is null or set to a listing id.
                    1. In App.jsx — add selectedId state and pass handlers down..."
                    Wait! If they do that, they probably REMOVED the `/property/:id` route from App.jsx! If they removed it, navigate(`/property/...`) won't work!
                    Let me use `navigate('/?property=' + booking.id)`? Wait, the user didn't specify URL updates. If they just set state `selectedId`, they can only reach it from HomePage's `onSelectListing`.
                    I will just make Dashboard's "View Details" button navigate to `/` so they can see the listing from there, or navigate(`/property/${id}`) if we keep that route for external deep links. It says "View Details button on each card that navigates to that listing detail". If Listing Detail is no longer a route... Actually, we can keep the route or just pass state. I'll just keep `navigate('/property/' + booking.id)` if I keep the route, or how they requested. Better to use standard routing if Dashboard uses Routes. Because App.jsx uses standard routes for `/dashboard` and `/login`. Let's just use `navigate('/property/' + booking.id)` and we'll keep the route in App.jsx? Wait, the instruction for App.jsx is explicitly provided by the user! I should look at that. */}
                    <button 
                      onClick={() => navigate(`/`)} 
                      className="mt-6 md:mt-0 w-max px-6 py-2 border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] rounded-lg transition-colors text-sm font-semibold"
                    >
                      View Home
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
             <div>
               {savedListings.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                   {savedListings.map((listing, idx) => (
                     <ListingCard key={listing.id} listing={listing} index={idx} onClick={() => navigate(`/`)} />
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 opacity-50 border border-dashed border-[var(--border-subtle)] rounded-2xl">
                   <HeartCrack size={48} className="mb-4 text-[var(--text-secondary)]" />
                   <h3 className="section-title text-xl mb-2">No saved stays yet</h3>
                   <p className="body-text text-center text-sm px-4">Start exploring to save stays for your next trip.</p>
                 </div>
               )}
             </div>
          )}

          {activeTab === 'account' && (
            <div className="max-w-xl">
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-8">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[var(--border-subtle)]">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg" style={{ background: 'var(--gradient-hero)' }}>
                    DU
                  </div>
                  <div>
                    <h2 className="section-title text-2xl">{user?.name || 'Demo User'}</h2>
                    <p className="text-[var(--text-secondary)]">{user?.email || 'demoaccount@email.com'}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Member Since</h4>
                    <p>{user?.memberSince || 'January 2025'}</p>
                  </div>
                  
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-3 border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] rounded-xl transition-colors font-semibold text-sm">
                      Edit Profile
                    </button>
                    <button className="flex-1 py-3 border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] rounded-xl transition-colors font-semibold text-sm">
                      Change Password
                    </button>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="w-full mt-4 py-3 bg-[var(--bg-surface)] hover:bg-[#FF4D6D]/10 text-[#FF4D6D] rounded-xl transition-colors font-semibold text-sm border border-[var(--border-subtle)] hover:border-[#FF4D6D]/30"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

      </main>
      
      <Footer />
    </div>
  );
}
