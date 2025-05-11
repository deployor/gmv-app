import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { prisma } from '../../lib/prisma';

type Assignment = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  classId: string;
  points: number;
};

type Class = {
  id: string;
  name: string;
  description: string | null;
  teacherId: string | null;
};

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: Date;
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [classProgress, setClassProgress] = useState<Record<string, number>>({});
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      
      // Fetch user's classes based on role
      let classesData: Class[] = [];
      
      if (user?.role === 'student') {
        // Students only see enrolled classes
        const enrollments = await prisma.enrollment.findMany({
          where: {
            studentId: user.id
          },
          include: {
            class: true
          }
        });
        
        classesData = enrollments.map(e => e.class);
      } else if (user?.role === 'teacher') {
        // Teachers only see classes they teach
        classesData = await prisma.class.findMany({
          where: {
            teacherId: user.id
          }
        });
      } else {
        // Admins see all classes
        classesData = await prisma.class.findMany();
      }
      
      setClasses(classesData);
      
      // Fetch progress data for each class
      if (classesData && classesData.length > 0) {
        const progressData: Record<string, number> = {};
        
        // For each class, check submissions to determine progress
        for (const cls of classesData) {
          // Count total assignments for this class
          const totalAssignments = await prisma.assignment.count({
            where: {
              classId: cls.id
            }
          });
          
          if (user?.role === 'student') {
            // For students, calculate based on their submissions
            const completedAssignments = await prisma.submission.count({
              where: {
                studentId: user.id,
                assignment: {
                  classId: cls.id
                }
              }
            });
            
            progressData[cls.id] = totalAssignments > 0 ? completedAssignments / totalAssignments : 0;
          } else {
            // For teachers, show class-wide progress based on all submissions
            // This is a simplification - in a real app would be more sophisticated
            progressData[cls.id] = Math.random(); // Temporary fallback for teacher view
          }
        }
        
        setClassProgress(progressData);
      }
      
      // Fetch upcoming assignments
      const now = new Date();
      const assignmentsData = await prisma.assignment.findMany({
        where: {
          dueDate: {
            gte: now
          }
        },
        orderBy: {
          dueDate: 'asc'
        },
        take: 5
      });
      
      setAssignments(assignmentsData);
      
      // Fetch announcements
      const announcementsData = await prisma.announcement.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 3
      });
      
      // Format the dates for display
      const formattedAnnouncements = announcementsData.map(announcement => {
        const createdDate = new Date(announcement.createdAt);
        const now = new Date();
        
        let displayDate;
        if (createdDate.toDateString() === now.toDateString()) {
          displayDate = 'Today';
        } else if (createdDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
          displayDate = 'Yesterday';
        } else {
          displayDate = createdDate.toLocaleDateString();
        }
        
        return {
          ...announcement,
          date: displayDate
        };
      });
      
      setAnnouncements(formattedAnnouncements);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDueDate(dateString: Date): string {
    const dueDate = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dueDate.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      // Return day of week for dates within the next week
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[dueDate.getDay()];
      return dayName;
    }
  }

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hello, {user?.fullName || 'Student'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>
            Welcome back to your dashboard
          </Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Assignments</Text>
          
          {assignments.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
              <Text style={[styles.emptyStateText, { color: colors.icon }]}>No upcoming assignments</Text>
            </View>
          ) : (
            assignments.map(assignment => {
              // Find the class this assignment belongs to
              const assignmentClass = classes.find(c => c.id === assignment.classId);
              
              return (
                <TouchableOpacity 
                  key={assignment.id} 
                  style={[styles.card, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
                >
                  <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>{assignment.title}</Text>
                    <Text style={[styles.cardSubtitle, { color: colors.icon }]}>
                      {assignmentClass?.name || 'Unknown Class'} • Due {formatDueDate(assignment.dueDate)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Announcements</Text>
          
          {announcements.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
              <Text style={[styles.emptyStateText, { color: colors.icon }]}>No announcements</Text>
            </View>
          ) : (
            announcements.map(announcement => (
              <TouchableOpacity 
                key={announcement.id} 
                style={[styles.card, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
              >
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{announcement.title}</Text>
                  <Text style={[styles.announcementContent, { color: colors.text }]}>
                    {announcement.content}
                  </Text>
                  <Text style={[styles.cardSubtitle, { color: colors.icon, marginTop: 8 }]}>
                    {announcement.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>My Classes</Text>
          
          {classes.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
              <Text style={[styles.emptyStateText, { color: colors.icon }]}>
                {user?.role === 'teacher' 
                  ? 'You are not teaching any classes yet' 
                  : 'You are not enrolled in any classes yet'}
              </Text>
            </View>
          ) : (
            classes.map(cls => (
              <TouchableOpacity 
                key={cls.id} 
                style={[styles.card, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
              >
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{cls.name}</Text>
                  {cls.description && (
                    <Text style={[styles.classDescription, { color: colors.icon }]} numberOfLines={2}>
                      {cls.description}
                    </Text>
                  )}
                  
                  {user?.role === 'student' && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressTrack}>
                        <View 
                          style={[styles.progressBar, { 
                            width: `${(classProgress[cls.id] || 0) * 100}%`,
                            backgroundColor: colors.tint
                          }]}
                        />
                      </View>
                      <Text style={[styles.progressText, { color: colors.icon }]}>
                        {Math.round((classProgress[cls.id] || 0) * 100)}% complete
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  announcementContent: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  classDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 10,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'right',
  },
  emptyState: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 14,
  },
});
