import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { prisma } from '../../lib/prisma';

type Class = {
  id: string;
  name: string;
  description: string | null;
  teacherId: string | null;
  createdAt: Date;
  teacher: {
    id: string;
    fullName: string | null;
  } | null;
  student_count: number;
  imageUrl?: string | null;
  enrollments?: any[];
};

type Teacher = {
  id: string;
  fullName: string | null;
  email: string | null;
};

export default function AdminClassesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddClassModalVisible, setIsAddClassModalVisible] = useState(false);
  const [isEditClassModalVisible, setIsEditClassModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  
  // New class form state
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    teacher_id: ''
  });
  
  // Edit class form state
  const [editClass, setEditClass] = useState({
    name: '',
    description: '',
    teacher_id: ''
  });
  
  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = classes.filter(cls => {
        const name = cls.name.toLowerCase();
        const teacherName = cls.teacher?.fullName?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return name.includes(query) || teacherName.includes(query);
      });
      
      setFilteredClasses(filtered);
    } else {
      setFilteredClasses(classes);
    }
  }, [searchQuery, classes]);
  
  const fetchClasses = async () => {
    try {
      setLoading(true);
      
      // Fetch classes with teacher information and count enrollments
      const classData = await prisma.class.findMany({
        include: {
          teacher: {
            select: {
              id: true,
              fullName: true
            }
          },
          enrollments: {
            select: {
              id: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      // Process the data to include student count
      const processedData = classData.map(cls => ({
        ...cls,
        student_count: cls.enrollments.length || 0
      }));
      
      setClasses(processedData);
      setFilteredClasses(processedData);
    } catch (error) {
      console.error('Error fetching classes:', error);
      Alert.alert('Error', 'Failed to load classes');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTeachers = async () => {
    try {
      const teacherData = await prisma.user.findMany({
        where: {
          role: 'teacher'
        },
        select: {
          id: true,
          fullName: true,
          email: true
        }
      });
      
      setTeachers(teacherData as Teacher[]);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };
  
  const handleAddClass = async () => {
    if (!newClass.name || !newClass.teacher_id) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Create new class
      const createdClass = await prisma.class.create({
        data: {
          name: newClass.name,
          description: newClass.description || null,
          teacherId: newClass.teacher_id
        }
      });
        
      // Reset form and close modal
      setNewClass({
        name: '',
        description: '',
        teacher_id: ''
      });
      
      setIsAddClassModalVisible(false);
      
      // Refresh class list
      fetchClasses();
      
      Alert.alert('Success', 'Class created successfully');
    } catch (error: any) {
      console.error('Error creating class:', error);
      Alert.alert('Error', error.message || 'Failed to create class');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditClass = async () => {
    if (!selectedClass || !editClass.name || !editClass.teacher_id) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Update class
      await prisma.class.update({
        where: {
          id: selectedClass.id
        },
        data: {
          name: editClass.name,
          description: editClass.description || null,
          teacherId: editClass.teacher_id
        }
      });
        
      // Reset form and close modal
      setIsEditClassModalVisible(false);
      setSelectedClass(null);
      
      // Refresh class list
      fetchClasses();
      
      Alert.alert('Success', 'Class updated successfully');
    } catch (error: any) {
      console.error('Error updating class:', error);
      Alert.alert('Error', error.message || 'Failed to update class');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteClass = async (classId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this class? This will also remove all enrollments and assignments.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              
              // Delete class (cascade will handle related records)
              await prisma.class.delete({
                where: {
                  id: classId
                }
              });
                
              // Refresh class list
              fetchClasses();
              
              Alert.alert('Success', 'Class deleted successfully');
            } catch (error: any) {
              console.error('Error deleting class:', error);
              Alert.alert('Error', error.message || 'Failed to delete class');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };
  
  const openEditClassModal = (cls: Class) => {
    setSelectedClass(cls);
    setEditClass({
      name: cls.name,
      description: cls.description || '',
      teacher_id: cls.teacherId || ''
    });
    setIsEditClassModalVisible(true);
  };
  
  const renderClassItem = ({ item }: { item: Class }) => (
    <View style={[styles.classCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
      <View style={styles.classHeader}>
        <Text style={[styles.className, { color: colors.text }]}>
          {item.name}
        </Text>
        <View style={styles.classActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.tint + '20' }]}
            onPress={() => openEditClassModal(item)}
          >
            <Ionicons name="create-outline" size={18} color={colors.tint} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#F44336' + '20' }]}
            onPress={() => handleDeleteClass(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
      
      {item.description && (
        <Text style={[styles.classDescription, { color: colors.icon }]} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      
      <View style={styles.classFooter}>
        <View style={styles.teacherContainer}>
          <Ionicons name="person" size={14} color={colors.icon} style={styles.footerIcon} />
          <Text style={[styles.teacherName, { color: colors.icon }]}>
            {item.teacher?.fullName || 'No Teacher Assigned'}
          </Text>
        </View>
        
        <View style={styles.studentContainer}>
          <Ionicons name="people" size={14} color={colors.icon} style={styles.footerIcon} />
          <Text style={[styles.studentCount, { color: colors.icon }]}>
            {item.student_count} {item.student_count === 1 ? 'Student' : 'Students'}
          </Text>
        </View>
      </View>
    </View>
  );
  
  // Render Add Class Modal
  const renderAddClassModal = () => (
    <Modal
      visible={isAddClassModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsAddClassModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Create New Class</Text>
            <TouchableOpacity onPress={() => setIsAddClassModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalForm}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Class Name *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Class Name"
              placeholderTextColor={colors.icon}
              value={newClass.name}
              onChangeText={(text) => setNewClass(prev => ({ ...prev, name: text }))}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Description</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text, height: 100 }]}
              placeholder="Class Description"
              placeholderTextColor={colors.icon}
              value={newClass.description}
              onChangeText={(text) => setNewClass(prev => ({ ...prev, description: text }))}
              multiline={true}
              textAlignVertical="top"
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Teacher *</Text>
            <View style={[styles.picker, { borderColor: colors.icon }]}>
              {teachers.map(teacher => (
                <TouchableOpacity
                  key={teacher.id}
                  style={[
                    styles.pickerItem,
                    newClass.teacher_id === teacher.id && { backgroundColor: colors.tint + '20' }
                  ]}
                  onPress={() => setNewClass(prev => ({ ...prev, teacher_id: teacher.id }))}
                >
                  <Text 
                    style={[
                      styles.pickerItemText, 
                      { color: colors.text },
                      newClass.teacher_id === teacher.id && { color: colors.tint }
                    ]}
                  >
                    {teacher.fullName || teacher.email || 'No Teacher Assigned'}
                  </Text>
                  {newClass.teacher_id === teacher.id && (
                    <Ionicons name="checkmark" size={18} color={colors.tint} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleAddClass}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Create Class</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
  
  // Render Edit Class Modal
  const renderEditClassModal = () => (
    <Modal
      visible={isEditClassModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsEditClassModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Class</Text>
            <TouchableOpacity onPress={() => setIsEditClassModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalForm}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Class Name *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Class Name"
              placeholderTextColor={colors.icon}
              value={editClass.name}
              onChangeText={(text) => setEditClass(prev => ({ ...prev, name: text }))}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Description</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text, height: 100 }]}
              placeholder="Class Description"
              placeholderTextColor={colors.icon}
              value={editClass.description}
              onChangeText={(text) => setEditClass(prev => ({ ...prev, description: text }))}
              multiline={true}
              textAlignVertical="top"
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Teacher *</Text>
            <View style={[styles.picker, { borderColor: colors.icon }]}>
              {teachers.map(teacher => (
                <TouchableOpacity
                  key={teacher.id}
                  style={[
                    styles.pickerItem,
                    editClass.teacher_id === teacher.id && { backgroundColor: colors.tint + '20' }
                  ]}
                  onPress={() => setEditClass(prev => ({ ...prev, teacher_id: teacher.id }))}
                >
                  <Text 
                    style={[
                      styles.pickerItemText, 
                      { color: colors.text },
                      editClass.teacher_id === teacher.id && { color: colors.tint }
                    ]}
                  >
                    {teacher.fullName || teacher.email || 'No Teacher Assigned'}
                  </Text>
                  {editClass.teacher_id === teacher.id && (
                    <Ionicons name="checkmark" size={18} color={colors.tint} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleEditClass}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Update Class</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Classes</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.tint }]}
          onPress={() => setIsAddClassModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search classes..."
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
      </View>
      
      {loading && classes.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <FlatList
          data={filteredClasses}
          renderItem={renderClassItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.classesList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                {searchQuery ? 'No classes match your search' : 'No classes found'}
              </Text>
              <TouchableOpacity 
                style={[styles.emptyButton, { backgroundColor: colors.tint }]}
                onPress={() => setIsAddClassModalVisible(true)}
              >
                <Text style={styles.emptyButtonText}>Create New Class</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      
      {/* Modals */}
      {renderAddClassModal()}
      {renderEditClassModal()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 46,
    borderRadius: 23,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classesList: {
    padding: 20,
    paddingTop: 0,
  },
  classCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
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
  classDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teacherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    marginRight: 4,
  },
  teacherName: {
    fontSize: 12,
  },
  studentCount: {
    fontSize: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  // Modal styles
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
  modalForm: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    maxHeight: 200,
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  pickerItemText: {
    fontSize: 16,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 