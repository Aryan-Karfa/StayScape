import React from 'react';
import { Globe, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-[var(--border-subtle)] pb-12">
        
        <div>
          <h4 className="font-sans font-semibold mb-4 text-[var(--text-primary)]">Support</h4>
          <ul className="space-y-3 text-[var(--text-secondary)] body-text text-sm">
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Help Center</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">AirCover</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Anti-discrimination</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Disability support</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Cancellation options</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sans font-semibold mb-4 text-[var(--text-primary)]">Hosting</h4>
          <ul className="space-y-3 text-[var(--text-secondary)] body-text text-sm">
            <li className="hover:text-[var(--text-primary)] cursor-pointer">StayScape your home</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">AirCover for Hosts</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Hosting resources</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Community forum</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Hosting responsibly</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-sans font-semibold mb-4 text-[var(--text-primary)]">StayScape</h4>
          <ul className="space-y-3 text-[var(--text-secondary)] body-text text-sm">
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Newsroom</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">New features</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Careers</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Investors</li>
            <li className="hover:text-[var(--text-primary)] cursor-pointer">Gift cards</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl tracking-tighter text-gradient mb-4">StayScape</h4>
          <p className="text-[var(--text-secondary)] body-text text-sm mb-6">
            Discover extraordinary homes, unforgettable experiences, and meaningful connections worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap items-center gap-3 text-[var(--text-secondary)] text-sm">
          <span>© 2026 StayScape, Inc.</span>
          <span className="hidden md:inline">•</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Privacy</span>
          <span className="hidden md:inline">•</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Terms</span>
          <span className="hidden md:inline">•</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Sitemap</span>
          <span className="hidden md:inline">•</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer">Company details</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium text-sm cursor-pointer">
            <Globe size={16} />
            <span>English (IN)</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium text-sm cursor-pointer">
            <span>₹</span>
            <span>INR</span>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <Facebook size={20} className="text-[var(--text-primary)] hover:text-[#1877F2] cursor-pointer transition-colors" />
            <Twitter size={20} className="text-[var(--text-primary)] hover:text-[#1DA1F2] cursor-pointer transition-colors" />
            <Instagram size={20} className="text-[var(--text-primary)] hover:text-[#E1306C] cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
