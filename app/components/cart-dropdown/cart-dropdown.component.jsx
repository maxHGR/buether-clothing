
import { useDispatch, useSelector } from "react-redux"
import CartItem from "../cart-item/cart-item.component";
import Link from "next/link";
import { selectCartItems } from "../../store/cart/cart.selector";


const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);


  return (
    <div className="absolute w-72 h-80 flex flex-col justify-between p-5 border border-black bg-white z-10">
      <div className="w-64 flex flex-col overflow-scroll overflow-x-hidden" label="Cart-Items">
      {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <p className="text-base ml-12 mt-auto">Your cart is empty</p>
        )}
      </div>
      <Link className="mt-4 ml-auto border border-green-500 p-1 rounded-sm" href='/checkout'>CHECKOUT</Link>
    </div>
  )
}

export default CartDropdown