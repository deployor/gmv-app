import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TeacherDashboardScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Teacher Dashboard
        </Text>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Welcome, {user?.fullName || 'Teacher'}!
          </Text>
          <Text style={[styles.welcomeSubtext, { color: colors.icon }]}>
            Manage your classes and students
          </Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>4</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Classes</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>87</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Students</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Assignments</Text>
          </View>
        </View>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#4CAF50' + '20' }]}>
              <Ionicons name="people" size={28} color="#4CAF50" />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Classes</Text>
            <Text style={[styles.actionSubtitle, { color: colors.icon }]}>Manage your classes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#2196F3' + '20' }]}>
              <Ionicons name="document-text" size={28} color="#2196F3" />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Assignments</Text>
            <Text style={[styles.actionSubtitle, { color: colors.icon }]}>Create and grade</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#FF9800' + '20' }]}>
              <Ionicons name="calendar" size={28} color="#FF9800" />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Schedule</Text>
            <Text style={[styles.actionSubtitle, { color: colors.icon }]}>View your timetable</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#9C27B0' + '20' }]}>
              <Ionicons name="chatbubbles" size={28} color="#9C27B0" />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Messages</Text>
            <Text style={[styles.actionSubtitle, { color: colors.icon }]}>Contact parents</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.upcomingSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Today's Classes
          </Text>
          
          <View style={[styles.classCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <View style={[styles.classPeriod, { backgroundColor: colors.tint + '20' }]}>
              <Text style={[styles.periodText, { color: colors.tint }]}>1st</Text>
            </View>
            <View style={styles.classInfo}>
              <Text style={[styles.className, { color: colors.text }]}>
                Mathematics - Grade 10
              </Text>
              <Text style={[styles.classTime, { color: colors.icon }]}>
                8:30 AM - 9:20 AM • Room 203
              </Text>
              <View style={styles.classDetailsRow}>
                <View style={styles.classDetail}>
                  <Ionicons name="people-outline" size={14} color={colors.icon} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: colors.icon }]}>32 students</Text>
                </View>
                <View style={styles.classDetail}>
                  <Ionicons name="document-outline" size={14} color={colors.icon} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: colors.icon }]}>Quiz today</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={[styles.classCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <View style={[styles.classPeriod, { backgroundColor: colors.tint + '20' }]}>
              <Text style={[styles.periodText, { color: colors.tint }]}>3rd</Text>
            </View>
            <View style={styles.classInfo}>
              <Text style={[styles.className, { color: colors.text }]}>
                Science - Grade 9
              </Text>
              <Text style={[styles.classTime, { color: colors.icon }]}>
                11:00 AM - 11:50 AM • Room 105
              </Text>
              <View style={styles.classDetailsRow}>
                <View style={styles.classDetail}>
                  <Ionicons name="people-outline" size={14} color={colors.icon} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: colors.icon }]}>28 students</Text>
                </View>
                <View style={styles.classDetail}>
                  <Ionicons name="flask-outline" size={14} color={colors.icon} style={styles.detailIcon} />
                  <Text style={[styles.detailText, { color: colors.icon }]}>Lab session</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
  },
  upcomingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  classCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  classPeriod: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  periodText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classInfo: {
    flex: 1,
    padding: 12,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  classTime: {
    fontSize: 14,
    marginBottom: 8,
  },
  classDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    marginRight: 4,
  },
  detailText: {
    fontSize: 12,
  },
}); 