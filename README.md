# TH3 B3ATZ BOUTIQ3

Beat marketplace and creative discovery platform. Built with Next.js (static export) and Tailwind, hosted on GitHub Pages.

**Live site:** https://thoriii-gloriii.github.io/Th3-Beat-Boutique/

## Pages
Home (hero, genre/mood discovery, featured, new, live auctions, trending, sound kits, producer spotlight, CTA), Beats (search, genre, mood, BPM, sort), Beat detail (preview, crate, bidding, stem mixer), Sound Kits, Services, About / producer profile, Sell, Crate.

## Develop
```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static export to ./out (set GITHUB_ACTIONS=true to build with the Pages base path)
```

## Notes
- Catalogue data lives in `src/lib/data.ts`. Beat previews are a synthesized drum loop at each beat's BPM until audio files are hosted.
- Crate contents are stored in the browser's localStorage. Checkout, real bidding and seller onboarding need a backend and are not connected yet.
- Palette: black and red only (see `src/app/globals.css`).
