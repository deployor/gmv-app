import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { prisma } from '../../lib/prisma';
import RichTextEditor from './RichTextEditor';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  authorId: string;
  createdAt: Date;
  author?: {
    fullName: string | null;
    role: string;
  };
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingNews, setFetchingNews] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setFetchingNews(true);
      
      const newsData = await prisma.news.findMany({
        include: {
          author: {
            select: {
              fullName: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.showToast('Failed to load news', 'error');
    } finally {
      setFetchingNews(false);
    }
  };

  const handleCreateNews = async () => {
    if (!title.trim() || !content.trim()) {
      toast.showToast('Please provide both title and content', 'error');
      return;
    }

    try {
      setLoading(true);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      await prisma.news.create({
        data: {
          title: title.trim(),
          content: content.trim(),
          imageUrl: imageUrl.trim() || null,
          authorId: user.id
        }
      });

      // Reset form and close modal
      setTitle('');
      setContent('');
      setImageUrl('');
      setIsCreateModalVisible(false);
      
      toast.showToast('News article created successfully', 'success');
      fetchNews();
    } catch (error) {
      console.error('Error creating news:', error);
      toast.showToast('Failed to create news article', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    try {
      await prisma.news.delete({
        where: {
          id: newsId
        }
      });
      
      toast.showToast('News article deleted', 'success');
      fetchNews();
      
      // If we're viewing this news, close the modal
      if (selectedNews?.id === newsId) {
        setSelectedNews(null);
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.showToast('Failed to delete news article', 'error');
    }
  };

  const formatDate = (dateValue: Date) => {
    return new Date(dateValue).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Create news modal
  const renderCreateNewsModal = () => {
    return (
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Create News Article</Text>
              <TouchableOpacity onPress={() => setIsCreateModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollContent}>
              <TextInput
                style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                placeholder="Article Title"
                placeholderTextColor={colors.icon}
                value={title}
                onChangeText={setTitle}
              />
              
              <TextInput
                style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                placeholder="Image URL (optional)"
                placeholderTextColor={colors.icon}
                value={imageUrl}
                onChangeText={setImageUrl}
              />
              
              <View style={[styles.richTextContainer, { borderColor: colors.icon }]}>
                <RichTextEditor
                  initialContent=""
                  onChange={setContent}
                  placeholder="Article content..."
                />
              </View>
              
              <TouchableOpacity
                style={[styles.createButton, { backgroundColor: colors.tint }]}
                onPress={handleCreateNews}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Ionicons name="add-circle-outline" size={20} color="white" />
                    <Text style={styles.createButtonText}>Publish Article</Text>
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // News detail modal
  const renderNewsDetailModal = () => {
    if (!selectedNews) return null;
    
    return (
      <Modal
        visible={selectedNews !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedNews(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedNews.title}</Text>
              <TouchableOpacity onPress={() => setSelectedNews(null)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollContent}>
              <View style={styles.articleMeta}>
                <Text style={[styles.articleAuthor, { color: colors.text }]}>
                  By {selectedNews.author?.fullName || 'Unknown'}
                </Text>
                <Text style={[styles.articleDate, { color: colors.icon }]}>
                  {formatDate(selectedNews.createdAt)}
                </Text>
              </View>
              
              {selectedNews.imageUrl && (
                <Image 
                  source={{ uri: selectedNews.imageUrl }} 
                  style={styles.articleImage} 
                  resizeMode="cover"
                />
              )}
              
              <View style={styles.articleContent}>
                <Text style={[styles.contentText, { color: colors.text }]}>
                  {selectedNews.content}
                </Text>
              </View>
              
              {isAdmin && (
                <TouchableOpacity 
                  style={[styles.deleteButton, { backgroundColor: '#FF3B30' + '20' }]}
                  onPress={() => handleDeleteNews(selectedNews.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  <Text style={styles.deleteButtonText}>Delete Article</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>School News</Text>
        
        {isAdmin && (
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.tint }]}
            onPress={() => setIsCreateModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addButtonText}>New Article</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {fetchingNews ? (
        <ActivityIndicator size="large" color={colors.tint} style={styles.loader} />
      ) : news.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="newspaper-outline" size={60} color={colors.icon} />
          <Text style={[styles.emptyText, { color: colors.icon }]}>No news articles yet</Text>
          {isAdmin && (
            <TouchableOpacity 
              style={[styles.emptyAddButton, { backgroundColor: colors.tint }]}
              onPress={() => setIsCreateModalVisible(true)}
            >
              <Text style={styles.emptyAddButtonText}>Create First Article</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView style={styles.newsScroll}>
          {news.map((newsItem) => (
            <TouchableOpacity 
              key={newsItem.id} 
              style={[styles.newsCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
              onPress={() => setSelectedNews(newsItem)}
            >
              {newsItem.imageUrl && (
                <Image 
                  source={{ uri: newsItem.imageUrl }} 
                  style={styles.cardImage} 
                  resizeMode="cover"
                />
              )}
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{newsItem.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={[styles.cardAuthor, { color: colors.icon }]}>
                    By {newsItem.author?.fullName || 'Unknown'}
                  </Text>
                  <Text style={[styles.cardDate, { color: colors.icon }]}>
                    {formatDate(newsItem.createdAt)}
                  </Text>
                </View>
                <Text 
                  style={[styles.cardPreview, { color: colors.text }]}
                  numberOfLines={2}
                >
                  {newsItem.content}
                </Text>
                <Text style={[styles.readMore, { color: colors.tint }]}>Read more</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      {renderCreateNewsModal()}
      {renderNewsDetailModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  loader: {
    marginTop: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
  },
  emptyAddButton: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  newsScroll: {
    flex: 1,
  },
  newsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardAuthor: {
    fontSize: 14,
  },
  cardDate: {
    fontSize: 14,
  },
  cardPreview: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  readMore: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalScrollContent: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  richTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 200,
    marginBottom: 16,
    overflow: 'hidden',
  },
  createButton: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  articleMeta: {
    marginBottom: 16,
  },
  articleAuthor: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  articleDate: {
    fontSize: 14,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  articleContent: {
    marginBottom: 24,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  deleteButton: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
}); 