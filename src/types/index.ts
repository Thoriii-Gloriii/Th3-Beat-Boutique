export interface Beat {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  musicKey: string;
  genre: string;
  mood: string;
  duration: string; // m:ss
  price: number; // lease price (USD)
  isNew: boolean;
  auction?: { reserve: number; currentBid: number; bids: number; hours: number };
  stats: { plays: number; saves: number; crate: number; purchases: number; bids: number };
}

export interface Kit {
  id: string;
  name: string;
  type: 'Drum Kits' | 'Loops' | 'Music';
  desc: string;
  items: number;
  price: number;
}
