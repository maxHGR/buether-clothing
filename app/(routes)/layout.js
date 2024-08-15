import { Inter } from "next/font/google";
import "./../globals.css";
import Navbar from "../components/navbar/navbar.component";
import StoreProvider from "../store/provider/provider.store";
import { Bounce, ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buether",
  description: "",
  manifest: "manifest.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.className}`}>
        <StoreProvider>
          <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover
            theme="colored"
            transition= "Bounce"
          />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
