export default function manifest() {
  return {
    name: 'Buether',
    description: 'E-Commerce Website for Clothing',
    start_url: 'https://ether-clothing.vercel.app/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#F7D65A',
    "icons": [
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