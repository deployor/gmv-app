import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AuthService from './authService';

const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface News {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  authorId: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  authorId: string;
  targetAudience?: any;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = AuthService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid, logout user
          await AuthService.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // News endpoints
  async getNews(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedResponse<News>> {
    try {
      const params: any = { page, limit };
      if (search) params.search = search;

      const response: AxiosResponse<PaginatedResponse<News>> = await this.api.get('/news', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async getNewsById(id: string): Promise<ApiResponse<News>> {
    try {
      const response: AxiosResponse<ApiResponse<News>> = await this.api.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching news by ID:', error);
      throw error;
    }
  }

  async getRecentNews(limit: number = 5): Promise<ApiResponse<News[]>> {
    try {
      const response: AxiosResponse<ApiResponse<News[]>> = await this.api.get('/news/recent', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent news:', error);
      throw error;
    }
  }

  // Announcements endpoints
  async getActiveAnnouncements(): Promise<ApiResponse<Announcement[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Announcement[]>> = await this.api.get('/announcements');
      return response.data;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  }

  async getAnnouncementById(id: string): Promise<ApiResponse<Announcement>> {
    try {
      const response: AxiosResponse<ApiResponse<Announcement>> = await this.api.get(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching announcement by ID:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export default ApiService.getInstance(); 