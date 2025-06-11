import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, users, reactions, likes } from "@/lib/db/schema";
import { sql, gte } from "drizzle-orm";

export async function GET() {
  try {
    // Get posts created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [postsToday] = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(gte(posts.createdAt, today));

    // Get total active users (approximation using individual queries)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [activePostUsers] = await db
      .select({ count: sql<number>`count(DISTINCT ${posts.authorId})` })
      .from(posts)
      .where(gte(posts.createdAt, thirtyDaysAgo));

    const [activeLikeUsers] = await db
      .select({ count: sql<number>`count(DISTINCT ${likes.userId})` })
      .from(likes)
      .where(gte(likes.createdAt, thirtyDaysAgo));

    const [activeReactionUsers] = await db
      .select({ count: sql<number>`count(DISTINCT ${reactions.userId})` })
      .from(reactions)
      .where(gte(reactions.createdAt, thirtyDaysAgo));

    // This is an approximation since we can't easily get exact unique count across tables
    const estimatedActiveUsers = Math.max(
      activePostUsers?.count || 0,
      activeLikeUsers?.count || 0,
      activeReactionUsers?.count || 0
    );

    // Get total reactions (likes + emoji reactions)
    const [totalLikes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(likes);

    const [totalReactions] = await db
      .select({ count: sql<number>`count(*)` })
      .from(reactions);

    const totalEngagement = (totalLikes?.count || 0) + (totalReactions?.count || 0);

    // Get total users
    const [totalUsers] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    return NextResponse.json({
      activeUsers: estimatedActiveUsers,
      postsToday: postsToday?.count || 0,
      totalReactions: totalEngagement,
      totalUsers: totalUsers?.count || 0,
    });
  } catch (error) {
    console.error("Error fetching community stats:", error);
    return NextResponse.json({ error: "Failed to fetch community stats" }, { status: 500 });
  }
} 