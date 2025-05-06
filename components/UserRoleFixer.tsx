import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function UserRoleFixer() {
  const { user, userProfile, fixUserRole } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin' | 'parent'>('student');

  // Check if current user is admin
  const isAdmin = userProfile?.role === 'admin';

  // Load profiles
  useEffect(() => {
    if (!isAdmin) return;

    const loadProfiles = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        setProfiles(data || []);
      } catch (error) {
        console.error('Error loading profiles:', error);
        Alert.alert('Error', 'Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [isAdmin]);

  // Handle fix role
  const handleFixRole = async () => {
    if (!userId) {
      Alert.alert('Error', 'Please enter a user ID');
      return;
    }

    try {
      await fixUserRole(userId, selectedRole);
      Alert.alert('Success', `Role updated to ${selectedRole}`);
      
      // Refresh the profiles list
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fixing role:', error);
      Alert.alert('Error', 'Failed to update role');
    }
  };

  // Handle select profile
  const handleSelectProfile = (profile: any) => {
    setUserId(profile.id);
    setSelectedRole(profile.role || 'student');
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text>You must be an admin to use this tool.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Role Fixer</Text>
      
      <View style={styles.inputContainer}>
        <Text>User ID:</Text>
        <TextInput
          style={styles.input}
          value={userId}
          onChangeText={setUserId}
          placeholder="Enter user ID"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text>Role:</Text>
        <View style={styles.radioGroup}>
          {(['student', 'teacher', 'parent', 'admin'] as const).map(role => (
            <View key={role} style={styles.radioOption}>
              <Button
                title={role}
                onPress={() => setSelectedRole(role)}
                color={selectedRole === role ? '#4630EB' : '#999'}
              />
            </View>
          ))}
        </View>
      </View>
      
      <Button 
        title="Fix Role" 
        onPress={handleFixRole}
        disabled={!userId}
      />
      
      <Text style={styles.subtitle}>Recent Users (Click to select)</Text>
      
      {loading ? (
        <Text>Loading profiles...</Text>
      ) : (
        <ScrollView style={styles.profileList}>
          {profiles.map(profile => (
            <View 
              key={profile.id} 
              style={[
                styles.profileItem,
                userId === profile.id && styles.selectedProfile
              ]}
            >
              <Text 
                style={styles.profileText}
                onPress={() => handleSelectProfile(profile)}
              >
                {profile.email || 'No Email'} - Role: {profile.role || 'No role'}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 5,
  },
  radioOption: {
    marginRight: 10,
  },
  profileList: {
    marginTop: 10,
    maxHeight: 300,
  },
  profileItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedProfile: {
    backgroundColor: '#e6f7ff',
  },
  profileText: {
    fontSize: 14,
  }
}); 