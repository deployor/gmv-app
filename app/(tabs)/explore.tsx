import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

// Define a type for the Ionicons name prop
type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [schoolResources, setSchoolResources] = useState([
    {
      id: 1,
      title: 'Library Catalog',
      description: 'Browse and search for books, journals, and digital resources available in the school library.',
      icon: 'book-outline' as IconName,
    },
    {
      id: 2,
      title: 'School Calendar',
      description: 'View upcoming events, holidays, and important academic dates.',
      icon: 'calendar-outline' as IconName,
    },
    {
      id: 3,
      title: 'Academic Resources',
      description: 'Access study guides, tutoring schedules, and supplementary learning materials.',
      icon: 'school-outline' as IconName,
    },
    {
      id: 4,
      title: 'Extracurricular Activities',
      description: 'Find information about clubs, sports teams, and after-school programs.',
      icon: 'football-outline' as IconName,
    },
    {
      id: 5,
      title: 'Student Support Services',
      description: 'Connect with counseling, health services, and other student support resources.',
      icon: 'people-outline' as IconName,
    },
    {
      id: 6,
      title: 'Campus Map',
      description: 'Interactive map to help navigate the school campus and locate classrooms and facilities.',
      icon: 'map-outline' as IconName,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Explore</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.resourcesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>School Resources</Text>
          
          {schoolResources.map(resource => (
            <TouchableOpacity 
              key={resource.id}
              style={[styles.resourceCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.tint }]}>
                <Ionicons name={resource.icon} size={24} color="#fff" />
              </View>
              <View style={styles.resourceContent}>
                <Text style={[styles.resourceTitle, { color: colors.text }]}>{resource.title}</Text>
                <Text style={[styles.resourceDescription, { color: colors.icon }]}>
                  {resource.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About GMV School</Text>
          <View style={[styles.aboutCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
            <Text style={[styles.aboutText, { color: colors.text }]}>
              GMV School is committed to providing a comprehensive, high-quality education for all students. Our mission is to foster academic excellence, personal growth, and social responsibility in a supportive and inclusive learning environment.
            </Text>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={16} color={colors.icon} style={styles.contactIcon} />
                <Text style={[styles.contactText, { color: colors.icon }]}>+1 (555) 123-4567</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="mail-outline" size={16} color={colors.icon} style={styles.contactIcon} />
                <Text style={[styles.contactText, { color: colors.icon }]}>info@gmvschool.edu</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="location-outline" size={16} color={colors.icon} style={styles.contactIcon} />
                <Text style={[styles.contactText, { color: colors.icon }]}>123 Education St, Learning City</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  resourcesContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  aboutCard: {
    borderRadius: 12,
    padding: 16,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.2)',
    paddingTop: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    marginRight: 8,
  },
  contactText: {
    fontSize: 14,
  },
});
