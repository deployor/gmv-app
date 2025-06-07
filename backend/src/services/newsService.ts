import { eq, desc, and, ilike, or } from 'drizzle-orm';
import { db } from '../database/connection';
import { news, users } from '../database/schema';
import { News, NewNews, PaginatedResponse } from '../types';

export class NewsService {
  public static async getAllNews(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedResponse<News & { author: { name: string; profilePicture?: string } }>> {
    try {
      const offset = (page - 1) * limit;
      
      const whereConditions = search
        ? and(
            eq(news.isPublished, true),
            or(
              ilike(news.title, `%${search}%`),
              ilike(news.content, `%${search}%`)
            )
          )
        : eq(news.isPublished, true);

      const results = await db
        .select({
          id: news.id,
          title: news.title,
          content: news.content,
          excerpt: news.excerpt,
          featuredImage: news.featuredImage,
          authorId: news.authorId,
          isPublished: news.isPublished,
          publishedAt: news.publishedAt,
          createdAt: news.createdAt,
          updatedAt: news.updatedAt,
          author: {
            name: users.displayName,
            profilePicture: users.profilePicture,
          },
        })
        .from(news)
        .leftJoin(users, eq(news.authorId, users.id))
        .where(whereConditions)
        .orderBy(desc(news.publishedAt))
        .limit(limit)
        .offset(offset);

      
      
      // Get total count
      const totalQuery = db
        .select({ count: news.id })
        .from(news)
        .where(eq(news.isPublished, true));
      
      const totalResults = await totalQuery;
      const total = totalResults.length;

      return {
        success: true,
        data: results as any,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news');
    }
  }

  public static async getNewsById(id: string): Promise<News | null> {
    try {
      const result = await db
        .select()
        .from(news)
        .where(eq(news.id, id))
        .limit(1);

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      return null;
    }
  }

  public static async createNews(newsData: NewNews): Promise<News> {
    try {
      const result = await db.insert(news).values(newsData).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating news:', error);
      throw new Error('Failed to create news');
    }
  }

  public static async updateNews(id: string, updates: Partial<NewNews>): Promise<News | null> {
    try {
      const result = await db
        .update(news)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(news.id, id))
        .returning();

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error updating news:', error);
      throw new Error('Failed to update news');
    }
  }

  public static async deleteNews(id: string): Promise<boolean> {
    try {
      const result = await db
        .delete(news)
        .where(eq(news.id, id))
        .returning();

      return result.length > 0;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw new Error('Failed to delete news');
    }
  }

  public static async getRecentNews(limit: number = 5): Promise<News[]> {
    try {
      const result = await db
        .select()
        .from(news)
        .where(eq(news.isPublished, true))
        .orderBy(desc(news.publishedAt))
        .limit(limit);

      return result;
    } catch (error) {
      console.error('Error fetching recent news:', error);
      return [];
    }
  }
} 