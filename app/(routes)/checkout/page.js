'use client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from 'react-redux';


import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from "../../components/payment-form/payment-form.component.tsx";
import { useEffect } from 'react';
import { setIsCartOpen } from '../../store/cart/cart.reducer';


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);


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
    <div className="flex  justify-center items-center">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  </div>
  )
}

export default Checkout