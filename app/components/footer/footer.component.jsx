"use client"
import { usePathname } from "next/navigation";

const Footer = () => {
  const isLandingPage = usePathname() === "/";

  if (isLandingPage) return null;

  return (
    <footer className="footer bg-[#F7D65A] text-gray-800 py-5 mt-20">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Buether Clothing. All rights reserved.</p>
        <p className="mt-4">
          <a href="/customer-information" className="text-gray-800 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/customer-information" className="text-gray-800 hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;