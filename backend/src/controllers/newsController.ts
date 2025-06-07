import { Request, Response } from 'express';
import { NewsService } from '../services/newsService';
import { asyncHandler } from '../middleware/errorHandler';

export const getAllNews = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  try {
    const result = await NewsService.getAllNews(page, limit, search);
    res.json(result);
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
    });
  }
});

export const getNewsById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const news = await NewsService.getNewsById(id);
    
    if (!news) {
      res.status(404).json({
        success: false,
        error: 'News article not found',
      });
      return;
    }

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Get news by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news article',
    });
  }
});

export const createNews = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
    return;
  }

  const { title, content, excerpt, featuredImage, isPublished } = req.body;

  if (!title || !content) {
    res.status(400).json({
      success: false,
      error: 'Title and content are required',
    });
    return;
  }

  try {
    const newsData = {
      title,
      content,
      excerpt,
      featuredImage,
      authorId: req.user.id,
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
    };

    const news = await NewsService.createNews(newsData);
    
    res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create news article',
    });
  }
});

export const updateNews = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
    return;
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    const news = await NewsService.updateNews(id, updates);
    
    if (!news) {
      res.status(404).json({
        success: false,
        error: 'News article not found',
      });
      return;
    }

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update news article',
    });
  }
});

export const deleteNews = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
    return;
  }

  const { id } = req.params;

  try {
    const deleted = await NewsService.deleteNews(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'News article not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'News article deleted successfully',
    });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete news article',
    });
  }
});

export const getRecentNews = asyncHandler(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const news = await NewsService.getRecentNews(limit);
    
    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error('Get recent news error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent news',
    });
  }
}); 