import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { signOutUser } from "../../utils/firebase.utils";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Handler function for the API endpoint
export async function POST(NextRequest) {
  const {data} = await NextRequest.json();
  const {amount, items} = data;
  signOutUser();
  /*
      calculate the amount from the items you receive here on the server
      because of safety
  */
  try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:  Math.round(Number(amount) * 100), 
    currency: "eur", 
    automatic_payment_methods: {
      enabled: true, // Enable automatic payment methods
    },
  });

  return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}