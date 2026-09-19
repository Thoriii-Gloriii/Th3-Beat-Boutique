'use client';
import { useEffect, useState } from 'react';

// null until mounted so server HTML and first client render match
export function useNow(step = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), step);
    return () => clearInterval(t);
  }, [step]);
  return now;
}

// Demo auctions restart on a fixed cycle so they never sit at "Ended".
export const nextEnd = (hours: number, now: number) => {
  const p = hours * 3600000;
  return (Math.floor(now / p) + 1) * p;
};

export function fmtLeft(ms: number) {
  const d = Math.floor(ms / 86400000), h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000), sec = Math.floor((ms % 60000) / 1000);
  return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m ${sec}s`;
}
