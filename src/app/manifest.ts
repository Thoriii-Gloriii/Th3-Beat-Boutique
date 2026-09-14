import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TH3 B3ATZ BOUTIQ3',
    short_name: 'B3ATZ',
    description: 'Exclusive Beat Store & Creator Ecosystem',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D11',
    theme_color: '#E60023',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
