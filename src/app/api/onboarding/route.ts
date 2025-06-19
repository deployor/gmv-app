import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { createId } from "@paralleldrive/cuid2";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const grade = (body?.grade ?? "").toString().trim();
  if (!grade) {
    return new Response("Grade is required", { status: 400 });
  }

  // Generate a studentId if the user doesn't have one yet
  // Using cuid2 but keep only first 8 characters for brevity
  const studentId = createId().slice(0, 8);

  try {
    await db
      .update(users)
      .set({ grade, studentId })
      .where(eq(users.id, session.user.id));
  } catch (err) {
    console.error("Error updating onboarding info", err);
    return new Response("Internal Server Error", { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
} 