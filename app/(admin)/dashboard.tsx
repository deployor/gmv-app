import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AdminAnnouncements from '../../components/ui/AdminAnnouncements';
import NewsPage from '../../components/ui/NewsPage';
import TeacherAssignments from '../../components/ui/TeacherAssignments';
import TeacherClasses from '../../components/ui/TeacherClasses';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';

type TabOptions = 'announcements' | 'classes' | 'assignments' | 'news';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabOptions>('announcements');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();

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
}); 