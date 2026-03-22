import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const item = window.localStorage.getItem('stayscape_wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('stayscape_wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  return { wishlist, toggleWishlist, isWishlisted };
}
