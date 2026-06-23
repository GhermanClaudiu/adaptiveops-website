import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getWorkshop } from "@/lib/content/workshops";

/**
 * Workshop testimonials (v1): a simple Resend email to the founder, who curates
 * the good ones into the registry by hand. Same lightweight pattern as
 * /api/contact — no DB, no Academy dependency. Migrating onto the Academy
 * marketing endpoint (keyed by slug, unified with tool testimonials) is a v2.
 */

const MAX_QUOTE = 800;

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured, don't block submissions on anti-spam.
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const workshopSlug = String(body.workshopSlug ?? "").trim();
  const name = String(body.name ?? "").trim();
  const role = String(body.role ?? "").trim();
  const company = String(body.company ?? "").trim();
  const rating = Number(body.rating ?? 0);
  const quote = String(body.quote ?? "").trim();
  const consent = Boolean(body.consent);
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined;

  const workshop = getWorkshop(workshopSlug);

  // Server-side validation.
  if (!workshop) {
    return NextResponse.json({ error: "Unknown workshop." }, { status: 400 });
  }
  if (!name || !role || !quote || !consent) {
    return NextResponse.json(
      { error: "Please fill in name, role, your testimonial and the consent box." },
      { status: 400 },
    );
  }
  if (quote.length > MAX_QUOTE) {
    return NextResponse.json(
      { error: `Please keep your testimonial under ${MAX_QUOTE} characters.` },
      { status: 400 },
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Please pick a rating." }, { status: 400 });
  }

  const ok = await verifyTurnstile(turnstileToken);
  if (!ok) {
    return NextResponse.json(
      { error: "Anti-spam check failed. Please try again." },
      { status: 400 },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@adaptiveops.eu",
      to: "ghermanclaudiu77@gmail.com",
      subject: `New workshop testimonial — ${workshop.title}`,
      html: `
        <h2>New workshop testimonial</h2>
        <p><strong>Workshop:</strong> ${workshop.title} (${workshop.slug})</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <hr />
        <p><strong>Testimonial:</strong></p>
        <p>${quote}</p>
        <hr />
        <p style="color:#6B7280;font-size:13px">
          The participant consented to AdaptiveOps publishing this testimonial.
          Add it to <code>lib/content/workshops.ts</code> if you want it on the site.
        </p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 },
    );
  }
}
