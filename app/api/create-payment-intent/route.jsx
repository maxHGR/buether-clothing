import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// Import the Stripe SDK and initialize it with the secret API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Handler function for the API endpoint
export async function POST(NextRequest) {
  const {data} = await NextRequest.json();
  const {amount, items} = data;

  /*
      calculate the amount from the items you receive here on the server
      because of safety
  */

  try {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100, // Calculate order amount
    currency: "eur", 
    automatic_payment_methods: {
      enabled: true, // Enable automatic payment methods
    },
  });

  // Send the client secret of the PaymentIntent in the response
  return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}