import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';

type Assignment = Database['public']['Tables']['assignments']['Row'] & {
  course?: string;
  status?: 'upcoming' | 'completed';
  courseColor?: string;
  formattedDueDate?: string;
};

type Submission = Database['public']['Tables']['submissions']['Row'];

// Color palette for courses
const COURSE_COLORS = [
  '#4CAF50', // Green
  '#FF9800', // Orange
  '#2196F3', // Blue
  '#9C27B0', // Purple
  '#F44336', // Red
  '#00BCD4', // Cyan
  '#795548', // Brown
  '#009688', // Teal
];

export default function AssignmentsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [classMap, setClassMap] = useState<Record<string, { name: string, color: string }>>({});
  const [classes, setClasses] = useState<{ id: string, name: string }[]>([]);
  
  // New assignment state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    class_id: '',
    due_date: new Date(),
    points: 100
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAssignments();
    }
  }, [user, activeTab]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      
      // First, fetch all classes the user has access to
      let classesQuery = supabase.from('classes').select('*');
      
      if (user?.role === 'student') {
        // Students only see classes they're enrolled in
        const { data: enrollments } = await supabase
          .from('enrollments')
          .select('class_id')
          .eq('student_id', user.id);
          
        if (enrollments && enrollments.length > 0) {
          const classIds = enrollments.map(e => e.class_id);
          classesQuery = classesQuery.in('id', classIds);
        } else {
          setAssignments([]);
          setLoading(false);
          return;
        }
      } else if (user?.role === 'teacher') {
        // Teachers only see their own classes
        classesQuery = classesQuery.eq('teacher_id', user.id);
      }
      
      const { data: classesData, error: classesError } = await classesQuery;
      
      if (classesError) {
        console.error('Error fetching classes:', classesError);
        return;
      }
      
      // Create a map of class IDs to class names and colors for later use
      const classMapData: Record<string, { name: string, color: string }> = {};
      classesData?.forEach((cls, index) => {
        classMapData[cls.id] = { 
          name: cls.name, 
          color: COURSE_COLORS[index % COURSE_COLORS.length] 
        };
      });
      setClassMap(classMapData);
      
      // Save classes for the new assignment modal
      setClasses(classesData?.map(c => ({ id: c.id, name: c.name })) || []);
      
      // Set default class_id if this is a teacher and they have classes
      if (user?.role === 'teacher' && classesData && classesData.length > 0 && !newAssignment.class_id) {
        setNewAssignment(prev => ({ ...prev, class_id: classesData[0].id }));
      }
      
      // Fetch assignments for those classes
      const classIds = classesData?.map(c => c.id) || [];
      if (classIds.length === 0) {
        setAssignments([]);
        setLoading(false);
        return;
      }
      
      let assignmentsQuery = supabase
        .from('assignments')
        .select('*')
        .in('class_id', classIds);

      if (activeTab === 'upcoming') {
        // Only fetch assignments with due dates in the future
        assignmentsQuery = assignmentsQuery.gte('due_date', new Date().toISOString());
      }
      
      const { data: assignmentsData, error: assignmentsError } = await assignmentsQuery;
      
      if (assignmentsError) {
        console.error('Error fetching assignments:', assignmentsError);
        return;
      }
      
      // For student role, check which assignments are completed
      let submissionsData: Submission[] = [];
      if (user?.role === 'student') {
        const { data: submissions, error: submissionsError } = await supabase
          .from('submissions')
          .select('*')
          .eq('student_id', user.id)
          .in('assignment_id', assignmentsData?.map(a => a.id) || []);
          
        if (!submissionsError && submissions) {
          submissionsData = submissions;
        }
      }
      
      // Format the assignments with additional data
      const formattedAssignments = assignmentsData?.map(assignment => {
        const classInfo = classMapData[assignment.class_id] || { name: 'Unknown Class', color: '#888888' };
        const dueDate = new Date(assignment.due_date);
        const isCompleted = submissionsData.some(s => s.assignment_id === assignment.id);
        
        // Format the due date
        let formattedDueDate;
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        if (dueDate.toDateString() === today.toDateString()) {
          formattedDueDate = `Today, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (dueDate.toDateString() === tomorrow.toDateString()) {
          formattedDueDate = `Tomorrow, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
          // Get day name for dates within a week
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          formattedDueDate = `${days[dueDate.getDay()]}, ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // For completed assignments
        if (isCompleted && activeTab === 'completed') {
          const submission = submissionsData.find(s => s.assignment_id === assignment.id);
          const submissionDate = submission ? new Date(submission.created_at) : new Date();
          formattedDueDate = `Completed on ${submissionDate.toLocaleDateString()}`;
        }
        
        return {
          ...assignment,
          course: classInfo.name,
          courseColor: classInfo.color,
          status: isCompleted ? 'completed' : 'upcoming',
          formattedDueDate,
        };
      }) || [];
      
      // Filter based on active tab
      const filteredByStatus = formattedAssignments.filter(a => {
        return activeTab === 'upcoming' ? a.status === 'upcoming' : a.status === 'completed';
      });
      
      setAssignments(filteredByStatus);
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = 
      searchQuery === '' || 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.class_id) {
      Alert.alert('Missing fields', 'Please fill in the required fields');
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('assignments')
        .insert({
          title: newAssignment.title,
          description: newAssignment.description || null,
          class_id: newAssignment.class_id,
          due_date: newAssignment.due_date.toISOString(),
          points: newAssignment.points
        })
        .select();
        
      if (error) throw error;
      
      // Reset form and close modal
      setNewAssignment({
        title: '',
        description: '',
        class_id: classes.length > 0 ? classes[0].id : '',
        due_date: new Date(),
        points: 100
      });
      
      setIsModalVisible(false);
      
      // Refresh assignments
      fetchAssignments();
      
      Alert.alert('Success', 'Assignment created successfully');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNewAssignment(prev => ({ ...prev, due_date: selectedDate }));
    }
  };

  const renderAssignmentCard = (assignment: Assignment) => (
    <TouchableOpacity 
      key={assignment.id}
      style={[styles.assignmentCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
    >
      <View style={[styles.courseIndicator, { backgroundColor: assignment.courseColor }]} />
      <View style={styles.assignmentContent}>
        <Text style={[styles.assignmentTitle, { color: colors.text }]}>{assignment.title}</Text>
        <Text style={[styles.courseTitle, { color: assignment.courseColor }]}>{assignment.course}</Text>
        <Text style={[styles.assignmentDescription, { color: colors.text }]}>
          {assignment.description || 'No description provided'}
        </Text>
        <Text style={[styles.dueDate, { color: colors.icon }]}>
          {activeTab === 'upcoming' ? `Due: ${assignment.formattedDueDate}` : assignment.formattedDueDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Assignments</Text>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
        <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search assignments..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.tabContainer}>
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
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'completed' && [styles.activeTab, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'completed' ? colors.tint : colors.icon }
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.assignmentsContainer}>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map(renderAssignmentCard)
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  {searchQuery 
                    ? 'No assignments match your search' 
                    : activeTab === 'upcoming' 
                      ? 'No upcoming assignments' 
                      : 'No completed assignments'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Create Assignment Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Create Assignment</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Title *</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                placeholder="Assignment title"
                placeholderTextColor={colors.icon}
                value={newAssignment.title}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, title: text }))}
              />
              
              <Text style={[styles.inputLabel, { color: colors.text }]}>Description</Text>
              <TextInput
                style={[styles.textArea, { borderColor: colors.icon, color: colors.text }]}
                placeholder="Assignment description"
                placeholderTextColor={colors.icon}
                value={newAssignment.description}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={4}
              />
              
              <Text style={[styles.inputLabel, { color: colors.text }]}>Class *</Text>
              <View style={[styles.selectContainer, { borderColor: colors.icon }]}>
                {classes.map(cls => (
                  <TouchableOpacity
                    key={cls.id}
                    style={[
                      styles.classOption,
                      newAssignment.class_id === cls.id && { backgroundColor: colors.tint + '20' }
                    ]}
                    onPress={() => setNewAssignment(prev => ({ ...prev, class_id: cls.id }))}
                  >
                    <Text
                      style={[
                        styles.classOptionText,
                        { color: colors.text },
                        newAssignment.class_id === cls.id && { color: colors.tint }
                      ]}
                    >
                      {cls.name}
                    </Text>
                    {newAssignment.class_id === cls.id && (
                      <Ionicons name="checkmark" size={18} color={colors.tint} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={[styles.inputLabel, { color: colors.text }]}>Due Date *</Text>
              <TouchableOpacity
                style={[styles.dateButton, { borderColor: colors.icon }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: colors.text }}>
                  {newAssignment.due_date.toLocaleString()}
                </Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={newAssignment.due_date}
                  mode="datetime"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              
              <Text style={[styles.inputLabel, { color: colors.text }]}>Points</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                placeholder="Points (default: 100)"
                placeholderTextColor={colors.icon}
                value={newAssignment.points.toString()}
                onChangeText={(text) => {
                  const points = parseInt(text) || 0;
                  setNewAssignment(prev => ({ ...prev, points }));
                }}
                keyboardType="number-pad"
              />
              
              <TouchableOpacity
                style={[styles.createButton, { backgroundColor: colors.tint }]}
                onPress={handleCreateAssignment}
              >
                <Text style={styles.createButtonText}>Create Assignment</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      
      {/* Floating Action Button for Teachers */}
      {user?.role === 'teacher' && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.tint }]}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 46,
    borderRadius: 23,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
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
  assignmentsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  assignmentCard: {
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  courseIndicator: {
    width: 8,
  },
  assignmentContent: {
    padding: 16,
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  assignmentDescription: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  dueDate: {
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalScrollView: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  classOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classOptionText: {
    fontSize: 16,
  },
  dateButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  createButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
}); 