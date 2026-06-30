import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ZodError, type ZodSchema } from "zod";

/** Ensures the caller is an authenticated admin. Returns null if OK, or a 401 response. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status: 400 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export async function parseBody<T>(
  request: Request,
  schema: ZodSchema<T>
): Promise<{ data: T } | { error: NextResponse }> {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    return { data };
  } catch (e) {
    if (e instanceof ZodError) {
      return { error: badRequest("Validation failed", e.flatten()) };
    }
    return { error: badRequest("Invalid JSON body") };
  }
}
