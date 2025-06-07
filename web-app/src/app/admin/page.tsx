'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ApiService, { News, Announcement } from '@/services/apiService';
import { PlusIcon, UserGroupIcon, NewspaperIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalNews: 0,
    totalAnnouncements: 0,
  });
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/');
      return;
    }
    loadDashboardData();
  }, [isAuthenticated, user, router]);

  const loadDashboardData = async () => {
    try {
      // Load basic data for dashboard
      const [newsResponse, announcementsResponse] = await Promise.all([
        ApiService.getRecentNews(5),
        ApiService.getActiveAnnouncements(),
      ]);

      if (newsResponse.success && newsResponse.data) {
        setRecentNews(newsResponse.data);
        setStats(prev => ({ ...prev, totalNews: newsResponse.data!.length }));
      }

      if (announcementsResponse.success && announcementsResponse.data) {
        setRecentAnnouncements(announcementsResponse.data);
        setStats(prev => ({ ...prev, totalAnnouncements: announcementsResponse.data!.length }));
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">You need admin privileges to access this page.</p>
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
              <button
                onClick={() => router.push('/')}
                className="text-blue-600 hover:text-blue-700 mr-4"
              >
                ← Back to Home
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.displayName || `${user?.firstName} ${user?.lastName}`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'news'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              News Management
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'announcements'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Announcements
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <UserGroupIcon className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <NewspaperIcon className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">News Articles</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalNews}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <SpeakerWaveIcon className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Announcements</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalAnnouncements}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent News */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent News</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentNews.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      No news articles found
                    </div>
                  ) : (
                    recentNews.map((news) => (
                      <div key={news.id} className="p-6">
                        <h4 className="font-medium text-gray-900 dark:text-white">{news.title}</h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(news.createdAt)}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                          news.isPublished 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {news.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Announcements */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Announcements</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentAnnouncements.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      No announcements found
                    </div>
                  ) : (
                    recentAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="p-6">
                        <h4 className="font-medium text-gray-900 dark:text-white">{announcement.title}</h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(announcement.createdAt)}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.toUpperCase()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">News Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <PlusIcon className="w-4 h-4 mr-2" />
                Create News Article
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <p className="text-gray-500 dark:text-gray-400">
                  News management functionality will be implemented here. This would include:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li>Create, edit, and delete news articles</li>
                  <li>Manage publication status</li>
                  <li>Upload featured images</li>
                  <li>Schedule publication dates</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Announcement Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Announcement
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <p className="text-gray-500 dark:text-gray-400">
                  Announcement management functionality will be implemented here. This would include:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li>Create, edit, and delete announcements</li>
                  <li>Set priority levels and expiration dates</li>
                  <li>Target specific audiences</li>
                  <li>Manage active/inactive status</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 