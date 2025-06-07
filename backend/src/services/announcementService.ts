import { eq, desc, and, gte, or, isNull } from 'drizzle-orm';
import { db } from '../database/connection';
import { announcements, users } from '../database/schema';
import { Announcement, NewAnnouncement } from '../types';

export class AnnouncementService {
  public static async getActiveAnnouncements(): Promise<Announcement[]> {
    try {
      const result = await db
        .select()
        .from(announcements)
        .where(
          and(
            eq(announcements.isActive, true),
            or(
              isNull(announcements.expiresAt),
              gte(announcements.expiresAt, new Date())
            )
          )
        )
        .orderBy(desc(announcements.createdAt));

      return result;
    } catch (error) {
      console.error('Error fetching active announcements:', error);
      return [];
    }
  }

  public static async getAnnouncementById(id: string): Promise<Announcement | null> {
    try {
      const result = await db
        .select()
        .from(announcements)
        .where(eq(announcements.id, id))
        .limit(1);

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error fetching announcement by ID:', error);
      return null;
    }
  }

  public static async createAnnouncement(announcementData: NewAnnouncement): Promise<Announcement> {
    try {
      const result = await db.insert(announcements).values(announcementData).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw new Error('Failed to create announcement');
    }
  }

  public static async updateAnnouncement(
    id: string,
    updates: Partial<NewAnnouncement>
  ): Promise<Announcement | null> {
    try {
      const result = await db
        .update(announcements)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(announcements.id, id))
        .returning();

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw new Error('Failed to update announcement');
    }
  }

  public static async deleteAnnouncement(id: string): Promise<boolean> {
    try {
      const result = await db
        .delete(announcements)
        .where(eq(announcements.id, id))
        .returning();

      return result.length > 0;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw new Error('Failed to delete announcement');
    }
  }

  public static async getAnnouncementsByPriority(priority: string): Promise<Announcement[]> {
    try {
      const result = await db
        .select()
        .from(announcements)
        .where(
          and(
            eq(announcements.priority, priority as any),
            eq(announcements.isActive, true),
            or(
              isNull(announcements.expiresAt),
              gte(announcements.expiresAt, new Date())
            )
          )
        )
        .orderBy(desc(announcements.createdAt));

      return result;
    } catch (error) {
      console.error('Error fetching announcements by priority:', error);
      return [];
    }
  }
} 