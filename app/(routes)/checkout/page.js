'use client'

import { useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';
import CheckoutItem from '@/app/components/checkout-item/checkout-item.component';


const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);


  console.log(cartItems)

  return (
    <div className='flex-row justify-between'>
    <div className="flex-row">
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      })}
    </div>
    <div className='my-8 ml-auto'>
      <h2>Total: {cartTotal}</h2>
    </div>
  </div>
  )
}

export default Checkout