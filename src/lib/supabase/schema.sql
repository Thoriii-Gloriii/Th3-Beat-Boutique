-- Create Enum for user roles
CREATE TYPE public.user_role AS ENUM ('customer', 'admin');

-- Users extension (linked to auth.users)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  role user_role DEFAULT 'customer'::user_role NOT NULL,
  username text UNIQUE,
  full_name text,
  instagram_handle text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Beats Table
CREATE TABLE public.beats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  artist text DEFAULT 'Imagine It' NOT NULL,
  bpm integer,
  music_key text,
  genre text,
  cover_art_url text,
  master_audio_url text,
  stem_audio_urls jsonb, -- { "drums": "url", "bass": "url", "melody": "url" }
  auction_start_time timestamp with time zone,
  auction_end_time timestamp with time zone,
  reserve_price numeric(10,2) DEFAULT 0.00,
  is_sold boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bids Table
CREATE TABLE public.bids (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  beat_id uuid REFERENCES public.beats ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Community Feed Posts
CREATE TABLE public.feed_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  media_url text, -- Video or Audio URL
  post_type text, -- 'beat_preview', 'studio_session', 'service_request'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_posts ENABLE ROW LEVEL SECURITY;

-- Basic Policies
CREATE POLICY "Public beats are viewable by everyone." ON public.beats FOR SELECT USING (true);
CREATE POLICY "Public feed posts are viewable by everyone." ON public.feed_posts FOR SELECT USING (true);
CREATE POLICY "Bids are viewable by everyone." ON public.bids FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert bids." ON public.bids FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can update their own profiles." ON public.profiles FOR UPDATE USING (auth.uid() = id);
