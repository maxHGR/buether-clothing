'use client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import axios from "axios";

import { selectCartTotal } from "../../store/cart/cart.selector";
import CheckoutForm from "../../components/checkout-form/checkout-form.component"


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const cartTotal = useSelector(selectCartTotal);

  // Effect hook to fetch the client secret when the component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      // Fetch the client secret from the server
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: cartTotal ? cartTotal : 0.5 }  // sent ammount or sample 
      });
      setClientSecret(data)
    }
    createPaymentIntent();
  }, [cartTotal]);

const appearance = {
  theme: 'stripe',
}

const options = {
  appearance,
  clientSecret
}

  return (
    <>
      <div className="flex  justify-center items-center">
          { clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>  
          ) : (
            null
          )}
      </div>
    </>
  )
}

export default Payment