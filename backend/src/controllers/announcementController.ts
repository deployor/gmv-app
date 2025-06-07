import { Request, Response } from 'express';
import { AnnouncementService } from '../services/announcementService';

interface CreateAnnouncementRequest {
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  authorId: string;
  targetAudience?: Record<string, unknown>;
  expiresAt?: Date;
}

interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience?: Record<string, unknown>;
  isActive?: boolean;
  expiresAt?: Date;
}

export const getActiveAnnouncements = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcements = await AnnouncementService.getActiveAnnouncements();
    
    res.json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    console.error('Error fetching active announcements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch announcements',
    });
  }
};

export const getAllAnnouncements = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await AnnouncementService.getAllAnnouncements(page, limit);
    
    res.json({
      success: true,
      data: result.announcements,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch announcements',
    });
  }
};

export const getAnnouncementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const announcement = await announcementService.getAnnouncementById(id);
    
    if (!announcement) {
      res.status(404).json({
        success: false,
        error: 'Announcement not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch announcement',
    });
  }
};

export const createAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const announcementData: CreateAnnouncementRequest = {
      ...req.body,
      authorId: req.user?.id, // From auth middleware
    };
    
    const announcement = await announcementService.createAnnouncement(announcementData);
    
    res.status(201).json({
      success: true,
      data: announcement,
      message: 'Announcement created successfully',
    });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create announcement',
    });
  }
};

export const updateAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates: UpdateAnnouncementRequest = req.body;
    
    const announcement = await announcementService.updateAnnouncement(id, updates);
    
    if (!announcement) {
      res.status(404).json({
        success: false,
        error: 'Announcement not found',
      });
      return;
    }
    
    res.json({
      success: true,
      data: announcement,
      message: 'Announcement updated successfully',
    });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update announcement',
    });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const success = await announcementService.deleteAnnouncement(id);
    
    if (!success) {
      res.status(404).json({
        success: false,
        error: 'Announcement not found',
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete announcement',
    });
  }
}; 