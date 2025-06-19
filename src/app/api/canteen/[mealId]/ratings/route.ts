import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canteenRatings, users } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mealId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mealId } = await params;

    const ratings = await db
      .select({
        id: canteenRatings.id,
        rating: canteenRatings.rating,
        review: canteenRatings.review,
        taste: canteenRatings.taste,
        presentation: canteenRatings.presentation,
        value: canteenRatings.value,
        createdAt: canteenRatings.createdAt,
        userName: users.name,
        userImage: users.image,
        userId: canteenRatings.userId,
      })
      .from(canteenRatings)
      .leftJoin(users, eq(canteenRatings.userId, users.id))
      .where(eq(canteenRatings.mealId, mealId))
      .orderBy(desc(canteenRatings.createdAt));

    return NextResponse.json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return NextResponse.json(
      { error: "Failed to fetch ratings" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ mealId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mealId } = await params;
    const { rating, review, taste, presentation, value } = await request.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user has already rated this meal
    const existingRating = await db
      .select()
      .from(canteenRatings)
      .where(
        and(
          eq(canteenRatings.mealId, mealId),
          eq(canteenRatings.userId, session.user.id)
        )
      )
      .limit(1);

    if (existingRating.length > 0) {
      // Update existing rating
      await db
        .update(canteenRatings)
        .set({
          rating,
          review,
          taste,
          presentation,
          value,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(canteenRatings.mealId, mealId),
            eq(canteenRatings.userId, session.user.id)
          )
        );
    } else {
      // Create new rating
      await db.insert(canteenRatings).values({
        mealId,
        userId: session.user.id,
        rating,
        review,
        taste,
        presentation,
        value,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving rating:", error);
    return NextResponse.json(
      { error: "Failed to save rating" },
      { status: 500 }
    );
  }
} 