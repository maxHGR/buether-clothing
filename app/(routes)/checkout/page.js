'use client'

import { useDispatch, useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import CheckoutItem from '@/app/components/checkout-item/checkout-item.component';
import { useEffect } from 'react';
import { setIsCartOpen } from '@/app/store/cart/cart.reducer';


const Checkout = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className='flex-row justify-between'>
    <div className="flex-row border-t border-black">
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      })}
    </div>
    <div className='my-8 ml-auto'>
      <h2>Total: {cartTotal.toFixed(2)}</h2>
    </div>
  </div>
  )
}

export default Checkout