import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, name, content } = req.body;

  if (!email || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS letters (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        name TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        to_sent_date TIMESTAMP,
        status TEXT DEFAULT 'pending'
      );
    `;

    // 2. Set send date (1 minute from now for MVP)
    const toSentDate = new Date();
    toSentDate.setMinutes(toSentDate.getMinutes() + 1);

    // 3. Insert data
    await sql`
      INSERT INTO letters (email, name, content, to_sent_date)
      VALUES (${email}, ${name}, ${content}, ${toSentDate.toISOString()})
    `;

    return res
      .status(201)
      .json({ success: true, message: "Save email successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
