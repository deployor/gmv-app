import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AuthErrorScreen() {
  const params = useLocalSearchParams();
  const errorType = params.type as string || 'general';
  const errorMessage = params.message as string || 'An error occurred during authentication.';
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Define error details based on error type
  const getErrorDetails = () => {
    switch (errorType) {
      case 'invalid_credentials':
        return {
          title: 'Invalid Credentials',
          icon: 'key-outline' as keyof typeof Ionicons.glyphMap,
          description: 'The email or password you entered is incorrect.',
          action: 'Try again with the correct credentials or reset your password.'
        };
      case 'invalid_email':
        return {
          title: 'Invalid Email',
          icon: 'mail-outline' as keyof typeof Ionicons.glyphMap,
          description: 'The email address you entered is not valid.',
          action: 'Please enter a valid email address and try again.'
        };
      case 'email_in_use':
        return {
          title: 'Email Already in Use',
          icon: 'mail-outline' as keyof typeof Ionicons.glyphMap,
          description: 'This email address is already registered.',
          action: 'Please sign in or use a different email address.'
        };
      case 'invalid_access_code':
        return {
          title: 'Invalid Access Code',
          icon: 'shield-outline' as keyof typeof Ionicons.glyphMap,
          description: errorMessage || 'The access code you entered is not valid.',
          action: 'Please contact your administrator to get the correct access code.'
        };
      case 'account_locked':
        return {
          title: 'Account Locked',
          icon: 'lock-closed-outline' as keyof typeof Ionicons.glyphMap,
          description: 'Your account has been temporarily locked for security reasons.',
          action: 'Please contact support or try again later.'
        };
      case 'network_error':
        return {
          title: 'Network Error',
          icon: 'wifi-outline' as keyof typeof Ionicons.glyphMap,
          description: 'Could not connect to the authentication server.',
          action: 'Please check your internet connection and try again.'
        };
      default:
        return {
          title: 'Authentication Error',
          icon: 'alert-circle-outline' as keyof typeof Ionicons.glyphMap,
          description: errorMessage,
          action: 'Please try again or contact support if the issue persists.'
        };
    }
  };

  const errorDetails = getErrorDetails();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,59,48,0.1)' }]}>
          <Ionicons name={errorDetails.icon} size={60} color="#FF3B30" />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>{errorDetails.title}</Text>
        
        <Text style={[styles.description, { color: colors.icon }]}>
          {errorDetails.description}
        </Text>
        
        <Text style={[styles.action, { color: colors.icon }]}>
          {errorDetails.action}
        </Text>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
        
        {errorType === 'invalid_credentials' && (
          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.supportButton}
          onPress={() => router.back()}
        >
          <Text style={[styles.supportButtonText, { color: colors.tint }]}>
            Contact Support
          </Text>
        </TouchableOpacity>
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
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  action: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    marginVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontWeight: '500',
  },
  supportButton: {
    marginTop: 16,
  },
  supportButtonText: {
    fontSize: 16,
  },
}); 