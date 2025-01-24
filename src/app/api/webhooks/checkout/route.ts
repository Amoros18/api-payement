// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2024-12-18.acacia',
// });

// export async function POST(req: NextRequest) {
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   if (!endpointSecret) {
//     console.error('Stripe webhook secret not configured');
//     return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
//   }

//   const sig = req.headers.get('stripe-signature');

//   if (!sig) {
//     console.error('Missing Stripe signature header');
//     return NextResponse.json({ error: 'Missing Stripe signature header' }, { status: 400 });
//   }

//   let event: Stripe.Event;
//   // const body = await req.text(); // Stripe nécessite la requête brute (texte)
//   // const buf = Buffer.from(body);
//   const body = await buffer(req);

//   try {
//     // const body = await req.text(); // Stripe nécessite la requête brute (texte)
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error('Webhook signature verification failed:', err.message);
//       return NextResponse.json(
//         {
//         error: `Webhook Error: ${err.message}`,
//         text: body.toString()
//        }, { status: 400 });
//     } else {
//       console.error('Webhook signature verification failed:', err);
//       return NextResponse.json({ error: 'Webhook Error',text: body.toString() }, { status: 400 });
//     }
//   }

//   // Gérer les types d'événements Stripe
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object as Stripe.PaymentIntent;
//       console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
//       // Ajoutez ici votre logique métier
//       break;

//     case 'invoice.payment_failed':
//       const invoice = event.data.object as Stripe.Invoice;
//       console.log(`Invoice payment failed: ${invoice.id}`);
//       // Ajoutez ici votre logique métier
//       break;

//     default:
//       console.warn(`Unhandled event type: ${event.type}`);
//   }

//   return NextResponse.json({ received: true }, { status: 200 });
// }

import Stripe from 'stripe';
import {NextApiRequest, NextApiResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
){
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  // const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET;

  // if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

      if (!sig) {
    console.error('Missing Stripe signature header');
    return NextResponse.json({ error: 'Missing Stripe signature header' }, { status: 400 });
    }


    let event: Stripe.Event;

    try {
      const body = await buffer(req);
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        {
        error: `Webhook Error: ${err.message}`,
        // text: body.toString()
       }, { status: 400 });
    } else {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ 
        error: 'Webhook Error',
        // text: body.toString()
       }, { status: 400 });
    }
  }

    // Successfully constructed event
    console.log('✅ Success:', event.id);

    // Cast event data to Stripe object
    if (event.type === 'payment_intent.succeeded') {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
    } else if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge;
      console.log(`💵 Charge id: ${charge.id}`);
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  }
  //  else {
  //   res.setHeader('Allow', 'POST');
  //   res.status(405).end('Method Not Allowed');
  // }
// };

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
};

// export default handler;