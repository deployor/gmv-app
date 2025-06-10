import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { likes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

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
    const userId = session.user.id;

    // Check if like already exists
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)))
      .limit(1);

    if (existingLike.length > 0) {
      // Unlike - remove the like
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));

      return NextResponse.json({ liked: false, message: "Post unliked" });
    } else {
      // Like - add the like
      await db
        .insert(likes)
        .values({
          userId,
          postId,
          commentId: null,
        });

      return NextResponse.json({ liked: true, message: "Post liked" });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ liked: false });
    }

    const { postId } = await params;
    const userId = session.user.id;

    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)))
      .limit(1);

    return NextResponse.json({ liked: existingLike.length > 0 });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json({ liked: false });
  }
} 