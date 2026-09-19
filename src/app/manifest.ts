import { MetadataRoute } from 'next'

export const dynamic = 'force-static';
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TH3 B3ATZ BOUTIQ3',
    short_name: 'B3ATZ',
    description: 'Exclusive Beat Store & Creator Ecosystem',
    start_url: `${base}/`,
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#d10000',
    icons: [
      {
        src: `${base}/favicon.ico`,
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
