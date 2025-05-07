import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { supabase } from '../../lib/supabase';

interface ClassItem {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  created_at: string;
  studentCount?: number;
}

interface StudentItem {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
}

export default function TeacherClasses() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [className, setClassName] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<StudentItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [classStudents, setClassStudents] = useState<StudentItem[]>([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    if (!user?.id) return;
    
    try {
      setFetchingClasses(true);
      
      // Fetch classes created by the teacher
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher_id', user.id)
        .order('created_at', { ascending: false });

      if (classesError) throw classesError;

      // For each class, count the number of enrolled students
      const classesWithStudentCount = await Promise.all((classesData || []).map(async (classItem) => {
        const { count, error: countError } = await supabase
          .from('enrollments')
          .select('*', { count: 'exact', head: true })
          .eq('class_id', classItem.id);
          
        if (countError) throw countError;
        
        return {
          ...classItem,
          studentCount: count || 0
        };
      }));

      setClasses(classesWithStudentCount);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.showToast('Failed to load classes', 'error');
    } finally {
      setFetchingClasses(false);
    }
  };

  const handleCreateClass = async () => {
    if (!className.trim()) {
      toast.showToast('Please provide a class name', 'error');
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('classes')
        .insert([
          {
            name: className.trim(),
            description: classDescription.trim(),
            image_url: imageUrl.trim() || null,
            teacher_id: user?.id
          }
        ])
        .select();

      if (error) throw error;

      // Reset form
      setClassName('');
      setClassDescription('');
      setImageUrl('');
      
      toast.showToast('Class created successfully', 'success');
      fetchClasses();
    } catch (error) {
      console.error('Error creating class:', error);
      toast.showToast('Failed to create class', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId);

      if (error) throw error;
      
      toast.showToast('Class deleted', 'success');
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.showToast('Failed to delete class', 'error');
    }
  };

  const handleViewClass = async (classItem: ClassItem) => {
    setSelectedClass(classItem);
    fetchClassStudents(classItem.id);
  };

  const fetchClassStudents = async (classId: string) => {
    try {
      setFetchingStudents(true);
      
      // Get enrollments for this class
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('student_id')
        .eq('class_id', classId);
        
      if (enrollmentsError) throw enrollmentsError;
      
      if (!enrollmentsData || enrollmentsData.length === 0) {
        setClassStudents([]);
        return;
      }
      
      // Get student profiles
      const studentIds = enrollmentsData.map(enrollment => enrollment.student_id);
      const { data: studentsData, error: studentsError } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .in('id', studentIds);
        
      if (studentsError) throw studentsError;
      
      setClassStudents(studentsData || []);
    } catch (error) {
      console.error('Error fetching class students:', error);
      toast.showToast('Failed to load students', 'error');
    } finally {
      setFetchingStudents(false);
    }
  };

  const searchStudents = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setSearching(true);
      
      // Search for students by name or email
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .eq('role', 'student')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(10);
        
      if (error) throw error;
      
      // Filter out students already in the class
      const filteredResults = (data || []).filter(
        student => !classStudents.some(cs => cs.id === student.id)
      );
      
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error searching students:', error);
      toast.showToast('Error searching for students', 'error');
    } finally {
      setSearching(false);
    }
  };

  const handleAddStudent = async (studentId: string) => {
    if (!selectedClass) return;
    
    try {
      // Add student to class
      const { error } = await supabase
        .from('enrollments')
        .insert([
          {
            student_id: studentId,
            class_id: selectedClass.id
          }
        ]);
        
      if (error) throw error;
      
      // Update the student list
      fetchClassStudents(selectedClass.id);
      
      // Clear search
      setSearchText('');
      setSearchResults([]);
      
      toast.showToast('Student added to class', 'success');
    } catch (error) {
      console.error('Error adding student to class:', error);
      toast.showToast('Failed to add student', 'error');
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!selectedClass) return;
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('class_id', selectedClass.id)
        .eq('student_id', studentId);
        
      if (error) throw error;
      
      // Update the student list
      setClassStudents(classStudents.filter(student => student.id !== studentId));
      toast.showToast('Student removed from class', 'success');
    } catch (error) {
      console.error('Error removing student from class:', error);
      toast.showToast('Failed to remove student', 'error');
    }
  };

  // Class details modal
  const renderClassDetailsModal = () => {
    if (!selectedClass) return null;
    
    return (
      <Modal
        visible={selectedClass !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedClass(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedClass.name}</Text>
              <TouchableOpacity onPress={() => setSelectedClass(null)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollContent}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
              <Text style={[styles.classDescription, { color: colors.text }]}>
                {selectedClass.description || 'No description available'}
              </Text>
              
              {selectedClass.image_url && (
                <Image 
                  source={{ uri: selectedClass.image_url }} 
                  style={styles.classImage}
                  resizeMode="cover"
                />
              )}
              
              <View style={styles.studentsSection}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Students</Text>
                  <TouchableOpacity 
                    style={[styles.addButton, { backgroundColor: colors.tint }]}
                    onPress={() => setIsAddStudentModalVisible(true)}
                  >
                    <Ionicons name="person-add" size={16} color="white" />
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
                
                {fetchingStudents ? (
                  <ActivityIndicator size="small" color={colors.tint} style={styles.loader} />
                ) : classStudents.length === 0 ? (
                  <Text style={[styles.emptyText, { color: colors.icon }]}>No students enrolled yet</Text>
                ) : (
                  classStudents.map(student => (
                    <View key={student.id} style={[styles.studentItem, { borderBottomColor: colors.icon }]}>
                      <View style={styles.studentInfo}>
                        <View style={[styles.avatarCircle, { backgroundColor: colors.tint + '20' }]}>
                          <Text style={[styles.avatarText, { color: colors.tint }]}>
                            {student.full_name.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                        <View style={styles.studentTextInfo}>
                          <Text style={[styles.studentName, { color: colors.text }]}>{student.full_name}</Text>
                          <Text style={[styles.studentEmail, { color: colors.icon }]}>{student.email}</Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={() => handleRemoveStudent(student.id)}
                      >
                        <Ionicons name="close-circle" size={24} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Add student modal
  const renderAddStudentModal = () => {
    return (
      <Modal
        visible={isAddStudentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddStudentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Add Students</Text>
              <TouchableOpacity onPress={() => {
                setIsAddStudentModalVisible(false);
                setSearchText('');
                setSearchResults([]);
              }}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.searchContainer, { borderColor: colors.icon }]}>
              <Ionicons name="search" size={20} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  searchStudents(text);
                }}
                placeholder="Search by name or email..."
                placeholderTextColor={colors.icon}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => {
                  setSearchText('');
                  setSearchResults([]);
                }}>
                  <Ionicons name="close-circle" size={20} color={colors.icon} />
                </TouchableOpacity>
              )}
            </View>
            
            {searching ? (
              <ActivityIndicator size="small" color={colors.tint} style={styles.searchingLoader} />
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                style={styles.searchResultsList}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[styles.searchResultItem, { borderBottomColor: colors.icon }]}
                    onPress={() => handleAddStudent(item.id)}
                  >
                    <View style={styles.studentInfo}>
                      <View style={[styles.avatarCircle, { backgroundColor: colors.tint + '20' }]}>
                        <Text style={[styles.avatarText, { color: colors.tint }]}>
                          {item.full_name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.studentTextInfo}>
                        <Text style={[styles.studentName, { color: colors.text }]}>{item.full_name}</Text>
                        <Text style={[styles.studentEmail, { color: colors.icon }]}>{item.email}</Text>
                      </View>
                    </View>
                    <Ionicons name="add-circle" size={24} color={colors.tint} />
                  </TouchableOpacity>
                )}
              />
            ) : searchText.length > 2 ? (
              <Text style={[styles.emptyText, { color: colors.icon, marginTop: 20 }]}>No students found</Text>
            ) : searchText.length > 0 ? (
              <Text style={[styles.emptyText, { color: colors.icon, marginTop: 20 }]}>Type at least 3 characters</Text>
            ) : null}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Manage Classes</Text>
      
      <View style={[styles.formContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Create New Class</Text>
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Class Name"
          placeholderTextColor={colors.icon}
          value={className}
          onChangeText={setClassName}
        />
        
        <TextInput
          style={[styles.textArea, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Class Description (optional)"
          placeholderTextColor={colors.icon}
          multiline
          numberOfLines={4}
          value={classDescription}
          onChangeText={setClassDescription}
        />
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Image URL (optional)"
          placeholderTextColor={colors.icon}
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.tint }]}
          onPress={handleCreateClass}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.createButtonText}>Create Class</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.classList}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Classes</Text>
        
        {fetchingClasses ? (
          <ActivityIndicator size="large" color={colors.tint} style={styles.loader} />
        ) : classes.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.icon }]}>You haven't created any classes yet</Text>
        ) : (
          <ScrollView style={styles.classesScroll}>
            {classes.map((classItem) => (
              <View 
                key={classItem.id} 
                style={[styles.classItem, { borderColor: colors.icon, backgroundColor: colors.background }]}
              >
                <View style={styles.classHeader}>
                  <View style={styles.classInfo}>
                    <Text style={[styles.className, { color: colors.text }]}>{classItem.name}</Text>
                    <Text style={[styles.classStats, { color: colors.icon }]}>
                      {classItem.studentCount} {classItem.studentCount === 1 ? 'student' : 'students'}
                    </Text>
                  </View>
                  <View style={styles.classActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: colors.tint + '20' }]}
                      onPress={() => handleViewClass(classItem)}
                    >
                      <Ionicons name="people-outline" size={20} color={colors.tint} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#FF3B30' + '20' }]}
                      onPress={() => handleDeleteClass(classItem.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {classItem.description && (
                  <Text style={[styles.classDescriptionPreview, { color: colors.text }]}>
                    {classItem.description.length > 100 
                      ? classItem.description.substring(0, 100) + '...' 
                      : classItem.description}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      
      {renderClassDetailsModal()}
      {renderAddStudentModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  createButton: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  classList: {
    flex: 1,
  },
  classesScroll: {
    flex: 1,
  },
  loader: {
    marginTop: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
  classItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 17,
    fontWeight: '600',
  },
  classStats: {
    fontSize: 14,
    marginTop: 4,
  },
  classDescriptionPreview: {
    fontSize: 15,
  },
  classActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalScrollContent: {
    flex: 1,
  },
  classDescription: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  classImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  studentsSection: {
    marginTop: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentTextInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
  },
  studentEmail: {
    fontSize: 14,
  },
  removeButton: {
    padding: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  searchingLoader: {
    marginTop: 20,
  },
  searchResultsList: {
    flex: 1,
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
}); 