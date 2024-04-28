"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams, usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "@/app/utils/firebase.utils"
import { setCurrentUser } from "@/app/store/user/user.reducer"
import etherIcon from "./../../assets/ether-logo.ico"
import Link from "next/link"


const Navbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user));
      }
    });

    return unsubscribe;
  }, []);


  const [paths, setPaths] = useState([
    "hats", 
    "jackets",
    "mens",
    "sneakers",
    "womens",
  ]);
  const params = useParams();
  const pathname = usePathname();
  const navbarItemsStyle = "text-xl my-auto";

  return (
    <div className={`${pathname === '/' ? 'navbar' : ''}`}>
    <div className={` bg-opacity-5 flex justify-around  p-2`}>
      <Link href="/">
        <Image src={etherIcon} height={70} width={70} alt="3D triangle" />
      </Link>
      <Link href="/shop" className={navbarItemsStyle}>Shop</Link>
      <Link href="/authentication" className={navbarItemsStyle}>Sign-In</Link>
      <Link href="/checkout" className={navbarItemsStyle}>Cart</Link>
    </div>
    <div className="w-full flex justify-around mb-5">
      {
        pathname.startsWith('/shop') ? (
          paths.map((path) => {
            return <Link key={path} href={`/shop/${path}`}>{path}</Link>
          })
        ) : ''
      }
    </div>
    </div>
  )
}

export default Navbar
