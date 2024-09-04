"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from "../../utils/firebase.utils"
import { setCurrentUser } from "../../store/user/user.reducer"


import etherIconWhite from "./../../assets/icons/logo/ether-clothing-favicon-white.png"
import etherIconYellow from './../../assets/icons/logo/ether-clothing-favicon-color.png'
import profileIcon from '../../assets/icons/profile/profile.svg'
import invertedProfileIcon from '../../assets/icons/profile/profile-inverted.svg'

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
  let landingPage = pathname === '/' ? true : false;
  
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
    <div className={`${landingPage ? 'navbar' : ' mb-10'}`}>
    <div className={` bg-opacity-5 flex justify-around p-2`}>
      <Link href="/" className="max-w-[100vw]">
        <Image src={ landingPage ? etherIconWhite : etherIconYellow } height={70} width={70} alt="Ether Clothing icon" />
      </Link>
      <Link href="/shop" className={navbarItemsStyle}>Shop</Link>
      {
        currentUser ? (
          <Link href="/authentication" className={`${navbarItemsStyle}`}>
            <Image src={landingPage ? invertedProfileIcon : profileIcon} height={50} width={50} alt="profile icon" />
          </Link>
        ) : (
          <Link href="/authentication" className={navbarItemsStyle}>Sign-In</Link>
        )
      }
      <CartIcon />
    </div>
    <div className={`w-full flex justify-around ${pathname.startsWith(`/shop`) ? " py-1" : ""} border-b border-[#F7D65A] text-gray-800`}>
      {
        pathname.startsWith('/shop') ? (
          paths.map((path) => {
            return <Link key={path} href={`/shop/${path}`}>{path}</Link>
          })
        ) : ("")
      }
    </div>
    {isCartOpen && <CartDropdown />}
    </div>
  )
}

export default Navbar
