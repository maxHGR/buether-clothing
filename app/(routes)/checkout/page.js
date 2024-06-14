'use client'
import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Link from 'next/link';


const Checkout = () => {
    // State variable to store the client secret received from the server
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

  return (
    <div className='flex-row justify-between'>
    <div className="flex-row border-t border-black">
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      })}
    </div>
    <div className='flex justify-end my-8'>
      <h2 className='mr-[10vw]'>Total: {cartTotal.toFixed(2)}</h2>
    </div>
    <div className='flex justify-end'>
      <Link href="/payment" className='border bg-indigo-500 text-white rounded-md p-2 mr-[10vw] text-lg '>Payment</Link>
    </div>
  </div>
  )
}

export default Checkout