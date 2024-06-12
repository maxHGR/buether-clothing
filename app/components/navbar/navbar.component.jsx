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


import etherIcon from "./../../assets/ether-logo.ico"
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

  const signOutNotify = () => toast.info("signed out", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(signOutCurrentUser());
    signOutNotify();
  };

  const [paths, setPaths] = useState([
    "hats", 
    "jackets",
    "mens",
    "sneakers",
    "womens",
  ]);

  return (
    <div className={`${pathname === '/' ? 'navbar' : ''}`}>
    <div className={` bg-opacity-5 flex justify-around  p-2`}>
      <Link href="/">
        <Image src={etherIcon} height={70} width={70} alt="3D triangle" />
      </Link>
      <Link href="/shop" className={navbarItemsStyle}>Shop</Link>
      {
        currentUser ? (
          <button className={navbarItemsStyle} onClick={handleSignOut}>Sign-Out</button>
        ) : (
          <Link href="/authentication" className={navbarItemsStyle}>Sign-In</Link>
        )
      }

      <CartIcon />
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
    {isCartOpen && <CartDropdown />}
    </div>
  )
}

export default Navbar
