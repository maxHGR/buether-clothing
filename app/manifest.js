export default function manifest() {
  return {
    name: 'Buether',
    start_url: 'https://ether-clothing.vercel.app/',
    display: 'standalone',
    background_color: '#F7D65A',
    theme_color: '#F7D65A',
    icons: [
      {
        src: '/app/icon.ico',
        sizes: '512x512',
        types: 'image/png'
      },
    ],
  }
}