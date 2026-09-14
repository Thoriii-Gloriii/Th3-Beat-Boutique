export interface Beat {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  musicKey: string;
  genre: string;
  coverArtUrl: string;
  auctionEndTime: string; // ISO date string
  currentBid: number;
  reservePrice: number;
}
