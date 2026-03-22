import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Github, Hash } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        ></motion.div>

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden rounded-3xl shadow-2xl"
        >
          <div className="flex justify-between items-center p-6 border-b border-[var(--border-subtle)]">
            <h2 className="font-display text-xl font-bold">{isLogin ? 'Log in or sign up' : 'Create an account'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-[var(--bg-surface)] rounded-full transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <h3 className="hero-lg text-3xl mb-6">Welcome to StayScape</h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-[var(--text-secondary)]" />
                  </div>
                  <input type="text" placeholder="Full Name" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[var(--accent-violet)] focus:ring-1 focus:ring-[var(--accent-violet)] transition-colors text-[var(--text-primary)]" />
                </div>
              )}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[var(--text-secondary)]" />
                </div>
                <input type="email" placeholder="Email" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[var(--accent-violet)] focus:ring-1 focus:ring-[var(--accent-violet)] transition-colors text-[var(--text-primary)]" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[var(--text-secondary)]" />
                </div>
                <input type="password" placeholder="Password" className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-[var(--accent-violet)] focus:ring-1 focus:ring-[var(--accent-violet)] transition-colors text-[var(--text-primary)]" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[var(--accent-violet)] hover:bg-[var(--accent-violet)]/90 text-white font-bold py-4 rounded-xl mt-6 shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] transition-colors"
                onClick={onClose}
              >
                {isLogin ? 'Continue' : 'Sign Up'}
              </motion.button>
            </form>

            <div className="my-6 flex items-center text-[var(--text-secondary)] text-sm before:flex-1 before:border-t before:border-[var(--border-subtle)] before:mr-4 after:flex-1 after:border-t after:border-[var(--border-subtle)] after:ml-4">
              or
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] py-3 rounded-xl font-medium transition-colors">
                <Github size={20} /> Continue with GitHub
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-transparent border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] py-3 rounded-xl font-medium transition-colors">
                <Hash size={20} /> Continue with Google
              </button>
            </div>

            <div className="mt-8 text-center text-sm body-text text-[var(--text-secondary)]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-[var(--text-primary)] font-semibold underline cursor-pointer hover:text-[var(--accent-violet)] transition-colors" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Log in'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
