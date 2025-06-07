'use client';

// TODO:
// - add calendar
// - add admin dashboard
// - add user management
// - add news management
// - add announcement management
// - add event management (maybe)

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import ApiService, { News, Announcement } from '@/services/apiService';
import { NewspaperIcon, SpeakerWaveIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface FeedItem {
  id: string;
  type: 'news' | 'announcement';
  title: string;
  content: string;
  createdAt: Date;
  priority?: string;
}

export default function HomePage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadFeedData();
    }
  }, [isAuthenticated]);

  const loadFeedData = async () => {
    try {
      setLoading(true);
      
      // Load news and announcements in parallel
      const [newsResponse, announcementsResponse] = await Promise.all([
        ApiService.getRecentNews(5),
        ApiService.getActiveAnnouncements(),
      ]);

      const items: FeedItem[] = [];

      // Add news items
      if (newsResponse.success && newsResponse.data) {
        newsResponse.data.forEach((news: News) => {
          items.push({
            id: news.id,
            type: 'news',
            title: news.title,
            content: news.excerpt || news.content.substring(0, 200) + '...',
            createdAt: new Date(news.createdAt),
          });
        });
      }

      // Add announcement items
      if (announcementsResponse.success && announcementsResponse.data) {
        announcementsResponse.data.forEach((announcement: Announcement) => {
          items.push({
            id: announcement.id,
            type: 'announcement',
            title: announcement.title,
            content: announcement.content.substring(0, 200) + '...',
            createdAt: new Date(announcement.createdAt),
            priority: announcement.priority,
          });
        });
      }

      // Sort by creation date (newest first)
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setFeedItems(items);
    } catch (error) {
      console.error('Error loading feed data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'high':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">GMV</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to GMV School
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in with your Microsoft account to access school resources
            </p>
          </div>
          
          <button
            onClick={login}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
            </svg>
            Sign in with Microsoft
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">GMV</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                GMV School
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName || `${user?.firstName} ${user?.lastName}`}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Latest Updates
                </h2>
              </div>
              
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
              ) : feedItems.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No updates available at the moment.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {feedItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {item.type === 'news' ? (
                            <NewspaperIcon className="w-5 h-5 text-blue-600" />
                          ) : (
                            <SpeakerWaveIcon className="w-5 h-5 text-orange-600" />
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.type === 'announcement' 
                              ? getPriorityColor(item.priority)
                              : 'text-blue-700 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {item.type === 'announcement' ? 'ANNOUNCEMENT' : 'NEWS'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="/calendar"
                  className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <CalendarIcon className="w-5 h-5 mr-3" />
                  Calendar
                </a>
                {user?.role === 'admin' && (
                  <a
                    href="/admin"
                    className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Dashboard
                  </a>
                )}
              </div>
            </div>

            {/* School Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                School Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Address:</strong> Am Kloster 9</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> beans@no.edu</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
