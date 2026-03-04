import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

/**
 * GET /api/dashboard/radios
 * Returns all radios linked to the authenticated user's account.
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const radios = await sql`
      SELECT
        id,
        serial_number,
        model_name,
        status,
        service_start_date,
        service_end_date,
        nickname,
        firmware_version,
        activated_at,
        created_at
      FROM user_radios
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return Response.json({ radios });
  } catch (err) {
    console.error("GET /api/dashboard/radios error:", err);
    return Response.json({ error: "Failed to load radios." }, { status: 500 });
  }
}
