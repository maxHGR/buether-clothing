import { Inter } from "next/font/google";
import "./../globals.css";
import Navbar from "../components/navbar/navbar.component";
import StoreProvider from "../store/provider/provider.store";


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
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
