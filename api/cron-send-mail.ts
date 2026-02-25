import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security check: Vercel sets this header for CRON jobs
  // if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).end('Unauthorized');
  // }

  const sql = neon(process.env.DATABASE_URL!);

  const letters = await sql`
    SELECT * FROM letters 
    WHERE status = 'pending' AND to_sent_date <= NOW()
    LIMIT 5
  `;

  for (const letter of letters) {
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        // to: "delivered@resend.dev",
        to: letter.email,
        subject: `จดหมายจากคุณเมื่อห้าปีที่แล้ว: ${letter.name}`,
        html: `<p>ถึงตัวฉันในอีกห้าปีข้างหน้า,</p><p>${letter.content}</p><p>ด้วยรักและขอบคุณ</p>,<p>จาก ${letter.name} ${letter.created_at}</p>`,
      });

      await sql`UPDATE letters SET status = 'sent' WHERE id = ${letter.id}`;
    } catch (e) {
      console.error("Resend error:", e);
      return res.status(400).json({ success: false, count: 0 });
    }
  }

  return res
    .status(200)
    .json({ success: true, count: letters.length, data: letters });
}
