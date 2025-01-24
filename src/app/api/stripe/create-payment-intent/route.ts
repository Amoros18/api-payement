import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface Item {
  id: string;
  quantity: number;
}

interface RequestBody {
  items: Item[];
}

interface PaymentIntentResponse {
  clientSecret: string;
}

export async function POST(request: NextRequest) {
  
  try {
    // const { items }: RequestBody = await request.json();
    // const amount = items[0].amount;

    const { amount } = await request.json();
    // const amount = items[0];

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "xaf",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // alert(amount);
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.log('Internal Error:', errorMessage);
    return NextResponse.json(
      { error: 'Internal Error', message: (error as Error).message },
      { status: 500 }
    );
  }
}