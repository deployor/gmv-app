import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';

export default function AdminDashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    teachers: 0,
    parents: 0,
    classes: 0,
    assignments: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get user counts
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('role');
        
      if (profilesError) throw profilesError;

      if (profilesData) {
        const students = profilesData.filter(p => p.role === 'student').length;
        const teachers = profilesData.filter(p => p.role === 'teacher').length;
        const parents = profilesData.filter(p => p.role === 'parent').length;
        const totalUsers = profilesData.length;
        
        // Get class count
        const { count: classCount, error: classError } = await supabase
          .from('classes')
          .select('*', { count: 'exact', head: true });
          
        if (classError) throw classError;
        
        // Get assignment count
        const { count: assignmentCount, error: assignmentError } = await supabase
          .from('assignments')
          .select('*', { count: 'exact', head: true });
          
        if (assignmentError) throw assignmentError;
        
        setStats({
          totalUsers,
          students,
          teachers,
          parents,
          classes: classCount || 0,
          assignments: assignmentCount || 0,
        });
      }
      
      // Get recent activities - this would be more complex in a real app
      // Just mocking data for now
      setRecentActivity([
        { id: 1, type: 'user_created', description: 'New student account created', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 2, type: 'class_created', description: 'New Math class created', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: 3, type: 'assignment_created', description: 'New Science assignment added', timestamp: new Date(Date.now() - 10800000).toISOString() },
        { id: 4, type: 'parent_linked', description: 'Parent linked to student', timestamp: new Date(Date.now() - 14400000).toISOString() }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_created':
        return 'person-add';
      case 'class_created':
        return 'book';
      case 'assignment_created':
        return 'document-text';
      case 'parent_linked':
        return 'people';
      default:
        return 'information-circle';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Admin Dashboard</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              iconName="people" 
              color="#4CAF50"
              background={colors === Colors.dark ? '#1E1E1E' : '#F5F5F5'}
              textColor={colors.text}
            />
            <StatCard 
              title="Students" 
              value={stats.students} 
              iconName="school" 
              color="#2196F3"
              background={colors === Colors.dark ? '#1E1E1E' : '#F5F5F5'}
              textColor={colors.text}
            />
            <StatCard 
              title="Teachers" 
              value={stats.teachers} 
              iconName="person" 
              color="#FF9800"
              background={colors === Colors.dark ? '#1E1E1E' : '#F5F5F5'}
              textColor={colors.text}
            />
            <StatCard 
              title="Parents" 
              value={stats.parents} 
              iconName="people" 
              color="#9C27B0"
              background={colors === Colors.dark ? '#1E1E1E' : '#F5F5F5'}
              textColor={colors.text}
            />
            <StatCard 
              title="Classes" 
              value={stats.classes} 
              iconName="book" 
              color="#F44336"
              background={colors === Colors.dark ? '#1E1E1E' : '#F5F5F5'}
              textColor={colors.text}
            />
            <StatCard 
              title="Assignments" 
              value={stats.assignments} 
              iconName="document-text" 
              color="#00BCD4"
              background={colors === Colors.dark ? '#1E1E1E' : '#F5F5F5'}
              textColor={colors.text}
            />
          </View>
          
          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.tint }]}
                onPress={() => {}}
              >
                <Ionicons name="person-add" size={22} color="#FFF" />
                <Text style={styles.actionText}>Add User</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.tint }]}
                onPress={() => {}}
              >
                <Ionicons name="book" size={22} color="#FFF" />
                <Text style={styles.actionText}>Create Class</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: colors.tint }]}
                onPress={() => {router.push('/(admin)/roles')}}
              >
                <Ionicons name="key" size={22} color="#FFF" />
                <Text style={styles.actionText}>Fix Roles</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
            
            {recentActivity.map(activity => (
              <View 
                key={activity.id}
                style={[styles.activityItem, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
              >
                <View style={[styles.activityIconContainer, { backgroundColor: colors.tint + '20' }]}>
                  <Ionicons name={getActivityIcon(activity.type)} size={22} color={colors.tint} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityDescription, { color: colors.text }]}>
                    {activity.description}
                  </Text>
                  <Text style={[styles.activityTime, { color: colors.icon }]}>
                    {formatTime(activity.timestamp)}
                  </Text>
                </View>
              </View>
            ))}
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={[styles.viewAllText, { color: colors.tint }]}>View All Activity</Text>
            </TouchableOpacity>
          </View>
          
          {/* System Status */}
          <View style={[styles.section, styles.statusSection, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>System Status</Text>
            
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
                <Text style={[styles.statusText, { color: colors.text }]}>Database</Text>
              </View>
              
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
                <Text style={[styles.statusText, { color: colors.text }]}>API</Text>
              </View>
              
              <View style={styles.statusItem}>
                <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
                <Text style={[styles.statusText, { color: colors.text }]}>Auth</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// Stat Card Component
function StatCard({ title, value, iconName, color, background, textColor }: any) {
  return (
    <View style={[styles.statCard, { backgroundColor: background }]}>
      <View style={styles.statCardContent}>
        <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: textColor }]}>{title}</Text>
      </View>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={iconName} size={24} color={color} />
      </View>
    </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCardContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginTop: 6,
    fontWeight: '500',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusSection: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
  },
}); 