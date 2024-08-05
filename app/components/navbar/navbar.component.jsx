"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from "../../utils/firebase.utils"
import { setCurrentUser, signOutCurrentUser } from "../../store/user/user.reducer"
import { toast, Bounce } from "react-toastify";


import etherIconWhite from "./../../assets/icons/ether-clothing-favicon-white.png"
import etherIconYellow from './../../assets/icons/ether-clothing-favicon-color.png'
import profileIcon from '../../assets/profile.svg'

import { selectCurrentUser } from "../../store/user/user.selector"
import CartIcon from "../cart-icon/cart-icon.component"
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import { setIsCartOpen } from "../../store/cart/cart.reducer"


const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const params = useParams();
  const pathname = usePathname();
  const navbarItemsStyle = "text-xl my-auto";
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user));
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(setIsCartOpen(false));
  }, [pathname])


  const [paths, setPaths] = useState([
    "hats", 
    "jackets",
    "mens",
    "sneakers",
    "womens",
  ]);

  return (
    <div className={`${pathname === '/' ? 'navbar' : 'border-b border-black mb-10'}`}>
    <div className={` bg-opacity-5 flex justify-around p-2`}>
      <Link href="/" className="max-w-[100vw]">
        <Image src={ pathname === '/' ? etherIconWhite : etherIconYellow } height={70} width={70} alt="Ether Clothing icon" />
      </Link>
      <Link href="/shop" className={navbarItemsStyle}>Shop</Link>
      {
        currentUser ? (
          <Link href="/authentication" className={navbarItemsStyle}>
            <Image src={profileIcon} height={30} width={30} alt="profile icon" />
          </Link>
        ) : (
          <Link href="/authentication" className={navbarItemsStyle}>Sign-In</Link>
        )
      }
      <CartIcon />
    </div>
    <div className="w-full flex justify-around">
      {
        pathname.startsWith('/shop') ? (
          paths.map((path) => {
            return <Link key={path} href={`/shop/${path}`}>{path}</Link>
          })
        ) : ''
      }
    </div>
    {isCartOpen && <CartDropdown />}
    </div>
  )
}

export default Navbar
