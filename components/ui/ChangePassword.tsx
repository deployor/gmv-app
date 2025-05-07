import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';
import { supabase } from '../../lib/supabase';

export default function ChangePassword({ onClose }: { onClose?: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  const handleChangePassword = async () => {
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      
      // First sign in with existing credentials to verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        console.error('Error verifying current password:', signInError);
        Alert.alert('Error', 'Current password is incorrect');
        return;
      }
      
      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (updateError) {
        console.error('Error updating password:', updateError);
        throw updateError;
      }
      
      // Success
      toast.showToast('Password updated successfully', 'success');
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Close modal if provided
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.showToast('Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Change Password</Text>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Current Password</Text>
        <View style={[styles.passwordContainer, { borderColor: colors.icon }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            placeholder="Enter current password"
            placeholderTextColor={colors.icon}
            editable={!loading}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            <Ionicons 
              name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color={colors.icon} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
        <View style={[styles.passwordContainer, { borderColor: colors.icon }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            placeholder="Enter new password"
            placeholderTextColor={colors.icon}
            editable={!loading}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowNewPassword(!showNewPassword)}
          >
            <Ionicons 
              name={showNewPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color={colors.icon} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Confirm New Password</Text>
        <View style={[styles.passwordContainer, { borderColor: colors.icon }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor={colors.icon}
            editable={!loading}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons 
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color={colors.icon} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Update Password</Text>
        )}
      </TouchableOpacity>
      
      {onClose && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={onClose}
          disabled={loading}
        >
          <Text style={[styles.cancelText, { color: colors.icon }]}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
  },
}); 