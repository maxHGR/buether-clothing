export default function manifest() {
  return {
    name: 'Buether',
    description: 'E-Commerce Website for Clothing',
    start_url: 'https://ether-clothing.vercel.app/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#F7D65A',
    icons: [
      {
        src: '/app/icon.ico',
        sizes: 'any',
        types: 'image/png'
      },
    ],
  }
}