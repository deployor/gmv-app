import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canteenMeals } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { meal } = await request.json();

    if (!meal || !meal.id) {
      return NextResponse.json({ error: "Meal data required" }, { status: 400 });
    }

    // Check if meal already exists in our database
    const existingMeal = await db
      .select()
      .from(canteenMeals)
      .where(eq(canteenMeals.id, meal.id))
      .limit(1);

    if (existingMeal.length === 0) {
      // Insert new meal into our database
      await db.insert(canteenMeals).values({
        id: meal.id,
        name: meal.name,
        description: meal.description,
        category: meal.category,
        allergens: JSON.stringify(meal.allergens || []),
        nutritionInfo: JSON.stringify(meal.nutritionInfo || {}),
        price: meal.price,
        availableDate: new Date(meal.availableDate),
        dayOfWeek: meal.dayOfWeek,
      });
    } else {
      // Update existing meal
      await db
        .update(canteenMeals)
        .set({
          name: meal.name,
          description: meal.description,
          category: meal.category,
          allergens: JSON.stringify(meal.allergens || []),
          nutritionInfo: JSON.stringify(meal.nutritionInfo || {}),
          price: meal.price,
          availableDate: new Date(meal.availableDate),
          dayOfWeek: meal.dayOfWeek,
          updatedAt: new Date(),
        })
        .where(eq(canteenMeals.id, meal.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error syncing meal:", error);
    return NextResponse.json(
      { error: "Failed to sync meal" },
      { status: 500 }
    );
  }
} 