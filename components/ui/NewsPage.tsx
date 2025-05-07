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
import { supabase } from '../../lib/supabase';
import RichTextEditor from './RichTextEditor';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  author_id: string;
  created_at: string;
  author_name?: string;
  author_role?: string;
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
      
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          profiles:author_id (fullName, role)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Process data to include author name
      const processedNews = (data || []).map(newsItem => {
        return {
          ...newsItem,
          author_name: newsItem.profiles?.fullName || 'Unknown',
          author_role: newsItem.profiles?.role || 'user'
        };
      });
      
      setNews(processedNews);
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
      
      const { error } = await supabase
        .from('news')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            image_url: imageUrl.trim() || null,
            author_id: user?.id
          }
        ]);

      if (error) throw error;

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
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', newsId);

      if (error) throw error;
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
                  By {selectedNews.author_name}
                </Text>
                <Text style={[styles.articleDate, { color: colors.icon }]}>
                  {formatDate(selectedNews.created_at)}
                </Text>
              </View>
              
              {selectedNews.image_url && (
                <Image 
                  source={{ uri: selectedNews.image_url }} 
                  style={styles.articleDetailImage}
                  resizeMode="cover"
                />
              )}
              
              <Text style={[styles.articleContent, { color: colors.text }]}>
                {selectedNews.content}
              </Text>
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
          {news.map((item) => (
            <View 
              key={item.id} 
              style={[styles.newsCard, { backgroundColor: colors.background, borderColor: colors.icon }]}
            >
              {item.image_url && (
                <Image 
                  source={{ uri: item.image_url }} 
                  style={styles.newsImage}
                  resizeMode="cover"
                />
              )}
              
              <View style={styles.newsContent}>
                <TouchableOpacity onPress={() => setSelectedNews(item)}>
                  <Text style={[styles.newsTitle, { color: colors.text }]}>{item.title}</Text>
                </TouchableOpacity>
                
                <View style={styles.newsMetaRow}>
                  <Text style={[styles.newsAuthor, { color: colors.icon }]}>
                    By {item.author_name}
                  </Text>
                  <Text style={[styles.newsDate, { color: colors.icon }]}>
                    {formatDate(item.created_at)}
                  </Text>
                </View>
                
                <Text 
                  style={[styles.newsPreview, { color: colors.text }]}
                  numberOfLines={3}
                >
                  {item.content.replace(/<[^>]*>/g, '')}
                </Text>
                
                <View style={styles.newsActions}>
                  <TouchableOpacity 
                    style={[styles.readMoreButton, { borderColor: colors.tint }]}
                    onPress={() => setSelectedNews(item)}
                  >
                    <Text style={[styles.readMoreText, { color: colors.tint }]}>Read More</Text>
                  </TouchableOpacity>
                  
                  {isAdmin && (
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDeleteNews(item.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
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
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  newsAuthor: {
    fontSize: 14,
  },
  newsDate: {
    fontSize: 14,
  },
  newsPreview: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  newsActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreButton: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
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
  articleDetailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 