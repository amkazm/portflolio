import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { ok, badRequest } from "@/lib/api";

// Very small in-memory rate limiter (per server instance).
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return badRequest("Too many requests. Please try again shortly.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", parsed.error.flatten());
  }

  // Honeypot: bots fill the hidden `website` field.
  if (parsed.data.website) {
    return ok({ success: true }); // pretend success, drop silently
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    },
  });

  // Optional: send email via Resend if configured.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (key && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: parsed.data.email,
          subject: `New portfolio message from ${parsed.data.name}`,
          text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
        }),
      });
    } catch {
      // Stored in DB regardless; ignore email transport failures.
    }
  }

  return ok({ success: true }, 201);
}
