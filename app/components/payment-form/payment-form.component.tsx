"use client";

import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";

import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { emptyCart } from "../../store/cart/cart.reducer";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  
  const clearCartHandler = () => dispatch(emptyCart());

  const payNotify = () => toast.success("successfull payment!", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if(error) {
      console.log(error);
      alert(error);
      return
    }

    const { id } = paymentMethod;

    // show Loading symbol on loading, while payment is processed

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: `${cartTotal}`, paymentMethodId: id }, // Include paymentMethodId inside the data object
      });

      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: id,
      });

      payNotify();
      clearCartHandler();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col border border-gray-600 rounded-lg w-2/3 p-5" onSubmit={onSubmit}>
      <CardElement />
      <br/>
      <button className="border border-black p-1 rounded-sm self-end" type="submit">Submit</button>
    </form>
  );
}