import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts, categories } from "@/lib/db/schema";
import { sql, desc } from "drizzle-orm";

export async function GET() {
  try {
    // Get trending categories based on post counts in the last 7 days
    const trendingData = await db
      .select({
        name: posts.category,
        count: sql<number>`count(*)`,
      })
      .from(posts)
      .where(sql`${posts.createdAt} >= NOW() - INTERVAL '7 days'`)
      .groupBy(posts.category)
      .orderBy(desc(sql`count(*)`))
      .limit(6);

    // Get category details if they exist, otherwise use defaults
    const categoriesData = await db.select().from(categories);
    const categoryMap = new Map(categoriesData.map(cat => [cat.name, cat]));

    // Default category configs for fallback
    const defaultConfigs = {
      "Technology": { icon: "Zap", color: "from-blue-500 to-cyan-500" },
      "Design": { icon: "Camera", color: "from-purple-500 to-pink-500" },
      "Productivity": { icon: "Star", color: "from-green-500 to-emerald-500" },
      "Innovation": { icon: "Flame", color: "from-orange-500 to-red-500" },
      "General": { icon: "MessageCircle", color: "from-gray-500 to-gray-600" },
      "Discussion": { icon: "Users", color: "from-indigo-500 to-purple-500" },
    };

    const trending = trendingData.map(item => {
      const categoryName = item.name || "General";
      const categoryDetails = categoryMap.get(categoryName);
      const defaultConfig = defaultConfigs[categoryName as keyof typeof defaultConfigs] || defaultConfigs["General"];
      
      return {
        name: categoryName,
        count: item.count,
        icon: categoryDetails?.icon || defaultConfig.icon,
        color: categoryDetails?.color || defaultConfig.color,
      };
    });

    return NextResponse.json(trending);
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return NextResponse.json({ error: "Failed to fetch trending topics" }, { status: 500 });
  }
} 