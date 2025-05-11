import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import AdminAnnouncements from '../../components/ui/AdminAnnouncements';
import NewsPage from '../../components/ui/NewsPage';
import TeacherAssignments from '../../components/ui/TeacherAssignments';
import TeacherClasses from '../../components/ui/TeacherClasses';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { prisma } from '../../lib/prisma';

type TabOptions = 'announcements' | 'classes' | 'assignments' | 'news' | 'stats' | 'activity';

interface StatItemProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const StatItem = ({ title, value, icon, style }: StatItemProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.statItem, { backgroundColor: colors.background }, style]}>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: colors.icon }]}>{title}</Text>
      </View>
      <View style={[styles.statIcon, { backgroundColor: colors.tint + '15' }]}>
        {icon}
      </View>
    </View>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabOptions>('announcements');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const studentCount = await prisma.user.count({
          where: { role: 'student' }
        });
        
        const teacherCount = await prisma.user.count({
          where: { role: 'teacher' }
        });
        
        const classCount = await prisma.class.count();
        
        const assignmentCount = await prisma.assignment.count();
        
        setTotalStudents(studentCount);
        setTotalTeachers(teacherCount);
        setTotalClasses(classCount);
        setTotalAssignments(assignmentCount);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'announcements':
        return <AdminAnnouncements />;
      case 'classes':
        return <TeacherClasses />;
      case 'assignments':
        return <TeacherAssignments />;
      case 'news':
        return <NewsPage />;
      default:
        return <AdminAnnouncements />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <Stack.Screen options={{ 
        title: 'Admin Dashboard',
        headerShown: true,
      }} />

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          <TouchableOpacity 
            style={[
              styles.tabItem, 
              activeTab === 'announcements' && [styles.activeTab, { borderColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('announcements')}
          >
            <Ionicons 
              name="megaphone-outline" 
              size={22} 
              color={activeTab === 'announcements' ? colors.tint : colors.icon} 
            />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'announcements' ? colors.tint : colors.icon }
              ]}
            >
              Announcements
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.tabItem, 
              activeTab === 'classes' && [styles.activeTab, { borderColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('classes')}
          >
            <Ionicons 
              name="school-outline" 
              size={22} 
              color={activeTab === 'classes' ? colors.tint : colors.icon} 
            />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'classes' ? colors.tint : colors.icon }
              ]}
            >
              Classes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.tabItem, 
              activeTab === 'assignments' && [styles.activeTab, { borderColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('assignments')}
          >
            <Ionicons 
              name="clipboard-outline" 
              size={22} 
              color={activeTab === 'assignments' ? colors.tint : colors.icon} 
            />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'assignments' ? colors.tint : colors.icon }
              ]}
            >
              Assignments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.tabItem, 
              activeTab === 'news' && [styles.activeTab, { borderColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('news')}
          >
            <Ionicons 
              name="newspaper-outline" 
              size={22} 
              color={activeTab === 'news' ? colors.tint : colors.icon} 
            />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'news' ? colors.tint : colors.icon }
              ]}
            >
              News
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabScroll: {
    flexDirection: 'row',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 