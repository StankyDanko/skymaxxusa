import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

/**
 * GET /api/dashboard/payments
 * Returns combined order + payment history for the authenticated user.
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Join payments with orders to get full description context
    const payments = await sql`
      SELECT
        p.id,
        p.amount_cents,
        p.currency,
        p.status,
        p.description,
        p.paid_at,
        p.created_at,
        o.order_type,
        o.stripe_session_id
      FROM payments p
      LEFT JOIN orders o ON p.order_id = o.id
      WHERE p.user_id = ${userId}
      ORDER BY p.created_at DESC
      LIMIT 50
    `;

    return Response.json({ payments });
  } catch (err) {
    console.error("GET /api/dashboard/payments error:", err);
    return Response.json(
      { error: "Failed to load payment history." },
      { status: 500 },
    );
  }
}
