'use client'
import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import Link from 'next/link';
import Image from 'next/image';
import emptyIcon from '/app/assets/icons/checkout/cactus.png'

const Checkout = () => {
    // State variable to store the client secret received from the server
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

  return (
    <div className='flex-row justify-between'>
    <div className='flex justify-center mb-10'>
      <h1 className='text-2xl'>Checkout</h1>
    </div>
    {
      cartItems.length === 0 ? (
        <div className='  mt-20'>
        <div className='flex justify-center '>
          <Image src={emptyIcon} height={250} width={250} alt='sad cactus' />
        </div>
          <div className='flex justify-center mt-10 tracking-widest'>
            <p>Your cart is empty</p>
          </div>
        </div>
      ) : (
        <>
        <div className="flex-row border-t border-black">
          {cartItems.map((cartItem) => {
            return <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
          })}
        </div>
        <div className='flex justify-end my-8'>
          <h2 className='mr-[10vw]'>Total: {cartTotal.toFixed(2)}</h2>
        </div>
        <div className='flex justify-end'>
          <Link href="/payment" className='bg-[#F7D65A] text-black rounded-md p-2 mr-[10vw] text-lg '>Payment</Link>
        </div>
        </>
      )
    }
  </div>
  )
}

export default Checkout