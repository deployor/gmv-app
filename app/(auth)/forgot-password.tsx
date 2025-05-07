import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const { isLoaded, signIn } = useSignIn();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!isLoaded || !signIn) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }

    try {
      setLoading(true);
      
      // Request a password reset with Clerk
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email
      });

      setResetSent(true);
      toast.showToast('Password reset instructions sent', 'success');
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      if (error.errors && error.errors[0]) {
        const errorMessage = error.errors[0].message;
        
        if (errorMessage.includes('network')) {
          router.push({
            pathname: '/(auth)/auth-error',
            params: { 
              type: 'network_error',
              message: 'Could not connect to the server to reset your password.'
            }
          });
        } else if (errorMessage.includes('Invalid email')) {
          router.push({
            pathname: '/(auth)/auth-error',
            params: { 
              type: 'invalid_email',
              message: 'The email address you entered is not valid.'
            }
          });
        } else {
          router.push({
            pathname: '/(auth)/auth-error',
            params: { 
              type: 'general',
              message: errorMessage || 'Failed to send password reset email.'
            }
          });
        }
      } else {
        router.push({
          pathname: '/(auth)/auth-error',
          params: { 
            type: 'general',
            message: 'Failed to send password reset email.'
          }
        });
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
      
      {!resetSent ? (
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-open-outline" size={60} color={colors.tint} />
          </View>
          
          <Text style={[styles.title, { color: colors.text }]}>Forgot Password?</Text>
          
          <Text style={[styles.description, { color: colors.icon }]}>
            Enter your email address and we'll send you a code to reset your password.
          </Text>
          
          <View style={styles.form}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Enter your email"
              placeholderTextColor={colors.icon}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading && isLoaded}
            />
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.tint }]}
              onPress={handleResetPassword}
              disabled={loading || !email || !isLoaded}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail-outline" size={60} color={colors.tint} />
          </View>
          
          <Text style={[styles.title, { color: colors.text }]}>Check Your Email</Text>
          
          <Text style={[styles.description, { color: colors.icon }]}>
            We've sent password reset instructions to:
          </Text>
          
          <Text style={[styles.emailText, { color: colors.text }]}>{email}</Text>
          
          <Text style={[styles.instruction, { color: colors.icon }]}>
            Please check your email inbox for a code and follow the instructions to reset your password.
          </Text>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.tint, marginBottom: 16 }]}
            onPress={() => router.push('/(auth)/reset-password' as any)}
          >
            <Text style={styles.buttonText}>Enter Reset Code</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resendButton}
            onPress={handleResetPassword}
            disabled={loading || !isLoaded}
          >
            {loading ? (
              <ActivityIndicator color={colors.tint} size="small" />
            ) : (
              <Text style={[styles.resendButtonText, { color: colors.tint }]}>
                Resend Reset Email
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
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
  emailText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 16,
    padding: 8,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 