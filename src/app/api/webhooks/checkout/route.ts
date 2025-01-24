import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'micro';
import { IncomingMessage } from 'http';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  // const buf = Buffer.from(await request.text());
  const req = request as unknown as IncomingMessage;
  const buf = await buffer(req);
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    if (err instanceof Error) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
    } else {
      console.log(`⚠️  Webhook signature verification failed.`, err);
    }
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    case 'payment_intent.payment_failed':
      const paymentFailedIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentFailedIntent.amount} failed.`);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}