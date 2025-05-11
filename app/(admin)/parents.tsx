import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
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

type Parent = {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  children: StudentLink[];
};

type Student = {
  id: string;
  email: string | null;
  fullName: string | null;
};

type StudentLink = {
  id: string;
  fullName: string | null;
  relationshipType: string | null;
};

type StudentRelationship = {
  parentId: string;
  studentId: string;
  relationshipType: string | null;
  student?: {
    id: string;
    fullName: string | null;
  };
};

export default function AdminParentsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [parents, setParents] = useState<Parent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredParents, setFilteredParents] = useState<Parent[]>([]);
  
  // Modals
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isParentDetailsModalVisible, setIsParentDetailsModalVisible] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  
  // Link form
  const [linkData, setLinkData] = useState({
    parentId: '',
    studentId: '',
    relationship: 'Parent'
  });
  
  useEffect(() => {
    fetchParentsAndStudents();
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      const filtered = parents.filter(parent => {
        const name = parent.fullName?.toLowerCase() || '';
        const email = parent.email?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return name.includes(query) || email.includes(query);
      });
      
      setFilteredParents(filtered);
    } else {
      setFilteredParents(parents);
    }
  }, [searchQuery, parents]);
  
  const fetchParentsAndStudents = async () => {
    try {
      setLoading(true);
      
      // Fetch all parent profiles
      const parentProfiles = await prisma.user.findMany({
        where: {
          role: 'parent'
        }
      });
        
      // Fetch all student profiles for dropdown
      const studentProfiles = await prisma.user.findMany({
        where: {
          role: 'student'
        },
        select: {
          id: true,
          email: true,
          fullName: true
        }
      });
        
      // Fetch parent-student relationships
      const relationships = await prisma.parentStudentRelationship.findMany({
        include: {
          student: {
            select: {
              id: true,
              fullName: true
            }
          }
        }
      });
        
      // Build parent objects with children
      const parentMap = new Map<string, Parent>();
      
      parentProfiles.forEach(parent => {
        parentMap.set(parent.id, {
          ...parent,
          children: []
        });
      });
      
      // Add children to parents
      relationships.forEach(rel => {
        const parent = parentMap.get(rel.parentId);
        if (parent && parent.children) {
          // Default student name
          let studentName = 'Unknown Student';
          
          // Try to safely access the student data
          try {
            if (rel.student && rel.student.fullName) {
              studentName = rel.student.fullName;
            }
          } catch (e) {
            console.error("Error extracting student name:", e);
          }
          
          parent.children.push({
            id: rel.studentId,
            fullName: studentName,
            relationshipType: rel.relationshipType
          });
        }
      });
      
      setParents(Array.from(parentMap.values()));
      setFilteredParents(Array.from(parentMap.values()));
      setStudents(studentProfiles || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load parent data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLinkParentToStudent = async () => {
    if (!linkData.parentId || !linkData.studentId) {
      Alert.alert('Missing Information', 'Please select both a parent and a student');
      return;
    }
    
    try {
      setLoading(true);
      
      // Check if this relationship already exists
      const existing = await prisma.parentStudentRelationship.findFirst({
        where: {
          parentId: linkData.parentId,
          studentId: linkData.studentId
        }
      });
        
      if (existing) {
        Alert.alert('Already Linked', 'This parent and student are already linked');
        return;
      }
      
      // Create the new relationship
      await prisma.parentStudentRelationship.create({
        data: {
          parentId: linkData.parentId,
          studentId: linkData.studentId,
          relationshipType: linkData.relationship
        }
      });
        
      // Reset the form
      setLinkData({
        parentId: '',
        studentId: '',
        relationship: 'Parent'
      });
      
      setIsLinkModalVisible(false);
      
      // Refresh data
      fetchParentsAndStudents();
      
      Alert.alert('Success', 'Parent linked to student successfully');
      
    } catch (error: any) {
      console.error('Error linking parent to student:', error);
      Alert.alert('Error', error.message || 'Failed to link parent and student');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlinkStudent = async (parentId: string, studentId: string) => {
    Alert.alert(
      'Confirm Unlink',
      'Are you sure you want to remove this link between parent and student?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Unlink',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              
              await prisma.parentStudentRelationship.deleteMany({
                where: {
                  parentId: parentId,
                  studentId: studentId
                }
              });

              // Refresh data
              fetchParentsAndStudents();
              
              if (selectedParent) {
                // Update selected parent children
                setSelectedParent({
                  ...selectedParent,
                  children: selectedParent.children.filter(child => child.id !== studentId)
                });
              }
              
              Alert.alert('Success', 'Parent unlinked from student');
              
            } catch (error) {
              console.error('Error unlinking parent from student:', error);
              Alert.alert('Error', 'Failed to unlink parent from student');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const openParentDetails = (parent: Parent) => {
    setSelectedParent(parent);
    setIsParentDetailsModalVisible(true);
  };

  const renderParentItem = ({ item }: { item: Parent }) => (
    <TouchableOpacity 
      style={[styles.parentCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}
      onPress={() => openParentDetails(item)}
    >
      <View style={styles.parentHeader}>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentName, { color: colors.text }]}>
            {item.fullName || 'Unnamed Parent'}
          </Text>
          <Text style={[styles.parentEmail, { color: colors.icon }]}>
            {item.email}
          </Text>
        </View>
        
        <View style={styles.childCount}>
          <Text style={[styles.childCountText, { color: colors.text }]}>
            {item.children.length}
          </Text>
          <Text style={[styles.childLabel, { color: colors.icon }]}>
            {item.children.length === 1 ? 'Child' : 'Children'}
          </Text>
        </View>
      </View>
      
      {item.children.length > 0 && (
        <View style={styles.childrenPreview}>
          {item.children.slice(0, 2).map((child, index) => (
            <View key={child.id} style={styles.childTag}>
              <Text style={styles.childTagText} numberOfLines={1}>
                {child.fullName || 'Student'}
              </Text>
            </View>
          ))}
          
          {item.children.length > 2 && (
            <View style={styles.childTag}>
              <Text style={styles.childTagText}>+{item.children.length - 2}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  // Parent Details Modal
  const renderParentDetailsModal = () => (
    <Modal
      visible={isParentDetailsModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsParentDetailsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Parent Details</Text>
            <TouchableOpacity onPress={() => setIsParentDetailsModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          {selectedParent && (
            <ScrollView style={styles.modalBody}>
              <View style={styles.parentProfile}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: colors.tint }]}>
                  <Text style={styles.avatarText}>
                    {selectedParent.fullName?.charAt(0) || 'P'}
                  </Text>
                </View>
                
                <Text style={[styles.detailName, { color: colors.text }]}>
                  {selectedParent.fullName || 'Unnamed Parent'}
                </Text>
                <Text style={[styles.detailEmail, { color: colors.icon }]}>
                  {selectedParent.email}
                </Text>
              </View>
              
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Linked Children</Text>
                <TouchableOpacity 
                  style={[styles.addLinkButton, { backgroundColor: colors.tint }]}
                  onPress={() => {
                    setLinkData({
                      ...linkData,
                      parentId: selectedParent.id
                    });
                    setIsParentDetailsModalVisible(false);
                    setIsLinkModalVisible(true);
                  }}
                >
                  <Ionicons name="add" size={18} color="white" />
                  <Text style={styles.addLinkButtonText}>Add Child</Text>
                </TouchableOpacity>
              </View>
              
              {selectedParent.children.length === 0 ? (
                <View style={styles.emptyChildren}>
                  <Text style={[styles.emptyText, { color: colors.icon }]}>
                    No children linked to this parent
                  </Text>
                </View>
              ) : (
                selectedParent.children.map(child => (
                  <View 
                    key={child.id} 
                    style={[styles.childItem, { backgroundColor: colors === Colors.dark ? '#2A2A2A' : '#EFEFEF' }]}
                  >
                    <View style={styles.childDetail}>
                      <Text style={[styles.childDetailName, { color: colors.text }]}>
                        {child.fullName || 'Student'}
                      </Text>
                      <Text style={[styles.childRelationship, { color: colors.icon }]}>
                        {child.relationshipType || 'Parent'}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      style={[styles.unlinkButton, { backgroundColor: '#F44336' + '20' }]}
                      onPress={() => handleUnlinkStudent(selectedParent.id, child.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#F44336" />
                      <Text style={{ color: '#F44336', marginLeft: 4 }}>Unlink</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );

  // Link Parent to Student Modal
  const renderLinkModal = () => (
    <Modal
      visible={isLinkModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsLinkModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Link Parent to Student</Text>
            <TouchableOpacity onPress={() => setIsLinkModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalForm}>
            {/* Parent Selector */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>Parent *</Text>
            <View style={[styles.selector, { borderColor: colors.icon, backgroundColor: colors === Colors.dark ? '#2A2A2A' : '#EFEFEF' }]}>
              <ScrollView style={styles.selectorScroll}>
                {linkData.parentId ? (
                  <TouchableOpacity 
                    style={[styles.selectedItem, { backgroundColor: colors.tint + '20' }]}
                    onPress={() => setLinkData(prev => ({ ...prev, parentId: '' }))}
                  >
                    <Text style={[styles.selectedItemText, { color: colors.text }]}>
                      {parents.find(p => p.id === linkData.parentId)?.fullName || 
                       parents.find(p => p.id === linkData.parentId)?.email || 
                       'Selected Parent'}
                    </Text>
                    <Ionicons name="close-circle" size={18} color={colors.text} />
                  </TouchableOpacity>
                ) : (
                  parents.map(parent => (
                    <TouchableOpacity 
                      key={parent.id}
                      style={styles.selectorItem}
                      onPress={() => setLinkData(prev => ({ ...prev, parentId: parent.id }))}
                    >
                      <Text style={[styles.selectorItemText, { color: colors.text }]}>
                        {parent.fullName || parent.email}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
            
            {/* Student Selector */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>Student *</Text>
            <View style={[styles.selector, { borderColor: colors.icon, backgroundColor: colors === Colors.dark ? '#2A2A2A' : '#EFEFEF' }]}>
              <ScrollView style={styles.selectorScroll}>
                {linkData.studentId ? (
                  <TouchableOpacity 
                    style={[styles.selectedItem, { backgroundColor: colors.tint + '20' }]}
                    onPress={() => setLinkData(prev => ({ ...prev, studentId: '' }))}
                  >
                    <Text style={[styles.selectedItemText, { color: colors.text }]}>
                      {students.find(s => s.id === linkData.studentId)?.fullName || 
                       students.find(s => s.id === linkData.studentId)?.email || 
                       'Selected Student'}
                    </Text>
                    <Ionicons name="close-circle" size={18} color={colors.text} />
                  </TouchableOpacity>
                ) : (
                  students.map(student => (
                    <TouchableOpacity 
                      key={student.id}
                      style={styles.selectorItem}
                      onPress={() => setLinkData(prev => ({ ...prev, studentId: student.id }))}
                    >
                      <Text style={[styles.selectorItemText, { color: colors.text }]}>
                        {student.fullName || student.email}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
            
            {/* Relationship */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>Relationship</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text, backgroundColor: colors === Colors.dark ? '#2A2A2A' : '#EFEFEF' }]}
              placeholder="e.g. Parent, Guardian, Grandparent"
              placeholderTextColor={colors.icon}
              value={linkData.relationship}
              onChangeText={(text) => setLinkData(prev => ({ ...prev, relationship: text }))}
            />
            
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleLinkParentToStudent}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Link Parent & Student</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Parent Management</Text>
        <TouchableOpacity 
          style={[styles.linkButton, { backgroundColor: colors.tint }]}
          onPress={() => setIsLinkModalVisible(true)}
        >
          <Ionicons name="link" size={18} color="white" />
          <Text style={styles.linkButtonText}>Link</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search parents..."
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
      
      {loading && parents.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <FlatList
          data={filteredParents}
          renderItem={renderParentItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.parentsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                {searchQuery ? 'No parents match your search' : 'No parents found'}
              </Text>
              <TouchableOpacity 
                style={[styles.emptyButton, { backgroundColor: colors.tint }]}
                onPress={() => setIsLinkModalVisible(true)}
              >
                <Text style={styles.emptyButtonText}>Link Parent to Student</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      
      {/* Modals */}
      {renderLinkModal()}
      {renderParentDetailsModal()}
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
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  linkButtonText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '500',
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
  parentsList: {
    padding: 20,
    paddingTop: 0,
  },
  parentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  parentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  parentInfo: {
    flex: 1,
  },
  parentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  parentEmail: {
    fontSize: 14,
  },
  childCount: {
    alignItems: 'center',
    marginLeft: 12,
  },
  childCountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  childLabel: {
    fontSize: 12,
  },
  childrenPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  childTag: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  childTagText: {
    fontSize: 12,
    color: '#666',
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
    maxHeight: '80%',
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
  modalBody: {
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
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
  selector: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 150,
  },
  selectorScroll: {
    padding: 8,
  },
  selectorItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  selectorItemText: {
    fontSize: 14,
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  selectedItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  parentProfile: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailEmail: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addLinkButton: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  addLinkButtonText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyChildren: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
  },
  childItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  childDetail: {
    flex: 1,
  },
  childDetailName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  childRelationship: {
    fontSize: 14,
  },
  unlinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
}); 