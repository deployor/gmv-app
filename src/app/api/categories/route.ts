import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(categories.name);

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, icon, color } = await request.json();
    
    if (!name?.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    // Check if category already exists
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name.trim()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    const [newCategory] = await db
      .insert(categories)
      .values({
        name: name.trim(),
        description: description?.trim() || "",
        icon: icon || "MessageCircle",
        color: color || "from-gray-500 to-gray-600",
      })
      .returning();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
} 