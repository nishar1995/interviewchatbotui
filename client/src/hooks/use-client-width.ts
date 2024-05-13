'use client';
import { useState, useEffect } from 'react';

export function useClientWidth(): number {
  const [clientWidth, set] = useState<number | null>(null);

  function handleClientWidth() {
    set(document.body.clientWidth);
  }

  useEffect(() => {
    handleClientWidth();
    window.addEventListener('resize', handleClientWidth);
    return () => {
      window.removeEventListener('resize', handleClientWidth);
    };
  }, []);

  return Number(clientWidth);
}
