import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function AdminSettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { signOut } = useAuth();
  
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(colorScheme === 'dark');
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: colors.tint + '80' }}
              thumbColor={notificationsEnabled ? colors.tint : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: colors.tint + '80' }}
              thumbColor={darkModeEnabled ? colors.tint : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Application</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={() => Alert.alert('Backup', 'Backup functionality would be implemented here')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="save-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Backup Database</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={() => Alert.alert('Restore', 'Restore functionality would be implemented here')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="refresh-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Restore Data</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={() => Alert.alert('System Logs', 'System logs would be shown here')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="list-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>System Logs</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={() => Alert.alert('Change Password', 'Password change functionality would be implemented here')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="key-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={() => Alert.alert('Two-Factor Authentication', '2FA would be configured here')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Two-Factor Authentication</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={() => Alert.alert('Profile', 'Profile editing would be implemented here')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="person-outline" size={22} color={colors.icon} style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: colors.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomColor: colors === Colors.dark ? '#333' : '#EEE' }]}
            onPress={handleSignOut}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="log-out-outline" size={22} color="#F44336" style={styles.settingIcon} />
              <Text style={[styles.settingText, { color: '#F44336' }]}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.icon }]}>GMV School App v1.0.0</Text>
        </View>
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
  }
}); 