import { useClerk, useSignIn } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

interface ChangePasswordProps {
  onClose?: () => void;
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();
  const { user } = useAuth();
  const { signIn, isLoaded } = useSignIn();
  const clerk = useClerk();

  const handleChangePassword = async () => {
    // Reset states
    setError(null);
    setSuccess(false);
    
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }
    
    try {
      setLoading(true);
      
      // We need to use Clerk's SDK to change the password
      // First, verify the current password is correct
      if (!isLoaded || !user?.email) {
        throw new Error('User authentication not available');
      }
      
      // Use Clerk's updatePassword method
      await clerk.user?.updatePassword({
        currentPassword,
        newPassword,
      });
      
      // Success
      setSuccess(true);
      toast.showToast('Password changed successfully', 'success');
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Close modal if handler was provided
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1500); // Give user time to see success message
      }
    } catch (err) {
      console.error('Error changing password:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      setError(errorMessage);
      toast.showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Change Password</Text>
      
      <TextInput
        style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
        placeholder="Current Password"
        placeholderTextColor={colors.icon}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      
      <TextInput
        style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
        placeholder="New Password"
        placeholderTextColor={colors.icon}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      
      <TextInput
        style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
        placeholder="Confirm New Password"
        placeholderTextColor={colors.icon}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>Password changed successfully</Text>}
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Change Password</Text>
        )}
      </TouchableOpacity>
      
      {onClose && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={onClose}
          disabled={loading}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
  },
  successText: {
    color: '#34C759',
    marginBottom: 16,
  },
  cancelButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#8E8E93',
  },
}); 