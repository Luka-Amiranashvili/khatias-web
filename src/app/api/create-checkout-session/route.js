import Stripe from "stripe";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create rate limiter: 5 requests per minute
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "60s"),
  analytics: true,
});

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
      });
    }

    const body = await req.json();
    const { amount } = body;

    const numericAmount = parseFloat(amount);

    if (
      isNaN(numericAmount) ||
      numericAmount <= 0 ||
      numericAmount > 10000 // Max 10,000 EUR for donation
    ) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
      });
    }

    const successUrl = "http://localhost:3000/thank-you?type=donation";
    const cancelUrl = "http://localhost:3000/donate";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Donation",
            },
            unit_amount: Math.round(numericAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("❌ Stripe Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
