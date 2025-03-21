
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link";
import Image from "next/image";

import tumbleweedPicture from "../../assets/cart/tumbleweed.png"
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";


const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className="absolute right-0 w-72 h-80 flex flex-col justify-between px-5 py-2 border border-black bg-white z-10">
      <div className="w-64 h-full flex flex-col items-center overflow-scroll overflow-x-hidden" label="Cart-Items">
      {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <div className="flex flex-col items-center gap-y-10 my-auto">
            <Image src={tumbleweedPicture} height={100} width={100} alt="tumbleweed" className="tumbleweed"/>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center w-full h-1/6">
        <div className="flex justify-between gap-x-2">
          <p className="font-bold">Total:</p>
          <p>{cartTotalPrice.toFixed(2)} $</p>
        </div>
        <Link className="w-fit border border-green-500 p-1 rounded-sm" href='/checkout'>CHECKOUT</Link>
      </div>
    </div>
  )
}

export default CartDropdown