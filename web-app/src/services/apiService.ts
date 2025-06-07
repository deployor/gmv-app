import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T = unknown> {
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
  targetAudience?: Record<string, unknown>;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  profilePicture?: string;
  isActive: boolean;
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
        const token = this.getStoredToken();
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
          // Token expired or invalid, redirect to login, LEARNED FROM PAST MISSTAKES AT PFP
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
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

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  // news endpoints
  async getNews(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedResponse<News>> {
    try {
      const params: Record<string, unknown> = { page, limit };
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

  async createNews(newsData: Partial<News>): Promise<ApiResponse<News>> {
    try {
      const response: AxiosResponse<ApiResponse<News>> = await this.api.post('/news', newsData);
      return response.data;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  async updateNews(id: string, updates: Partial<News>): Promise<ApiResponse<News>> {
    try {
      const response: AxiosResponse<ApiResponse<News>> = await this.api.put(`/news/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }

  async deleteNews(id: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.api.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting news:', error);
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

  async createAnnouncement(announcementData: Partial<Announcement>): Promise<ApiResponse<Announcement>> {
    try {
      const response: AxiosResponse<ApiResponse<Announcement>> = await this.api.post('/announcements', announcementData);
      return response.data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  }

  async updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<ApiResponse<Announcement>> {
    try {
      const response: AxiosResponse<ApiResponse<Announcement>> = await this.api.put(`/announcements/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }
  }

  async deleteAnnouncement(id: string): Promise<ApiResponse> {
    try {
      const response: AxiosResponse<ApiResponse> = await this.api.delete(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }
  }

  // Users endpoints (for admin)
  async getAllUsers(page: number = 1, limit: number = 20): Promise<PaginatedResponse<User>> {
    try {
      const response: AxiosResponse<PaginatedResponse<User>> = await this.api.get('/users', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async updateUser(id: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.api.put(`/users/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
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