import { Inter } from "next/font/google";
import "./../globals.css";
import Navbar from "../components/navbar/navbar.component";
import StoreProvider from "../store/provider/provider.store";
import { Bounce, ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ether clothing",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            theme="light"
            transition={Bounce}
          />
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
