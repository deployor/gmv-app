import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NewsPage from '../../components/ui/NewsPage';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { supabase } from '../../lib/supabase';

type TabOptions = 'children' | 'assignments' | 'news';

interface StudentInfo {
  id: string;
  full_name: string;
  email: string;
}

interface ClassInfo {
  id: string;
  name: string;
}

interface AssignmentInfo {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  class_name: string;
  is_submitted: boolean;
  grade: number | null;
  is_graded: boolean;
  points: number;
}

interface AssignmentData {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  points: number;
  classes: { name: string } | { name: string }[] | null;
}

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<TabOptions>('children');
  const [children, setChildren] = useState<StudentInfo[]>([]);
  const [assignments, setAssignments] = useState<AssignmentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [classes, setClasses] = useState<ClassInfo[]>([]);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChildId) {
      fetchChildInfo();
    }
  }, [selectedChildId]);

  const fetchChildren = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // Get children linked to this parent
      const { data: relationships, error: relError } = await supabase
        .from('parent_student_relationships')
        .select('student_id')
        .eq('parent_id', user.id);
        
      if (relError) throw relError;
      
      if (!relationships || relationships.length === 0) {
        setLoading(false);
        return;
      }
      
      // Get student details
      const studentIds = relationships.map(rel => rel.student_id);
      const { data: studentsData, error: studentsError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', studentIds);
        
      if (studentsError) throw studentsError;
      
      setChildren(studentsData || []);
      
      // Automatically select first child if exists
      if (studentsData && studentsData.length > 0 && !selectedChildId) {
        setSelectedChildId(studentsData[0].id);
      }
      
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildInfo = async () => {
    if (!selectedChildId) return;
    
    try {
      setLoading(true);
      
      // Get classes for the selected child
      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('class_id')
        .eq('student_id', selectedChildId);
        
      if (enrollError) throw enrollError;
      
      if (!enrollments || enrollments.length === 0) {
        setClasses([]);
        setAssignments([]);
        setLoading(false);
        return;
      }
      
      const classIds = enrollments.map(e => e.class_id);
      
      // Get class info
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('id, name')
        .in('id', classIds);
        
      if (classesError) throw classesError;
      setClasses(classesData || []);
      
      // Get assignments for these classes
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('assignments')
        .select(`
          id, title, description, due_date, points,
          classes:class_id (name)
        `)
        .in('class_id', classIds)
        .order('due_date', { ascending: false });
        
      if (assignmentsError) throw assignmentsError;
      
      // Check if student has submitted these assignments
      const enrichedAssignments = await Promise.all((assignmentsData || []).map(async (assignment: AssignmentData) => {
        const { data: submissionData, error: submissionError } = await supabase
          .from('submissions')
          .select('is_graded, grade')
          .eq('assignment_id', assignment.id)
          .eq('student_id', selectedChildId)
          .maybeSingle();
          
        if (submissionError) throw submissionError;
        
        return {
          ...assignment,
          class_name: Array.isArray(assignment.classes) 
            ? (assignment.classes[0]?.name || 'Unknown') 
            : (assignment.classes?.name || 'Unknown'),
          is_submitted: Boolean(submissionData),
          grade: submissionData?.grade || null,
          is_graded: submissionData?.is_graded || false
        };
      }));
      
      setAssignments(enrichedAssignments);
      
    } catch (error) {
      console.error('Error fetching child info:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isAssignmentOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const renderChildrenContent = () => {
    if (loading) {
      return (
        <ActivityIndicator style={styles.loader} size="large" color={colors.tint} />
      );
    }
    
    if (children.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={60} color={colors.icon} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No children linked to your account
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.childrenContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Children</Text>
        
        {children.map(child => (
          <TouchableOpacity 
            key={child.id}
            style={[
              styles.childCard, 
              { 
                backgroundColor: colors.background, 
                borderColor: selectedChildId === child.id ? colors.tint : colors.icon,
                borderWidth: selectedChildId === child.id ? 2 : 1
              }
            ]}
            onPress={() => setSelectedChildId(child.id)}
          >
            <View style={[styles.avatarCircle, { backgroundColor: colors.tint + '20' }]}>
              <Text style={[styles.avatarText, { color: colors.tint }]}>
                {child.full_name.charAt(0).toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.childInfo}>
              <Text style={[styles.childName, { color: colors.text }]}>{child.full_name}</Text>
              <Text style={[styles.childEmail, { color: colors.icon }]}>{child.email}</Text>
            </View>
            
            {selectedChildId === child.id && (
              <Ionicons name="checkmark-circle" size={24} color={colors.tint} />
            )}
          </TouchableOpacity>
        ))}
        
        {selectedChildId && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 30 }]}>Classes</Text>
            {classes.length === 0 ? (
              <Text style={[styles.emptyText, { color: colors.icon, marginTop: 10 }]}>
                No classes enrolled
              </Text>
            ) : (
              <View style={styles.classesList}>
                {classes.map(cls => (
                  <View 
                    key={cls.id} 
                    style={[styles.classItem, { backgroundColor: colors.tint + '15' }]}
                  >
                    <Ionicons name="school-outline" size={20} color={colors.tint} />
                    <Text style={[styles.className, { color: colors.text }]}>{cls.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  const renderAssignmentsContent = () => {
    if (loading) {
      return (
        <ActivityIndicator style={styles.loader} size="large" color={colors.tint} />
      );
    }
    
    if (children.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={60} color={colors.icon} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No children linked to your account
          </Text>
        </View>
      );
    }
    
    if (!selectedChildId) {
      return (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            Please select a child to view assignments
          </Text>
        </View>
      );
    }
    
    const currentChild = children.find(child => child.id === selectedChildId);
    
    return (
      <View style={styles.assignmentsContainer}>
        <View style={styles.childSwitcher}>
          <Text style={[styles.viewingText, { color: colors.text }]}>
            Viewing assignments for:
          </Text>
          
          <View style={styles.childSelector}>
            {children.map(child => (
              <TouchableOpacity
                key={child.id}
                style={[
                  styles.childTab,
                  selectedChildId === child.id && [styles.activeChildTab, { borderColor: colors.tint }]
                ]}
                onPress={() => setSelectedChildId(child.id)}
              >
                <Text 
                  style={[
                    styles.childTabText, 
                    { color: selectedChildId === child.id ? colors.tint : colors.icon }
                  ]}
                >
                  {child.full_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {currentChild?.full_name}'s Assignments
        </Text>
        
        {assignments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={60} color={colors.icon} />
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              No assignments available
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.assignmentsList}>
            {assignments.map(assignment => (
              <View 
                key={assignment.id}
                style={[styles.assignmentCard, { backgroundColor: colors.background, borderColor: colors.icon }]}
              >
                <View style={styles.assignmentHeader}>
                  <Text style={[styles.assignmentTitle, { color: colors.text }]}>
                    {assignment.title}
                  </Text>
                  <View style={styles.assignmentStatusContainer}>
                    {assignment.is_submitted ? (
                      assignment.is_graded ? (
                        <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' + '20' }]}>
                          <Text style={[styles.statusText, { color: '#4CAF50' }]}>
                            {assignment.grade}/{assignment.points}
                          </Text>
                        </View>
                      ) : (
                        <View style={[styles.statusBadge, { backgroundColor: colors.tint + '20' }]}>
                          <Text style={[styles.statusText, { color: colors.tint }]}>Submitted</Text>
                        </View>
                      )
                    ) : (
                      isAssignmentOverdue(assignment.due_date) ? (
                        <View style={[styles.statusBadge, { backgroundColor: '#FF3B30' + '20' }]}>
                          <Text style={[styles.statusText, { color: '#FF3B30' }]}>Overdue</Text>
                        </View>
                      ) : (
                        <View style={[styles.statusBadge, { backgroundColor: '#FF9500' + '20' }]}>
                          <Text style={[styles.statusText, { color: '#FF9500' }]}>Pending</Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
                
                <Text style={[styles.assignmentClass, { color: colors.icon }]}>
                  {assignment.class_name}
                </Text>
                
                <Text style={[
                  styles.assignmentDue, 
                  { 
                    color: isAssignmentOverdue(assignment.due_date) && !assignment.is_submitted 
                      ? '#FF3B30' 
                      : colors.icon 
                  }
                ]}>
                  Due: {formatDate(assignment.due_date)}
                </Text>
                
                {assignment.description && (
                  <Text style={[styles.assignmentDescription, { color: colors.text }]}>
                    {assignment.description}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'children':
        return renderChildrenContent();
      case 'assignments':
        return renderAssignmentsContent();
      case 'news':
        return <NewsPage />;
      default:
        return renderChildrenContent();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <Stack.Screen options={{ 
        title: 'Parent Dashboard',
        headerShown: true,
      }} />

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          <TouchableOpacity 
            style={[
              styles.tabItem, 
              activeTab === 'children' && [styles.activeTab, { borderColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('children')}
          >
            <Ionicons 
              name="people-outline" 
              size={22} 
              color={activeTab === 'children' ? colors.tint : colors.icon} 
            />
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'children' ? colors.tint : colors.icon }
              ]}
            >
              Children
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
              name="document-text-outline" 
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  // Children Tab Styles
  childrenContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  childEmail: {
    fontSize: 14,
  },
  classesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  classItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  className: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  // Assignments Tab Styles
  assignmentsContainer: {
    flex: 1,
    padding: 16,
  },
  childSwitcher: {
    marginBottom: 20,
  },
  viewingText: {
    fontSize: 14,
    marginBottom: 8,
  },
  childSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  childTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  activeChildTab: {
    borderWidth: 1,
  },
  childTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  assignmentsList: {
    flex: 1,
  },
  assignmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  assignmentStatusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  assignmentClass: {
    fontSize: 14,
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 14,
    marginBottom: 8,
  },
  assignmentDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
}); 