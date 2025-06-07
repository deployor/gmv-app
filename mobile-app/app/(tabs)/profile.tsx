import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/contexts/ThemeContext';
import AuthService from '@/services/authService';

export default function ProfileScreen() {
  const { colors, theme, setTheme, isDark } = useTheme();
  const user = AuthService.getUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const ProfileItem = ({ 
    icon, 
    title, 
    value, 
    onPress, 
    showArrow = true 
  }: {
    icon: string;
    title: string;
    value?: string;
    onPress?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.profileItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.profileItemLeft}>
        <FontAwesome name={icon as any} size={20} color={colors.primary} style={styles.profileItemIcon} />
        <Text style={[styles.profileItemTitle, { color: colors.text }]}>{title}</Text>
      </View>
      <View style={styles.profileItemRight}>
        {value && <Text style={[styles.profileItemValue, { color: colors.textSecondary }]}>{value}</Text>}
        {showArrow && onPress && (
          <FontAwesome name="chevron-right" size={14} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  const ThemeSelector = () => (
    <View style={[styles.themeSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.profileItemLeft}>
        <FontAwesome name="paint-brush" size={20} color={colors.primary} style={styles.profileItemIcon} />
        <Text style={[styles.profileItemTitle, { color: colors.text }]}>Theme</Text>
      </View>
      <View style={styles.themeOptions}>
        {(['light', 'dark', 'system'] as const).map((themeOption) => (
          <TouchableOpacity
            key={themeOption}
            style={[
              styles.themeOption,
              {
                backgroundColor: theme === themeOption ? colors.primary : 'transparent',
                borderColor: colors.border,
              }
            ]}
            onPress={() => handleThemeChange(themeOption)}
          >
            <Text style={[
              styles.themeOptionText,
              {
                color: theme === themeOption ? 'white' : colors.text,
              }
            ]}>
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    userRole: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
      paddingHorizontal: 12,
      paddingVertical: 4,
      backgroundColor: colors.primary + '20',
      borderRadius: 12,
    },
    section: {
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 10,
      paddingHorizontal: 20,
    },
    profileItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 1,
      borderWidth: 1,
    },
    profileItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    profileItemIcon: {
      marginRight: 15,
      width: 20,
    },
    profileItemTitle: {
      fontSize: 16,
      fontWeight: '500',
    },
    profileItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileItemValue: {
      fontSize: 14,
      marginRight: 10,
    },
    themeSelector: {
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 1,
      borderWidth: 1,
    },
    themeOptions: {
      flexDirection: 'row',
      marginTop: 10,
    },
    themeOption: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      marginRight: 8,
    },
    themeOptionText: {
      fontSize: 12,
      fontWeight: '500',
    },
    notificationItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 1,
      borderWidth: 1,
    },
    logoutButton: {
      backgroundColor: colors.error,
      marginHorizontal: 20,
      marginTop: 30,
      marginBottom: 40,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.userName, { color: colors.textSecondary }]}>
          Please sign in to view your profile
        </Text>
      </View>
    );
  }

  const userInitials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userInitials}</Text>
        </View>
        <Text style={styles.userName}>
          {user.displayName || `${user.firstName} ${user.lastName}`}
        </Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userRole}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileItem
          icon="user"
          title="Personal Information"
          onPress={() => {
            // Navigate to personal info screen
            Alert.alert('Coming Soon', 'Personal information editing will be available soon.');
          }}
        />
        <ProfileItem
          icon="lock"
          title="Privacy & Security"
          onPress={() => {
            Alert.alert('Coming Soon', 'Privacy settings will be available soon.');
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <ThemeSelector />
        
        <View style={[styles.notificationItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.profileItemLeft}>
            <FontAwesome name="bell" size={20} color={colors.primary} style={styles.profileItemIcon} />
            <Text style={[styles.profileItemTitle, { color: colors.text }]}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={notificationsEnabled ? colors.primary : colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <ProfileItem
          icon="question-circle"
          title="Help & Support"
          onPress={() => {
            Alert.alert('Help & Support', 'Contact the school administration for assistance.');
          }}
        />
        <ProfileItem
          icon="info-circle"
          title="About"
          value="v1.0.0"
          onPress={() => {
            Alert.alert('GMV School App', 'Version 1.0.0\n\nA comprehensive school management application.');
          }}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
} 