import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { prisma } from '../../lib/prisma';

type Class = {
  id: string;
  name: string;
  description: string | null;
  teacherId: string | null;
  imageUrl: string | null;
  createdAt: Date;
  teacher?: {
    id: string;
    fullName: string | null;
  } | null;
  color?: string;
  teacher_name?: string;
  schedule?: string;
};

// Color palette for classes
const CLASS_COLORS = [
  '#4CAF50', // Green
  '#FF9800', // Orange
  '#2196F3', // Blue
  '#9C27B0', // Purple
  '#F44336', // Red
  '#00BCD4', // Cyan
  '#795548', // Brown
  '#009688', // Teal
];

export default function ClassesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('all');
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchClasses();
    }
  }, [user, activeTab]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      
      if (user?.role === 'student') {
        // Students only see enrolled classes
        if (activeTab === 'all' || activeTab === 'today' || activeTab === 'upcoming') {
          // In a real app, we would filter by schedule data
          // For now, just show the same data in all tabs
          const enrollments = await prisma.enrollment.findMany({
            where: {
              studentId: user.id
            },
            include: {
              class: {
                include: {
                  teacher: {
                    select: {
                      id: true,
                      fullName: true
                    }
                  }
                }
              }
            }
          });
            
          if (enrollments && enrollments.length > 0) {
            // Format the data and add colors
            const formattedClasses = enrollments.map((enrollment, index) => {
              const cls = enrollment.class;
              return {
                ...cls,
                color: CLASS_COLORS[index % CLASS_COLORS.length],
                teacher_name: cls.teacher?.fullName || 'Unknown Teacher',
                // In a real app, this would come from a schedule table
                schedule: getRandomSchedule()
              };
            });
            
            setClasses(formattedClasses);
          } else {
            setClasses([]);
          }
        }
      } else if (user?.role === 'teacher') {
        // Teachers only see classes they teach
        const teacherClasses = await prisma.class.findMany({
          where: {
            teacherId: user.id
          },
          include: {
            teacher: {
              select: {
                id: true,
                fullName: true
              }
            }
          }
        });
        
        // Format the data and add colors
        const formattedClasses = teacherClasses.map((cls, index) => {
          return {
            ...cls,
            color: CLASS_COLORS[index % CLASS_COLORS.length],
            teacher_name: cls.teacher?.fullName || 'Unknown Teacher',
            // In a real app, this would come from a schedule table
            schedule: getRandomSchedule()
          };
        });
        
        setClasses(formattedClasses);
      } else {
        // Admin sees all classes
        const allClasses = await prisma.class.findMany({
          include: {
            teacher: {
              select: {
                id: true,
                fullName: true
              }
            }
          }
        });
        
        // Format the data and add colors
        const formattedClasses = allClasses.map((cls, index) => {
          return {
            ...cls,
            color: CLASS_COLORS[index % CLASS_COLORS.length],
            teacher_name: cls.teacher?.fullName || 'Unknown Teacher',
            // In a real app, this would come from a schedule table
            schedule: getRandomSchedule()
          };
        });
        
        setClasses(formattedClasses);
      }
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to generate a random schedule (would be replaced with real data)
  const getRandomSchedule = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const randomDay1 = days[Math.floor(Math.random() * days.length)];
    const randomDay2 = days[Math.floor(Math.random() * days.length)];
    const hour = Math.floor(Math.random() * 8) + 8; // 8AM to 3PM
    return `${randomDay1}, ${randomDay2} • ${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  };

  const renderClassCard = (classItem: Class) => (
    <TouchableOpacity 
      key={classItem.id}
      style={[styles.classCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
    >
      <View style={[styles.classColor, { backgroundColor: classItem.color }]} />
      <View style={styles.classContent}>
        <Text style={[styles.className, { color: colors.text }]}>{classItem.name}</Text>
        <Text style={[styles.classTeacher, { color: colors.icon }]}>{classItem.teacher_name}</Text>
        <Text style={[styles.classSchedule, { color: colors.icon }]}>{classItem.schedule}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Classes</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'all' && [styles.activeTab, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'all' ? colors.tint : colors.icon }
            ]}
          >
            All Classes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'today' && [styles.activeTab, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveTab('today')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'today' ? colors.tint : colors.icon }
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'upcoming' && [styles.activeTab, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'upcoming' ? colors.tint : colors.icon }
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.classesContainer}>
            {classes.length > 0 ? (
              classes.map(renderClassCard)
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  No classes found
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTab: {
    borderWidth: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  classesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  classCard: {
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  classColor: {
    width: 8,
    height: '100%',
  },
  classContent: {
    padding: 16,
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  classTeacher: {
    fontSize: 14,
    marginBottom: 4,
  },
  classSchedule: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
}); 