// TopButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { IconButton } from '@material-tailwind/react';

function TopButton() {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollPositionHandler = useCallback(() => {
    const currentlyScrolled = window.scrollY > 0;
    if (isScrolled !== currentlyScrolled) {
      setIsScrolled(currentlyScrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', scrollPositionHandler);
    return () => {
      window.removeEventListener('scroll', scrollPositionHandler);
    };
  }, [scrollPositionHandler]);

  if (!isScrolled) return null;

  return (
    <div className="fixed bottom-4 right-4">
      <IconButton
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        }}
        size="lg"
        className="rounded-full topBtn customIconButton flex justify-center"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div
          className="h-full w-full transition-transform group-hover:rotate-45"
          style={{ color: 'black', fontWeight: 'bold' }}
        >
          TOP
        </div>
      </IconButton>
    </div>
  );
}

export default TopButton;
