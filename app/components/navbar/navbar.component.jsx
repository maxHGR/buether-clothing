"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import etherIcon from "./../../assets/ether-logo.ico"
import Link from "next/link"


const Navbar = () => {
  const navbarItemsStyle = "text-xl my-auto"
  const pathname = usePathname();
  return (
    <div className={`${pathname === '/' ? 'navbar' : ''} bg-opacity-5 flex justify-around  p-2`}>
      <Link href="/">
        <Image src={etherIcon} height={70} width={70} alt="3D triangle" />
      </Link>
      <Link href="/shop" className={navbarItemsStyle}>Shop</Link>
      <Link href="/authentication" className={navbarItemsStyle}>Sign-In</Link>
      <Link href="/checkout" className={navbarItemsStyle}>Cart</Link>
    </div>
  )
}

export default Navbar
