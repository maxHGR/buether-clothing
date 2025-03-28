export default function manifest() {
  return {
    name: 'Buether Clothing',
    short_name: 'Buether',
    description: 'E-Commerce Website for Clothing',
    start_url: 'https://buether.vercel.app/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#F7D65A',
    icons: [
     {
      "src": "/buether.favicon.svg",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/svg+xml"
    },
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
    ],
  }
}