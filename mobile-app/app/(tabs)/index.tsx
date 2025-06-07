import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import AuthService from '@/services/authService';
import ApiService, { News, Announcement } from '@/services/apiService';

interface FeedItem {
  id: string;
  type: 'news' | 'announcement';
  title: string;
  content: string;
  createdAt: Date;
  priority?: string;
}

export default function FeedScreen() {
  const { colors } = useTheme();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const user = AuthService.getUser();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }
    loadFeedData();
  }, [user]);

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
            content: news.excerpt || news.content.substring(0, 150) + '...',
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
            content: announcement.content.substring(0, 150) + '...',
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
      Alert.alert('Error', 'Failed to load feed data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeedData();
    setRefreshing(false);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return colors.error;
      case 'high':
        return colors.warning;
      case 'medium':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const renderFeedItem = (item: FeedItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.feedItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => {
        // Navigate to detail screen
        // router.push(`/${item.type}/${item.id}`);
      }}
    >
      <View style={styles.feedItemHeader}>
        <View style={styles.feedItemType}>
          <Text style={[
            styles.feedItemTypeText,
            {
              color: item.type === 'announcement' ? getPriorityColor(item.priority) : colors.primary,
              backgroundColor: item.type === 'announcement' 
                ? getPriorityColor(item.priority) + '20' 
                : colors.primary + '20'
            }
          ]}>
            {item.type === 'announcement' ? 'ANNOUNCEMENT' : 'NEWS'}
          </Text>
        </View>
        <Text style={[styles.feedItemDate, { color: colors.textSecondary }]}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
      
      <Text style={[styles.feedItemTitle, { color: colors.text }]} numberOfLines={2}>
        {item.title}
      </Text>
      
      <Text style={[styles.feedItemContent, { color: colors.textSecondary }]} numberOfLines={3}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    subtitleText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    feedContainer: {
      padding: 15,
    },
    feedItem: {
      padding: 15,
      marginBottom: 15,
      borderRadius: 12,
      borderWidth: 1,
    },
    feedItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    feedItemType: {
      flexDirection: 'row',
    },
    feedItemTypeText: {
      fontSize: 12,
      fontWeight: '600',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      overflow: 'hidden',
    },
    feedItemDate: {
      fontSize: 12,
    },
    feedItemTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      lineHeight: 22,
    },
    feedItemContent: {
      fontSize: 14,
      lineHeight: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.emptyText, { marginTop: 10 }]}>Loading feed...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome back, {user?.firstName || 'Student'}!
        </Text>
        <Text style={styles.subtitleText}>
          Stay updated with the latest school news and announcements
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={feedItems.length === 0 ? { flex: 1 } : undefined}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {feedItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No news or announcements available at the moment.{'\n'}
              Pull down to refresh.
            </Text>
          </View>
        ) : (
          <View style={styles.feedContainer}>
            {feedItems.map(renderFeedItem)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
