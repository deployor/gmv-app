import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { prisma } from '../../lib/prisma';

export default function ParentDashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user && user.role === 'parent') {
      fetchChildren();
      fetchNotifications();
    }
  }, [user]);

  const fetchChildren = async () => {
    if (!user || !user.id) return;
    
    try {
      setLoading(true);
      
      const relationships = await prisma.parentStudentRelationship.findMany({
        where: {
          parentId: user.id
        },
        include: {
          student: true
        }
      });
        
      if (relationships) {
        const childrenData = relationships.map(item => {
          // Spread the student first, then override with our custom properties
          const { id, ...studentRest } = item.student;
          return {
            ...studentRest,
            id: item.studentId,
            relationship: item.relationshipType || 'Parent',
          };
        });
        
        setChildren(childrenData);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
      Alert.alert('Error', 'Could not load children data');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    if (!user || !user.id) return;
    
    try {
      const notifications = await prisma.parentNotification.findMany({
        where: {
          parentId: user.id
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      });
        
      if (notifications) {
        setNotifications(notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      await prisma.parentNotification.update({
        where: { id },
        data: { isRead: true }
      });
        
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Helper to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check for non-parent users
  if (!user || user.role !== 'parent') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centeredContent}>
          <Text style={{ color: colors.text }}>This dashboard is only accessible to parent users.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Parent Dashboard</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Children Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>My Children</Text>
            
            {children.length > 0 ? (
              children.map(child => (
                <TouchableOpacity 
                  key={child.id}
                  style={[styles.childCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
                >
                  <View style={styles.childInfo}>
                    <View style={styles.avatarContainer}>
                      {child.avatar_url ? (
                        <Image
                          source={{ uri: child.avatar_url }}
                          style={styles.avatar}
                        />
                      ) : (
                        <View style={[styles.avatarPlaceholder, { backgroundColor: colors.tint }]}>
                          <Text style={styles.avatarText}>
                            {child.fullName?.charAt(0) || child.username?.charAt(0) || 'S'}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.childDetails}>
                      <Text style={[styles.childName, { color: colors.text }]}>
                        {child.fullName || child.username || 'Student'}
                      </Text>
                      <Text style={[styles.relationshipText, { color: colors.icon }]}>
                        {child.relationship}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.icon} />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  No children associated with this account
                </Text>
                <TouchableOpacity 
                  style={[styles.addButton, { backgroundColor: colors.tint }]}
                >
                  <Text style={styles.addButtonText}>Add Child</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Notifications</Text>
            
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <TouchableOpacity 
                  key={notification.id}
                  style={[
                    styles.notificationCard, 
                    { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' },
                    !notification.isRead && { borderLeftColor: colors.tint, borderLeftWidth: 4 }
                  ]}
                  onPress={() => markNotificationAsRead(notification.id)}
                >
                  <View style={styles.notificationTypeIcon}>
                    <Ionicons 
                      name={
                        notification.type === 'grade' ? 'school' :
                        notification.type === 'attendance' ? 'calendar' :
                        notification.type === 'behavior' ? 'alert-circle' : 'notifications'
                      } 
                      size={20} 
                      color={colors.tint} 
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} Update
                    </Text>
                    <Text style={[styles.notificationText, { color: colors.text }]}>
                      {notification.content}
                    </Text>
                    <Text style={[styles.notificationDate, { color: colors.icon }]}>
                      {formatDate(notification.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  No notifications yet
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  relationshipText: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  notificationCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  notificationTypeIcon: {
    marginRight: 16,
    alignSelf: 'flex-start',
    paddingTop: 3,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationDate: {
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 