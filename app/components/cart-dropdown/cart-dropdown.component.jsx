
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link";
import Image from "next/image";

import tumbleweedPicture from "../../assets/cart/tumbleweed.png"
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";


const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);


  return (
    <div className="absolute w-72 h-80 flex flex-col justify-between px-5 py-2 border border-black bg-white z-10">
      <div className="w-64 h-full flex flex-col justify-center items-center overflow-scroll overflow-x-hidden" label="Cart-Items">
      {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <div className="flex flex-col items-center gap-y-8 ">
            <Image src={tumbleweedPicture} height={100} width={100} alt="tumbleweed" className="tumbleweed"/>
            <p className="text-lg mt-auto tracking-[2rem]">EMPTY</p>
          </div>
        )}
      </div>
      <Link className="mt-4 ml-auto border border-green-500 p-1 rounded-sm" href='/checkout'>CHECKOUT</Link>
    </div>
  )
}

export default CartDropdown