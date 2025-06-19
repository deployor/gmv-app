import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canteenMeals, canteenRatings, canteenMealPhotos, users } from "@/lib/db/schema";
import { eq, desc, sql, and, gte } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get("timeFilter") || "week";
    const dayFilter = searchParams.get("dayFilter");
    const category = searchParams.get("category");

    // Calculate date range based on time filter
    const now = new Date();
    let startDate = new Date();
    
    switch (timeFilter) {
      case "today":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate.setDate(now.getDate() - now.getDay()); // Start of current week
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate.setDate(1); // Start of current month
        startDate.setHours(0, 0, 0, 0);
        break;
      default:
        startDate = new Date(0); // Beginning of time
    }

    // Build query conditions
    const conditions = [gte(canteenMeals.availableDate, startDate)];
    
    if (dayFilter) {
      conditions.push(eq(canteenMeals.dayOfWeek, dayFilter));
    }
    
    if (category) {
      conditions.push(eq(canteenMeals.category, category));
    }

    // Fetch meals with ratings and photos
    const mealsWithData = await db
      .select({
        id: canteenMeals.id,
        name: canteenMeals.name,
        description: canteenMeals.description,
        category: canteenMeals.category,
        allergens: canteenMeals.allergens,
        nutritionInfo: canteenMeals.nutritionInfo,
        price: canteenMeals.price,
        availableDate: canteenMeals.availableDate,
        dayOfWeek: canteenMeals.dayOfWeek,
        createdAt: canteenMeals.createdAt,
        avgRating: sql<number>`COALESCE(AVG(${canteenRatings.rating}), 0)`,
        ratingCount: sql<number>`COUNT(${canteenRatings.id})`,
        photoCount: sql<number>`COUNT(DISTINCT ${canteenMealPhotos.id})`,
      })
      .from(canteenMeals)
      .leftJoin(canteenRatings, eq(canteenMeals.id, canteenRatings.mealId))
      .leftJoin(canteenMealPhotos, eq(canteenMeals.id, canteenMealPhotos.mealId))
      .where(and(...conditions))
      .groupBy(canteenMeals.id)
      .orderBy(desc(canteenMeals.availableDate));

    // Fetch photos for each meal (limit to 3 per meal for preview)
    const mealsWithPhotos = await Promise.all(
      mealsWithData.map(async (meal) => {
        const photos = await db
          .select({
            id: canteenMealPhotos.id,
            photoUrl: canteenMealPhotos.photoUrl,
            caption: canteenMealPhotos.caption,
            isOfficial: canteenMealPhotos.isOfficial,
            userName: users.name,
            userImage: users.image,
          })
          .from(canteenMealPhotos)
          .leftJoin(users, eq(canteenMealPhotos.userId, users.id))
          .where(eq(canteenMealPhotos.mealId, meal.id))
          .orderBy(desc(canteenMealPhotos.isOfficial), desc(canteenMealPhotos.createdAt))
          .limit(3);

        return {
          ...meal,
          photos,
          allergens: meal.allergens ? JSON.parse(meal.allergens) : [],
          nutritionInfo: meal.nutritionInfo ? JSON.parse(meal.nutritionInfo) : null,
        };
      })
    );

    return NextResponse.json(mealsWithPhotos);
  } catch (error) {
    console.error("Error fetching canteen meals:", error);
    return NextResponse.json(
      { error: "Failed to fetch canteen meals" },
      { status: 500 }
    );
  }
} 