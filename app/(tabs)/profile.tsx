import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function ProfileScreen() {
  const { user, signOut, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [relationship, setRelationship] = useState('Parent');
  const [linkingStudent, setLinkingStudent] = useState(false);
  
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      // Refreshes the user profile data from the database
      await refreshUserProfile();
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'There was a problem signing out.');
    }
  };

  const handleLinkStudent = async () => {
    if (!studentEmail) {
      Alert.alert('Missing Information', 'Please enter the student\'s email');
      return;
    }

    try {
      setLinkingStudent(true);
      
      // This would typically be handled via an API call to a server endpoint
      // that uses Prisma to update the database
      // For now, we'll show an alert that this feature is being implemented
      Alert.alert(
        'Feature in Development',
        'The ability to link with students is currently being implemented. Please check back later.'
      );
      
      setShowLinkForm(false);
      setStudentEmail('');
      
    } catch (error) {
      console.error('Error linking student:', error);
      Alert.alert('Error', 'Failed to link student');
    } finally {
      setLinkingStudent(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
            <Text style={styles.avatarText}>
              {user?.fullName?.split(' ').map((n: string) => n[0]).join('') || user?.fullName?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{user?.fullName || 'User'}</Text>
          <Text style={[styles.email, { color: colors.icon }]}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.infoContainer}>
            <View style={[styles.infoItem, { borderColor: colors === Colors.dark ? '#333' : '#EEE' }]}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Role</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user?.role || 'Student'}
              </Text>
            </View>
            
            <View style={[styles.infoItem, { borderColor: colors === Colors.dark ? '#333' : '#EEE' }]}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Grade</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>N/A</Text>
            </View>
            
            <View style={[styles.infoItem, { borderColor: colors === Colors.dark ? '#333' : '#EEE' }]}>
              <Text style={[styles.infoLabel, { color: colors.icon }]}>Student ID</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>N/A</Text>
            </View>
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="notifications-outline" size={24} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: colors.tint }}
              thumbColor={'#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="moon-outline" size={24} color={colors.icon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: colors.tint }}
              thumbColor={'#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuContent}>
              <Ionicons name="person-outline" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuContent}>
              <Ionicons name="help-circle-outline" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <View style={styles.menuContent}>
              <Ionicons name="information-circle-outline" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
        
        {user?.role === 'parent' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Parent Settings</Text>
            
            {!showLinkForm ? (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.tint }]}
                onPress={() => setShowLinkForm(true)}
              >
                <Text style={styles.buttonText}>Link with Student</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.formContainer}>
                <TextInput
                  style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                  placeholder="Student's Email"
                  placeholderTextColor={colors.icon}
                  value={studentEmail}
                  onChangeText={setStudentEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!linkingStudent}
                />
                
                <TextInput
                  style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                  placeholder="Relationship (e.g. Parent, Guardian)"
                  placeholderTextColor={colors.icon}
                  value={relationship}
                  onChangeText={setRelationship}
                  editable={!linkingStudent}
                />
                
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.icon, flex: 1, marginRight: 8 }]}
                    onPress={() => setShowLinkForm(false)}
                    disabled={linkingStudent}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.tint, flex: 1, marginLeft: 8 }]}
                    onPress={handleLinkStudent}
                    disabled={linkingStudent}
                  >
                    {linkingStudent ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Link</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.signOutButton, { backgroundColor: colors === Colors.dark ? '#333' : '#EEE' }]}
          onPress={handleSignOut}
        >
          <Text style={[styles.signOutText, { color: colors.text }]}>Sign Out</Text>
        </TouchableOpacity>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 24,
  },
  infoContainer: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
  },
  signOutButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  formContainer: {
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}); 