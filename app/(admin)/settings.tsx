import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChangePassword from '../../components/ui/ChangePassword';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AdminSettingsScreen() {
  const { user, signOut } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };
  
  // Modal section
  const renderPasswordModal = () => {
    if (!showPasswordForm) return null;
    
    return (
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <ChangePassword onClose={() => setShowPasswordForm(false)} />
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <Stack.Screen options={{ 
        title: 'Settings',
        headerShown: true,
        headerBackTitle: 'Dashboard',
      }} />
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.tint + '20' }]}>
            <Text style={[styles.avatarText, { color: colors.tint }]}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
            </Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {user?.fullName || 'Admin User'}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.icon }]}>
              {user?.email || 'admin@example.com'}
            </Text>
            <Text style={[styles.profileRole, { color: colors.tint }]}>
              Administrator
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors.icon }]}
            onPress={() => setShowPasswordForm(true)}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="key-outline" size={22} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.icon }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="person-outline" size={22} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.icon }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.icon, true: colors.tint + '70' }}
              thumbColor={notificationsEnabled ? colors.tint : colors.icon}
            />
          </View>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.icon }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={22} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.icon, true: colors.tint + '70' }}
              thumbColor={darkModeEnabled ? colors.tint : colors.icon}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.icon }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="help-circle-outline" size={22} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.icon }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="document-text-outline" size={22} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Terms & Policies</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.signOutButton, { backgroundColor: '#FF3B30' + '10' }]}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={[styles.signOutText, { color: '#FF3B30' }]}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {renderPasswordModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 14,
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 30,
  },
  signOutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 