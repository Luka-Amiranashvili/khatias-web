"use server";

export async function POST(req) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ Missing STRIPE_SECRET_KEY");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration (Stripe)" }),
      { status: 500 }
    );
  }
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    console.error("❌ Missing Redis environment variables");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration (Redis)" }),
      { status: 500 }
    );
  }

  try {
    console.log("🔁 Received POST request");

    const Stripe = (await import("stripe")).default;
    const { Redis } = await import("@upstash/redis");
    const { Ratelimit } = await import("@upstash/ratelimit");

    console.log("✅ Modules imported");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(5, "60s"),
      analytics: true,
    });

    console.log("✅ Stripe, Redis, Ratelimit initialized");

    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
      });
    }

    const body = await req.json();
    const { amount } = body;
    console.log("📦 Request body parsed:", body);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0 || numericAmount > 10000) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Donation" },
            unit_amount: Math.round(numericAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/thank-you?type=donation`,
      cancel_url: `${baseUrl}/donate`,
    });

    console.log("✅ Stripe session created");

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("❌ Stripe or Redis Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
