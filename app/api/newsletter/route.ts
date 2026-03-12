import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "Newsletter service not configured" },
      { status: 500 }
    );
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    // Step 1: Create or update subscriber
    const subscriberRes = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          fields: { name: name || "" },
        }),
      }
    );

    if (!subscriberRes.ok) {
      const data = await subscriberRes.json().catch(() => ({}));
      const message =
        (data as Record<string, string>).message || "Subscription failed";
      return NextResponse.json({ error: message }, { status: subscriberRes.status });
    }

    const subscriber = (await subscriberRes.json()) as { data?: { id?: string } };
    const subscriberId = subscriber?.data?.id;

    // Step 2: Add subscriber to group (separate API call)
    if (groupId && subscriberId) {
      await fetch(
        `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${groupId}`,
        {
          method: "POST",
          headers,
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
