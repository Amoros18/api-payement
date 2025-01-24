// import { NextRequest, NextResponse } from 'next/server';
// import { buffer } from 'micro';
// import { IncomingMessage } from 'http';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-12-18.acacia',
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request: NextRequest) {
//   // const buf = Buffer.from(await request.text());
//   const text = await request.text();
//   const buf = Buffer.from(text);
//   const sig = request.headers.get('stripe-signature');


//   let event;
//   // return NextResponse.json({ error: 'Texte.' + sig}, { status: 400 });


//   try {
//     event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//     } else {
//       console.log(`⚠️  Webhook signature verification failed.`, err);
//     }
//     return NextResponse.json(
//       {
//         error: 'Webhook signature verification failed.',
//         message: err instanceof Error ? err.message : err,
//         sig: sig,
//         buf: buf.toString('utf-8'),
//       },
//       { status: 400 }
//     ); }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       break;
//     case 'payment_intent.payment_failed':
//       const paymentFailedIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentFailedIntent.amount} failed.`);
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return NextResponse.json({ received: true });
// }
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.error('Stripe webhook secret not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing Stripe signature header');
    return NextResponse.json({ error: 'Missing Stripe signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  const body = await req.text(); // Stripe nécessite la requête brute (texte)
  const buf = Buffer.from(body);

  try {
    // const body = await req.text(); // Stripe nécessite la requête brute (texte)
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        {
        error: `Webhook Error: ${err.message}`,
        text: body.toString()
       }, { status: 400 });
    } else {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Webhook Error',text: body.toString() }, { status: 400 });
    }
  }

  // Gérer les types d'événements Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
      // Ajoutez ici votre logique métier
      break;

    case 'invoice.payment_failed':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Invoice payment failed: ${invoice.id}`);
      // Ajoutez ici votre logique métier
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
