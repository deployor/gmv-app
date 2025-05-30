import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { prisma } from '../../lib/prisma';

interface ClassItem {
  id: string;
  name: string;
}

interface AssignmentItem {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  classId: string;
  points: number;
  className?: string;
  submissionCount?: number;
  createdAt: Date;
}

interface SubmissionItem {
  id: string;
  studentId: string;
  assignmentId: string;
  content: string | null;
  fileUrl: string | null;
  grade: number | null;
  feedback: string | null;
  isGraded: boolean;
  createdAt: Date;
  studentName?: string;
  studentEmail?: string;
}

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [points, setPoints] = useState('100');
  const [dueDate, setDueDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [fetchingAssignments, setFetchingAssignments] = useState(false);
  const [fetchingClasses, setFetchingClasses] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [fetchingSubmissions, setFetchingSubmissions] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionItem | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchClasses();
    fetchAssignments();
  }, []);

  const fetchClasses = async () => {
    if (!user?.id) return;
    
    try {
      setFetchingClasses(true);
      
      const data = await prisma.class.findMany({
        where: {
          teacherId: user.id
        },
        select: {
          id: true,
          name: true
        },
        orderBy: {
          name: 'asc'
        }
      });
      
      setClasses(data || []);
      
      // Set the first class as default if we have classes and no selection
      if (data && data.length > 0 && !selectedClassId) {
        setSelectedClassId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.showToast('Failed to load classes', 'error');
    } finally {
      setFetchingClasses(false);
    }
  };

  const fetchAssignments = async () => {
    if (!user?.id) return;
    
    try {
      setFetchingAssignments(true);
      
      // Get classes taught by this teacher
      const classesData = await prisma.class.findMany({
        where: {
          teacherId: user.id
        },
        select: {
          id: true
        }
      });
        
      if (!classesData || classesData.length === 0) {
        setAssignments([]);
        return;
      }
      
      const classIds = classesData.map((c: { id: string }) => c.id);
      
      // Get assignments for these classes
      const assignmentsData = await prisma.assignment.findMany({
        where: {
          classId: {
            in: classIds
          }
        },
        include: {
          class: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          dueDate: 'desc'
        }
      });
        
      // Process assignment data
      const processedAssignments = assignmentsData.map((assignment) => {
        return {
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          dueDate: assignment.dueDate,
          classId: assignment.classId,
          points: assignment.points,
          createdAt: assignment.createdAt,
          className: assignment.class.name
        };
      });
      
      // For each assignment, count submissions
      const assignmentsWithSubmissionCount = await Promise.all(
        processedAssignments.map(async (assignment) => {
          const count = await prisma.submission.count({
            where: {
              assignmentId: assignment.id
            }
          });
          
          return {
            ...assignment,
            submissionCount: count || 0
          };
        })
      );
      
      setAssignments(assignmentsWithSubmissionCount);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.showToast('Failed to load assignments', 'error');
    } finally {
      setFetchingAssignments(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (!title.trim() || !selectedClassId) {
      toast.showToast('Please provide a title and select a class', 'error');
      return;
    }

    try {
      setLoading(true);
      
      await prisma.assignment.create({
        data: {
          title: title.trim(),
          description: description.trim() || null,
          dueDate: dueDate,
          classId: selectedClassId,
          points: parseInt(points, 10) || 100
        }
      });

      // Reset form
      setTitle('');
      setDescription('');
      setPoints('100');
      setDueDate(new Date());
      
      toast.showToast('Assignment created successfully', 'success');
      fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.showToast('Failed to create assignment', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await prisma.assignment.delete({
        where: {
          id: assignmentId
        }
      });
      
      toast.showToast('Assignment deleted', 'success');
      fetchAssignments();
      
      // If we're viewing this assignment, close the modal
      if (selectedAssignment?.id === assignmentId) {
        setSelectedAssignment(null);
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.showToast('Failed to delete assignment', 'error');
    }
  };

  const handleViewAssignment = async (assignment: AssignmentItem) => {
    setSelectedAssignment(assignment);
    fetchSubmissions(assignment.id);
  };

  const fetchSubmissions = async (assignmentId: string) => {
    try {
      setFetchingSubmissions(true);
      
      // Get submissions for this assignment
      const submissionsData = await prisma.submission.findMany({
        where: {
          assignmentId: assignmentId
        }
      });
        
      if (!submissionsData || submissionsData.length === 0) {
        setSubmissions([]);
        return;
      }
      
      // Get student profiles for these submissions
      const studentIds = submissionsData.map((sub: { studentId: string }) => sub.studentId);
      
      const studentsData = await prisma.user.findMany({
        where: {
          id: {
            in: studentIds
          }
        }
      });
        
      // Process submissions with student data
      const processedSubmissions = submissionsData.map((submission) => {
        const student = studentsData?.find((s: { id: string }) => s.id === submission.studentId);
        
        return {
          id: submission.id,
          studentId: submission.studentId,
          assignmentId: submission.assignmentId,
          content: submission.content || '',
          fileUrl: submission.fileUrl,
          grade: submission.grade,
          feedback: submission.feedback,
          isGraded: submission.isGraded,
          createdAt: submission.createdAt,
          studentName: student?.fullName || 'Unknown',
          studentEmail: student?.email || 'No email'
        };
      });
      
      setSubmissions(processedSubmissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.showToast('Failed to load submissions', 'error');
    } finally {
      setFetchingSubmissions(false);
    }
  };

  const handleViewSubmission = (submission: SubmissionItem) => {
    setSelectedSubmission(submission);
    setGrade(submission.grade?.toString() || '');
    setFeedback(submission.feedback || '');
  };

  const handleGradeSubmission = async () => {
    if (!selectedSubmission) return;
    
    try {
      const gradeValue = grade ? parseInt(grade, 10) : null;
      
      await prisma.submission.update({
        where: {
          id: selectedSubmission.id
        },
        data: {
          grade: gradeValue,
          feedback: feedback || null,
          isGraded: gradeValue !== null
        }
      });
      
      // Update the submission in our local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === selectedSubmission.id 
            ? { 
                ...sub, 
                grade: gradeValue, 
                feedback, 
                isGraded: gradeValue !== null 
              } 
            : sub
        )
      );
      
      // Close the modal
      setSelectedSubmission(null);
      
      toast.showToast('Submission graded successfully', 'success');
    } catch (error) {
      console.error('Error grading submission:', error);
      toast.showToast('Failed to grade submission', 'error');
    }
  };

  const onChangeDatePicker = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const formatDate = (dateValue: Date) => {
    return new Date(dateValue).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Assignment details modal
  const renderAssignmentDetailsModal = () => {
    if (!selectedAssignment) return null;
    
    return (
      <Modal
        visible={selectedAssignment !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedAssignment(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedAssignment.title}</Text>
              <TouchableOpacity onPress={() => setSelectedAssignment(null)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollContent}>
              <View style={styles.assignmentDetails}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: colors.icon }]}>Class:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{selectedAssignment.className}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: colors.icon }]}>Due Date:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    {formatDate(selectedAssignment.dueDate)}
                  </Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: colors.icon }]}>Points:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{selectedAssignment.points}</Text>
                </View>
                
                {selectedAssignment.description && (
                  <View style={styles.descriptionContainer}>
                    <Text style={[styles.detailLabel, { color: colors.icon }]}>Description:</Text>
                    <Text style={[styles.descriptionText, { color: colors.text }]}>
                      {selectedAssignment.description}
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.submissionsSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Submissions</Text>
                
                {fetchingSubmissions ? (
                  <ActivityIndicator size="small" color={colors.tint} style={styles.loader} />
                ) : submissions.length === 0 ? (
                  <Text style={[styles.emptyText, { color: colors.icon }]}>No submissions yet</Text>
                ) : (
                  submissions.map(submission => (
                    <TouchableOpacity 
                      key={submission.id} 
                      style={[styles.submissionItem, { borderBottomColor: colors.icon }]}
                      onPress={() => handleViewSubmission(submission)}
                    >
                      <View style={styles.submissionInfo}>
                        <Text style={[styles.studentName, { color: colors.text }]}>{submission.studentName}</Text>
                        <Text style={[styles.submissionDate, { color: colors.icon }]}>
                          Submitted: {formatDate(submission.createdAt)}
                        </Text>
                      </View>
                      <View style={styles.gradeBadge}>
                        {submission.isGraded ? (
                          <View style={[styles.gradeContainer, { backgroundColor: colors.tint + '20' }]}>
                            <Text style={[styles.gradeText, { color: colors.tint }]}>
                              {submission.grade}/{selectedAssignment.points}
                            </Text>
                          </View>
                        ) : (
                          <View style={[styles.ungraded, { backgroundColor: colors.icon + '20' }]}>
                            <Text style={[styles.ungradedText, { color: colors.icon }]}>Ungraded</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Submission details modal
  const renderSubmissionDetailsModal = () => {
    if (!selectedSubmission) return null;
    
    return (
      <Modal
        visible={selectedSubmission !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedSubmission(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Student Submission</Text>
              <TouchableOpacity onPress={() => setSelectedSubmission(null)}>
                <Ionicons name="close" size={24} color={colors.icon} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollContent}>
              <View style={styles.submissionDetails}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: colors.icon }]}>Student:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{selectedSubmission.studentName}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: colors.icon }]}>Email:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{selectedSubmission.studentEmail}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: colors.icon }]}>Submitted:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    {formatDate(selectedSubmission.createdAt)}
                  </Text>
                </View>
                
                {selectedSubmission.content && (
                  <View style={styles.contentContainer}>
                    <Text style={[styles.detailLabel, { color: colors.icon }]}>Content:</Text>
                    <View style={[styles.submissionContent, { borderColor: colors.icon }]}>
                      <Text style={[styles.contentText, { color: colors.text }]}>
                        {selectedSubmission.content}
                      </Text>
                    </View>
                  </View>
                )}
                
                {selectedSubmission.fileUrl && (
                  <View style={styles.fileContainer}>
                    <Text style={[styles.detailLabel, { color: colors.icon }]}>Attached File:</Text>
                    <TouchableOpacity 
                      style={[styles.fileLink, { backgroundColor: colors.tint + '20' }]}
                      // In a real app, this would open the file
                    >
                      <Ionicons name="document-outline" size={20} color={colors.tint} />
                      <Text style={[styles.fileLinkText, { color: colors.tint }]}>View Attachment</Text>
                    </TouchableOpacity>
                  </View>
                )}
                
                <View style={styles.gradingSection}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Grade Submission</Text>
                  
                  <TextInput
                    style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                    placeholder="Grade (points)"
                    placeholderTextColor={colors.icon}
                    value={grade}
                    onChangeText={setGrade}
                    keyboardType="number-pad"
                  />
                  
                  <TextInput
                    style={[styles.textArea, { borderColor: colors.icon, color: colors.text }]}
                    placeholder="Feedback to student (optional)"
                    placeholderTextColor={colors.icon}
                    multiline
                    numberOfLines={4}
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                  
                  <TouchableOpacity
                    style={[styles.gradeButton, { backgroundColor: colors.tint }]}
                    onPress={handleGradeSubmission}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <>
                        <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                        <Text style={styles.gradeButtonText}>Save Grade</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Manage Assignments</Text>
      
      <View style={[styles.formContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Create New Assignment</Text>
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Assignment Title"
          placeholderTextColor={colors.icon}
          value={title}
          onChangeText={setTitle}
        />
        
        <View style={[styles.classPickerContainer, { borderColor: colors.icon }]}>
          <Text style={[styles.pickerLabel, { color: colors.icon }]}>Select Class</Text>
          {fetchingClasses ? (
            <ActivityIndicator size="small" color={colors.tint} />
          ) : classes.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.icon }]}>No classes available</Text>
          ) : (
            <Picker
              selectedValue={selectedClassId}
              onValueChange={(itemValue) => setSelectedClassId(itemValue)}
              style={{ color: colors.text }}
              dropdownIconColor={colors.icon}
            >
              {classes.map(classItem => (
                <Picker.Item 
                  key={classItem.id} 
                  label={classItem.name} 
                  value={classItem.id} 
                />
              ))}
            </Picker>
          )}
        </View>
        
        <TextInput
          style={[styles.textArea, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Assignment Description (optional)"
          placeholderTextColor={colors.icon}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
        
        <View style={styles.formRow}>
          <View style={[styles.pointsContainer, { borderColor: colors.icon }]}>
            <Text style={[styles.inputLabel, { color: colors.icon }]}>Points</Text>
            <TextInput
              style={[styles.pointsInput, { color: colors.text }]}
              value={points}
              onChangeText={setPoints}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.dateContainer}>
            <Text style={[styles.inputLabel, { color: colors.icon }]}>Due Date</Text>
            <TouchableOpacity
              style={[styles.dateButton, { borderColor: colors.icon }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: colors.text }}>
                {dueDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.icon} />
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="datetime"
                display="default"
                onChange={onChangeDatePicker}
                minimumDate={new Date()}
              />
            )}
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.tint }]}
          onPress={handleCreateAssignment}
          disabled={loading || classes.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.createButtonText}>Create Assignment</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.assignmentsList}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Assignments</Text>
        
        {fetchingAssignments ? (
          <ActivityIndicator size="large" color={colors.tint} style={styles.loader} />
        ) : assignments.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.icon }]}>No assignments created yet</Text>
        ) : (
          <ScrollView style={styles.assignmentsScroll}>
            {assignments.map((assignment) => (
              <View 
                key={assignment.id} 
                style={[styles.assignmentItem, { borderColor: colors.icon, backgroundColor: colors.background }]}
              >
                <TouchableOpacity
                  style={styles.assignmentHeader}
                  onPress={() => handleViewAssignment(assignment)}
                >
                  <View style={styles.assignmentInfo}>
                    <Text style={[styles.assignmentTitle, { color: colors.text }]}>{assignment.title}</Text>
                    <Text style={[styles.assignmentClass, { color: colors.icon }]}>
                      {assignment.className} • {assignment.submissionCount} submissions
                    </Text>
                    <Text style={[
                      styles.assignmentDue, 
                      { 
                        color: new Date(assignment.dueDate) < new Date() ? '#FF3B30' : colors.icon 
                      }
                    ]}>
                      Due: {formatDate(assignment.dueDate)}
                    </Text>
                  </View>
                  
                  <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: '#FF3B30' + '20' }]}
                    onPress={() => handleDeleteAssignment(assignment.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </TouchableOpacity>
                
                {assignment.description && (
                  <Text style={[styles.assignmentDescriptionPreview, { color: colors.text }]}>
                    {assignment.description.length > 100 
                      ? assignment.description.substring(0, 100) + '...' 
                      : assignment.description}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      
      {renderAssignmentDetailsModal()}
      {renderSubmissionDetailsModal()}
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
  classPickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  pickerLabel: {
    fontSize: 12,
    marginTop: 8,
    marginLeft: 8,
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
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  pointsContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  pointsInput: {
    fontSize: 16,
  },
  dateContainer: {
    flex: 2,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  assignmentsList: {
    flex: 1,
  },
  assignmentsScroll: {
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
  assignmentItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  assignmentClass: {
    fontSize: 14,
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 14,
  },
  assignmentDescriptionPreview: {
    fontSize: 15,
    marginTop: 8,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  assignmentDetails: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  submissionsSection: {
    marginTop: 10,
  },
  submissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  submissionInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  submissionDate: {
    fontSize: 12,
  },
  gradeBadge: {
    marginLeft: 8,
  },
  gradeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ungraded: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ungradedText: {
    fontSize: 14,
  },
  submissionDetails: {
    marginBottom: 20,
  },
  contentContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  submissionContent: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  fileContainer: {
    marginBottom: 16,
  },
  fileLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  fileLinkText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  gradingSection: {
    marginTop: 20,
  },
  gradeButton: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  gradeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 