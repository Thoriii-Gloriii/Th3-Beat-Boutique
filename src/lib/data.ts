import type { Beat, Kit } from '@/types';

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const GENRES = ['Hip Hop', 'Trap', 'R&B', 'Rock', 'Cinematic', 'Alternative', 'Experimental', 'The Future'];
export const MOODS = ['Dark', 'Energetic', 'Storytelling', 'Melancholic', 'Aggressive', 'Chill', 'Emotional'];
export const PRODUCER = { name: 'Imagine It', sound: 'The Future / Rock / Hip Hop', place: 'Soshanguve, Pretoria' };

const s = (plays: number, saves: number, crate: number, purchases: number, bids: number) => ({ plays, saves, crate, purchases, bids });
const A = 'Imagine It';

export const BEATS: Beat[] = [
  { id: '1', title: 'Dark Horizon', artist: A, bpm: 145, musicKey: 'F# Min', genre: 'The Future', mood: 'Dark', duration: '3:45', price: 49, isNew: false, auction: { reserve: 100, currentBid: 299, bids: 7, hours: 30 }, stats: s(4200, 310, 120, 14, 7) },
  { id: '2', title: 'Silent Chaos', artist: A, bpm: 118, musicKey: 'B Min', genre: 'Rock', mood: 'Aggressive', duration: '3:20', price: 39, isNew: false, auction: { reserve: 50, currentBid: 150, bids: 3, hours: 9 }, stats: s(2100, 140, 60, 6, 3) },
  { id: '3', title: 'Shadow Self', artist: A, bpm: 90, musicKey: 'A Min', genre: 'Hip Hop', mood: 'Storytelling', duration: '3:12', price: 35, isNew: false, stats: s(3300, 260, 90, 11, 0) },
  { id: '4', title: 'Blackout', artist: A, bpm: 140, musicKey: 'C# Min', genre: 'Cinematic', mood: 'Dark', duration: '2:58', price: 55, isNew: false, auction: { reserve: 200, currentBid: 499, bids: 12, hours: 3 }, stats: s(5100, 420, 150, 9, 12) },
  { id: '5', title: 'The Fall', artist: A, bpm: 102, musicKey: 'E Min', genre: 'R&B', mood: 'Emotional', duration: '3:30', price: 40, isNew: true, stats: s(900, 88, 30, 2, 0) },
  { id: '6', title: 'Broken Dreams', artist: A, bpm: 95, musicKey: 'D Min', genre: 'The Future', mood: 'Melancholic', duration: '3:52', price: 45, isNew: false, auction: { reserve: 100, currentBid: 220, bids: 5, hours: 20 }, stats: s(1800, 175, 70, 4, 5) },
  { id: '7', title: 'Neon Requiem', artist: A, bpm: 138, musicKey: 'G Min', genre: 'Trap', mood: 'Energetic', duration: '2:58', price: 45, isNew: true, stats: s(760, 64, 41, 1, 0) },
  { id: '8', title: 'Static Bloom', artist: A, bpm: 128, musicKey: 'D Maj', genre: 'Experimental', mood: 'Chill', duration: '4:05', price: 30, isNew: true, stats: s(410, 39, 12, 0, 0) },
];

export const KITS: Kit[] = [
  { id: 'k1', name: '808 Ritual', type: 'Drum Kits', desc: 'Punchy drums & percussion', items: 48, price: 25 },
  { id: 'k2', name: 'Township Percussion', type: 'Drum Kits', desc: 'Live-played shakers, claps and toms', items: 36, price: 20 },
  { id: 'k3', name: 'Midnight Melodies', type: 'Loops', desc: 'Melodies, textures & musical loops', items: 24, price: 30 },
  { id: 'k4', name: 'Texture Lab', type: 'Loops', desc: 'Pads, noise beds and ambient layers', items: 20, price: 22 },
  { id: 'k5', name: 'Ready Records', type: 'Music', desc: 'Production-ready musical elements', items: 12, price: 40 },
  { id: 'k6', name: 'Cinematic Stems', type: 'Music', desc: 'Strings, brass and risers, split into stems', items: 16, price: 35 },
];

export const getBeat = (id: string) => BEATS.find((b) => b.id === id);
export const AUCTIONS = BEATS.filter((b) => b.auction);
export const NEW_BEATS = BEATS.filter((b) => b.isNew);
export const FEATURED = BEATS.filter((b) => ['1', '3', '4', '6'].includes(b.id));

export const trendScore = (b: Beat) => b.stats.plays + b.stats.saves * 3 + b.stats.crate * 5 + b.stats.purchases * 10 + b.stats.bids * 8;
export const TRENDING = [...BEATS].sort((a, b) => trendScore(b) - trendScore(a));

// Crate ids: "b<beatId>" or "k<n>" (kits already start with k)
export function crateItem(id: string) {
  if (id.startsWith('b')) {
    const b = getBeat(id.slice(1));
    return b && { id, title: b.title, sub: `${b.artist} · ${b.bpm} BPM · ${b.musicKey}`, price: b.price, href: `/beat/${b.id}/` };
  }
  const k = KITS.find((x) => x.id === id);
  return k && { id, title: k.name, sub: `${k.type} · ${k.items} files`, price: k.price, href: '/kits/' };
}
