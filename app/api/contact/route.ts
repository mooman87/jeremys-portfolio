import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";          // Nodemailer needs Node runtime, not edge
export const dynamic = "force-dynamic";   // avoid caching

const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  website: z.string().optional(), // honeypot - must be empty
});

function htmlTemplate(data: { name: string; email: string; message: string }) {
  const { name, email, message } = data;
  return `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;line-height:1.6;color:#111;">
      <h2 style="margin:0 0 8px;">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="white-space:pre-wrap;"><strong>Message:</strong><br>${escapeHtml(message)}</p>
    </div>
  `;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot
    if (website && website.trim().length > 0) {
      // Pretend success, but don't send anything
      return NextResponse.json({ ok: true });
    }

    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    const to = process.env.CONTACT_TO!;
    const from = process.env.CONTACT_FROM || `Website <no-reply@${new URL(req.url).hostname}>`;

    if (!host || !user || !pass || !to) {
      return NextResponse.json(
        { ok: false, error: "Server email not configured. Check .env.local." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, 
      auth: { user, pass },
    });

    const subject = `New message from ${name}`;
    const html = htmlTemplate({ name, email, message });
    const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: email, 
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
