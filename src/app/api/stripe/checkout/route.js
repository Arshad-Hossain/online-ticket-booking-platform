import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const body = await req.json();
    const { booking } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: booking.ticketTitle,
              description: `${booking.from} → ${booking.to}`,
            },
            unit_amount: booking.unitPrice * 100, // cents
          },
          quantity: booking.quantity,
        },
      ],

      metadata: {
        bookingId: booking._id,
        userEmail: booking.userEmail,
      },

      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Stripe session failed" }, { status: 500 });
  }
}
