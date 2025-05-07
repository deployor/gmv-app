import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function ResetPasswordScreen() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { isLoaded, signIn, setActive } = useSignIn();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  const handleResetPassword = async () => {
    if (!code || !newPassword || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match');
      return;
    }

    if (!isLoaded || !signIn) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }

    try {
      setLoading(true);
      
      // Attempt the password reset using code
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword
      });

      if (result.status === 'complete') {
        // Password reset successful - sign in the user
        await setActive({ session: result.createdSessionId });
        toast.showToast('Password reset successful!', 'success');
        // Navigation will be handled by layout component based on auth state
      } else {
        Alert.alert('Error', 'Could not reset password. Please try again.');
      }
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      if (error.errors && error.errors[0]) {
        Alert.alert('Error', error.errors[0].message);
      } else {
        Alert.alert('Error', 'Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
        disabled={loading || !isLoaded}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed-outline" size={60} color={colors.tint} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
        
        <Text style={[styles.description, { color: colors.icon }]}>
          Enter the verification code sent to your email and your new password.
        </Text>
        
        {(loading || !isLoaded) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        )}
        
        <View style={styles.form}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>Verification Code</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Enter code"
            placeholderTextColor={colors.icon}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            editable={!loading && isLoaded}
          />
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>New Password</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Enter new password"
            placeholderTextColor={colors.icon}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            editable={!loading && isLoaded}
          />
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>Confirm Password</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Confirm new password"
            placeholderTextColor={colors.icon}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading && isLoaded}
          />
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleResetPassword}
            disabled={loading || !isLoaded || !code || !newPassword || !confirmPassword}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  iconContainer: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
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
}); 