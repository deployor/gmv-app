import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { supabase } from '../../lib/supabase';
import RichTextEditor from './RichTextEditor';

export default function AdminAnnouncements() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [fetchingAnnouncements, setFetchingAnnouncements] = useState(false);
  
  // Target audience
  const [targetTeachers, setTargetTeachers] = useState(true);
  const [targetStudents, setTargetStudents] = useState(false);
  const [targetParents, setTargetParents] = useState(false);
  const [targetAdmins, setTargetAdmins] = useState(false);
  
  // Expiration
  const [hasExpiration, setHasExpiration] = useState(false);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setFetchingAnnouncements(true);
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.showToast('Failed to load announcements', 'error');
    } finally {
      setFetchingAnnouncements(false);
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!title.trim() || !content.trim()) {
      toast.showToast('Please provide both title and content', 'error');
      return;
    }

    try {
      setLoading(true);
      
      // Create target audience object
      const targetAudience = {
        teachers: targetTeachers,
        students: targetStudents,
        parents: targetParents,
        admins: targetAdmins
      };
      
      // Create announcement object
      const announcementData = {
        title: title.trim(),
        content: content.trim(),
        author_id: (await supabase.auth.getUser()).data.user?.id,
        target_audience: targetAudience,
        expires_at: hasExpiration ? expirationDate.toISOString() : null
      };

      const { error } = await supabase
        .from('announcements')
        .insert([announcementData]);

      if (error) throw error;

      // Reset form and refresh announcements
      setTitle('');
      setContent('');
      setTargetTeachers(true);
      setTargetStudents(false);
      setTargetParents(false);
      setTargetAdmins(false);
      setHasExpiration(false);
      setExpirationDate(new Date());
      
      toast.showToast('Announcement created successfully', 'success');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.showToast('Failed to create announcement', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.showToast('Announcement deleted', 'success');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.showToast('Failed to delete announcement', 'error');
    }
  };

  const onChangeDatePicker = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpirationDate(selectedDate);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Manage Announcements</Text>
      
      <View style={[styles.formContainer, { backgroundColor: colors.background, borderColor: colors.icon }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Create New Announcement</Text>
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Announcement Title"
          placeholderTextColor={colors.icon}
          value={title}
          onChangeText={setTitle}
        />
        
        <View style={[styles.richTextContainer, { borderColor: colors.icon }]}>
          <RichTextEditor
            initialContent=""
            onChange={setContent}
            placeholder="Announcement content..."
          />
        </View>
        
        <View style={styles.targetAudienceContainer}>
          <Text style={[styles.labelText, { color: colors.text }]}>Target Audience:</Text>
          
          <View style={styles.audienceOptions}>
            <View style={styles.audienceOption}>
              <Switch
                value={targetTeachers}
                onValueChange={setTargetTeachers}
                trackColor={{ false: colors.icon, true: colors.tint + '70' }}
                thumbColor={targetTeachers ? colors.tint : colors.icon}
              />
              <Text style={[styles.audienceText, { color: colors.text }]}>Teachers</Text>
            </View>
            
            <View style={styles.audienceOption}>
              <Switch
                value={targetStudents}
                onValueChange={setTargetStudents}
                trackColor={{ false: colors.icon, true: colors.tint + '70' }}
                thumbColor={targetStudents ? colors.tint : colors.icon}
              />
              <Text style={[styles.audienceText, { color: colors.text }]}>Students</Text>
            </View>
            
            <View style={styles.audienceOption}>
              <Switch
                value={targetParents}
                onValueChange={setTargetParents}
                trackColor={{ false: colors.icon, true: colors.tint + '70' }}
                thumbColor={targetParents ? colors.tint : colors.icon}
              />
              <Text style={[styles.audienceText, { color: colors.text }]}>Parents</Text>
            </View>
            
            <View style={styles.audienceOption}>
              <Switch
                value={targetAdmins}
                onValueChange={setTargetAdmins}
                trackColor={{ false: colors.icon, true: colors.tint + '70' }}
                thumbColor={targetAdmins ? colors.tint : colors.icon}
              />
              <Text style={[styles.audienceText, { color: colors.text }]}>Admins</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.expirationContainer}>
          <View style={styles.expirationHeader}>
            <Text style={[styles.labelText, { color: colors.text }]}>Set Expiration:</Text>
            <Switch
              value={hasExpiration}
              onValueChange={setHasExpiration}
              trackColor={{ false: colors.icon, true: colors.tint + '70' }}
              thumbColor={hasExpiration ? colors.tint : colors.icon}
            />
          </View>
          
          {hasExpiration && (
            <TouchableOpacity
              style={[styles.datePickerButton, { borderColor: colors.icon }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: colors.text }}>
                {expirationDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
          
          {showDatePicker && (
            <DateTimePicker
              value={expirationDate}
              mode="datetime"
              display="default"
              onChange={onChangeDatePicker}
              minimumDate={new Date()}
            />
          )}
        </View>
        
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.tint }]}
          onPress={handleCreateAnnouncement}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text style={styles.createButtonText}>Create Announcement</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.announcementsList}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Announcements</Text>
        
        {fetchingAnnouncements ? (
          <ActivityIndicator size="large" color={colors.tint} style={styles.loader} />
        ) : announcements.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.icon }]}>No announcements yet</Text>
        ) : (
          <ScrollView style={styles.announcementsScroll}>
            {announcements.map((announcement) => (
              <View 
                key={announcement.id} 
                style={[styles.announcementItem, { borderColor: colors.icon, backgroundColor: colors.background }]}
              >
                <View style={styles.announcementHeader}>
                  <Text style={[styles.announcementTitle, { color: colors.text }]}>{announcement.title}</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteAnnouncement(announcement.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.dateText, { color: colors.icon }]}>
                  Created: {formatDate(announcement.created_at)}
                </Text>
                
                {announcement.expires_at && (
                  <Text style={[styles.dateText, { color: colors.icon }]}>
                    Expires: {formatDate(announcement.expires_at)}
                  </Text>
                )}
                
                <View style={styles.targetBadges}>
                  {announcement.target_audience?.teachers && (
                    <View style={[styles.targetBadge, { backgroundColor: colors.tint + '30' }]}>
                      <Text style={[styles.targetBadgeText, { color: colors.tint }]}>Teachers</Text>
                    </View>
                  )}
                  {announcement.target_audience?.students && (
                    <View style={[styles.targetBadge, { backgroundColor: colors.tint + '30' }]}>
                      <Text style={[styles.targetBadgeText, { color: colors.tint }]}>Students</Text>
                    </View>
                  )}
                  {announcement.target_audience?.parents && (
                    <View style={[styles.targetBadge, { backgroundColor: colors.tint + '30' }]}>
                      <Text style={[styles.targetBadgeText, { color: colors.tint }]}>Parents</Text>
                    </View>
                  )}
                  {announcement.target_audience?.admins && (
                    <View style={[styles.targetBadge, { backgroundColor: colors.tint + '30' }]}>
                      <Text style={[styles.targetBadgeText, { color: colors.tint }]}>Admins</Text>
                    </View>
                  )}
                </View>
                
                <Text style={[styles.contentPreview, { color: colors.text }]}>
                  {announcement.content.length > 100 
                    ? announcement.content.substring(0, 100) + '...' 
                    : announcement.content}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
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
  richTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 150,
    marginBottom: 16,
    overflow: 'hidden',
  },
  targetAudienceContainer: {
    marginBottom: 16,
  },
  audienceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  audienceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  audienceText: {
    marginLeft: 8,
    fontSize: 15,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  expirationContainer: {
    marginBottom: 16,
  },
  expirationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
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
  announcementsList: {
    flex: 1,
  },
  announcementsScroll: {
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
  announcementItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  dateText: {
    fontSize: 13,
    marginBottom: 4,
  },
  targetBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 12,
  },
  targetBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  targetBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  contentPreview: {
    fontSize: 15,
    marginTop: 8,
  },
}); 