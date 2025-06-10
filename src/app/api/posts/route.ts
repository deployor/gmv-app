import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts, users, likes, comments } from "@/lib/db/schema";
import { eq, desc, gte, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get("time") || "today";
    
    // Calculate time boundaries
    const now = new Date();
    let timeStart: Date;
    
    switch (timeFilter) {
      case "today":
        timeStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        timeStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        timeStart = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        timeStart = new Date(now.getFullYear(), 0, 1);
        break;
      case "all":
        timeStart = new Date(0);
        break;
      default:
        timeStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Get posts with author info, like counts, and comment counts
    const postsWithDetails = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        authorId: posts.authorId,
        authorName: users.name,
        authorImage: users.image,
        likeCount: sql<number>`count(distinct ${likes.id})`,
        commentCount: sql<number>`count(distinct ${comments.id})`,
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(likes, eq(posts.id, likes.postId))
      .leftJoin(comments, eq(posts.id, comments.postId))
      .where(gte(posts.createdAt, timeStart))
      .groupBy(posts.id, users.name, users.image)
      .orderBy(desc(posts.createdAt));

    return NextResponse.json(postsWithDetails);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();
    
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title: title.trim(),
        content: content?.trim() || "",
        authorId: session.user.id,
      })
      .returning();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
} 