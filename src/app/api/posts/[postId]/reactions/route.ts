import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { reactions, users } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;

    // Get reactions grouped by emoji with counts and user info
    const postReactions = await db
      .select({
        emoji: reactions.emoji,
        count: sql<number>`count(*)`,
        users: sql<string[]>`array_agg(${users.name})`,
        userIds: sql<string[]>`array_agg(${reactions.userId})`,
      })
      .from(reactions)
      .leftJoin(users, eq(reactions.userId, users.id))
      .where(eq(reactions.postId, postId))
      .groupBy(reactions.emoji);

    return NextResponse.json(postReactions);
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return NextResponse.json({ error: "Failed to fetch reactions" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;
    const { emoji } = await request.json();
    
    if (!emoji?.trim()) {
      return NextResponse.json({ error: "Emoji is required" }, { status: 400 });
    }

    const userId = session.user.id;

    // Check if user already reacted with this emoji
    const existingReaction = await db
      .select()
      .from(reactions)
      .where(and(
        eq(reactions.userId, userId), 
        eq(reactions.postId, postId),
        eq(reactions.emoji, emoji)
      ))
      .limit(1);

    if (existingReaction.length > 0) {
      // Remove reaction if it exists
      await db
        .delete(reactions)
        .where(and(
          eq(reactions.userId, userId),
          eq(reactions.postId, postId),
          eq(reactions.emoji, emoji)
        ));

      return NextResponse.json({ action: "removed", emoji });
    } else {
      // Add new reaction
      await db
        .insert(reactions)
        .values({
          userId,
          postId,
          emoji,
          commentId: null,
        });

      return NextResponse.json({ action: "added", emoji });
    }
  } catch (error) {
    console.error("Error toggling reaction:", error);
    return NextResponse.json({ error: "Failed to toggle reaction" }, { status: 500 });
  }
} 