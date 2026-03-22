import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <span 
            className="font-display font-bold text-3xl tracking-tighter mb-6 text-gradient" 
          >
            StayScape
          </span>
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">Welcome back</h1>
          <p className="text-[var(--text-secondary)] mt-2">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl py-3.5 px-4 focus:outline-none focus:border-[var(--accent-violet)] text-[var(--text-primary)] transition-colors"
              required
            />
          </div>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl py-3.5 px-4 pr-12 focus:outline-none focus:border-[var(--accent-violet)] text-[var(--text-primary)] transition-colors"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            type="submit"
            className="w-full text-white font-bold py-4 rounded-xl mt-2 transition-colors"
            style={{ backgroundImage: 'var(--gradient-hero)' }}
          >
            Sign In
          </button>
          
          {error && (
            <p className="text-[#FF4D6D] text-sm text-center mt-2">
              Invalid email or password. Try the demo account.
            </p>
          )}

          <div className="text-center mt-6">
            <p className="text-[#52525E] text-xs">
              Demo account: demoaccount@email.com / DemoAccount123
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
