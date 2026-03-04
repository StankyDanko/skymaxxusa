import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
import Stripe from "stripe";

/**
 * ─────────────────────────────────────────────────────────────
 * SkyMaxxUSA — Stripe Checkout API
 * ─────────────────────────────────────────────────────────────
 *
 * Supports two checkout types:
 *   type: "hardware"  — One-time radio purchase (includes 1st year of service)
 *   type: "renewal"   — Annual service renewal for an existing radio
 *
 * All pricing is pulled from siteConfig.js on the server side
 * to keep it consistent with the frontend constants.
 *
 * NOTE: Checkout URLs must be opened as a popup in the builder
 *   window.open(url, "_blank", "popup");
 * ─────────────────────────────────────────────────────────────
 */

// ── In-memory pricing map (mirrors siteConfig.js) ─────────────
// Update these to match your siteConfig.js prices exactly.
const PRICING = {
  hardware: {
    name: "SkyMaxx Pro LTE — Hardware Purchase (Includes 1 Year Service)",
    amount_cents: 39900, // $399.00
  },
  "yearly-standard": {
    name: "SkyMaxx Pro LTE — Standard Annual Service Renewal",
    amount_cents: 19900, // $199.00
  },
  "yearly-pro": {
    name: "SkyMaxx Pro LTE — Pro Annual Service Renewal",
    amount_cents: 29900, // $299.00
  },
};

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return Response.json(
        { error: "You must be signed in to checkout." },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    const body = await request.json();
    const { type, planId, radioId, redirectURL } = body;

    // ── Determine pricing ──────────────────────────────────────
    let priceKey = type === "hardware" ? "hardware" : planId;
    const pricing = PRICING[priceKey];

    if (!pricing) {
      return Response.json(
        { error: "Invalid product or plan." },
        { status: 400 },
      );
    }

    // ── Get or create Stripe customer ──────────────────────────
    const [user] = await sql`
      SELECT stripe_id FROM auth_users WHERE id = ${userId}
    `;

    let stripeCustomerId = user?.stripe_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { skymaxx_user_id: String(userId) },
      });
      stripeCustomerId = customer.id;
      await sql`
        UPDATE auth_users SET stripe_id = ${stripeCustomerId} WHERE id = ${userId}
      `;
    }

    // ── Create order record (pending) ──────────────────────────
    const [order] = await sql`
      INSERT INTO orders (user_id, order_type, amount_cents, status, radio_id)
      VALUES (
        ${userId},
        ${type === "hardware" ? "hardware" : "renewal"},
        ${pricing.amount_cents},
        'pending',
        ${radioId || null}
      )
      RETURNING id
    `;

    const orderId = order.id;

    // ── Create Stripe checkout session ─────────────────────────
    const safeRedirectURL =
      redirectURL || process.env.APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: pricing.name },
            unit_amount: pricing.amount_cents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${safeRedirectURL}?order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: safeRedirectURL,
      metadata: {
        skymaxx_user_id: String(userId),
        skymaxx_order_id: String(orderId),
        checkout_type: type,
        plan_id: planId || "",
        radio_id: radioId ? String(radioId) : "",
      },
    });

    // Save Stripe session ID to the order
    await sql`
      UPDATE orders SET stripe_session_id = ${checkoutSession.id} WHERE id = ${orderId}
    `;

    /**
     * IMPORTANT: Return the Stripe checkout URL.
     * In the builder, always open this as a popup:
     *   window.open(url, "_blank", "popup");
     */
    return Response.json({ url: checkoutSession.url, orderId });
  } catch (err) {
    console.error("POST /api/checkout error:", err);
    return Response.json(
      { error: "Checkout failed. Please try again or contact support." },
      { status: 500 },
    );
  }
}
