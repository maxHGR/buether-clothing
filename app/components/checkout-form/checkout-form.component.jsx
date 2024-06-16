//checkoutForm.js
"use client"
// Import necessary dependencies and components
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
 
 

// CheckoutForm component definition
export default function CheckoutForm() {
  // Access the Stripe instance using the useStripe hook
  const stripe = useStripe();
  // Access the Elements instance using the useElements hook
  const elements = useElements();
  const router = useRouter();

  // State variables for displaying messages and loading state
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effect hook to handle payment status updates
  useEffect(() => {
    // Check if Stripe instance is available
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
            setMessage("Payment succeeded!");
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
      });
    }
  }, [stripe]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if Stripe and Elements instances are available
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Confirm payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Specify return URL after payment completion
        return_url: "https://ether-clothing.vercel.app/payment-success",
      },
    });

    // Handle payment confirmation result
    if (error) {
      // If there's an error, display error message
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    // Reset loading state
    await setIsLoading(false)
    router.push('/payment-success');
  };

  // Payment element options
  const paymentElementOptions = {
    layout: "tabs",
  };

  // Render form with payment element, submit button, and message display
  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      {/* PaymentElement component for Stripe.js integration */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      {/* Submit button with loading spinner */}
      <div className="flex justify-end">
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit" 
          className="border p-2 bg-indigo-500 text-white rounded-md my-[5vh]"
        >
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}