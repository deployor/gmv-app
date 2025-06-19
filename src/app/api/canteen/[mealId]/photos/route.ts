import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { canteenMealPhotos, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
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

    const photos = await db
      .select({
        id: canteenMealPhotos.id,
        photoUrl: canteenMealPhotos.photoUrl,
        caption: canteenMealPhotos.caption,
        isOfficial: canteenMealPhotos.isOfficial,
        createdAt: canteenMealPhotos.createdAt,
        userName: users.name,
        userImage: users.image,
        userId: canteenMealPhotos.userId,
      })
      .from(canteenMealPhotos)
      .leftJoin(users, eq(canteenMealPhotos.userId, users.id))
      .where(eq(canteenMealPhotos.mealId, mealId))
      .orderBy(desc(canteenMealPhotos.isOfficial), desc(canteenMealPhotos.createdAt));

    return NextResponse.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
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
    const { caption } = await request.json();

    // For now, we'll create a placeholder photo URL since actual file upload isn't implemented
    // In a real implementation, you would handle file upload here
    const placeholderPhotoUrl = `https://picsum.photos/400/300?random=${Date.now()}`;

    await db.insert(canteenMealPhotos).values({
      mealId,
      userId: session.user.id,
      photoUrl: placeholderPhotoUrl,
      caption: caption || null,
      isOfficial: 0,
    });

    return NextResponse.json({ 
      success: true, 
      photoUrl: placeholderPhotoUrl,
      message: "Photo placeholder created. In production, this would handle actual file upload." 
    });
  } catch (error) {
    console.error("Error adding photo:", error);
    return NextResponse.json(
      { error: "Failed to add photo" },
      { status: 500 }
    );
  }
} 