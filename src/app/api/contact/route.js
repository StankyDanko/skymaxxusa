import sql from "@/app/api/utils/sql";

/**
 * POST /api/contact
 * Saves a contact form submission to the database.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    // Insert into database
    await sql`
      INSERT INTO contact_submissions (name, email, phone, message)
      VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${phone?.trim() || null}, ${message.trim()})
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
