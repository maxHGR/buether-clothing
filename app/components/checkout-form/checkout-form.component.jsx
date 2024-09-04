"use client"
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../store/cart/cart.reducer";
import { addPaymentReceipt } from "../../utils/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartItems } from "../../store/cart/cart.selector";
 

export default function CheckoutForm() {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const router = useRouter();

  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  // Effect hook to handle payment status updates
  useEffect(() => {

    if (!stripe) {
      return;
    }

    // Retrieve client secret from URL parameters
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // If client secret is available, retrieve payment intent status
    if (clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        // Set message based on payment intent status
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!")
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      })
    }
  }, [stripe]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });


    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
        
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    await setIsLoading(false)
    
    if(paymentIntent.status === 'succeeded') {
      addPaymentReceipt(cartItems, currentUser.uid);
      dispatch(emptyCart());
      router.push('/payment-success')
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="flex justify-end">
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit" 
          className="border p-2 button-color text-gray-700 rounded-md my-[5vh]"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}