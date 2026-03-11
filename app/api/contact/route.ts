import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, company, phone, interests, message } = await req.json();

  const interestList = Array.isArray(interests) && interests.length > 0
    ? interests.join(", ")
    : "Not specified";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@adaptiveops.eu",
      to: "ghermanclaudiu77@gmail.com",
      subject: `New contact request from ${name} — AdaptiveOps`,
      replyTo: email,
      html: `
        <h2>New contact request from AdaptiveOps website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Areas of Interest:</strong> ${interestList}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
