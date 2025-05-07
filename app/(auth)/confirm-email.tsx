import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function ConfirmEmailScreen() {
  const params = useLocalSearchParams();
  const email = params.email as string || 'your email';
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();
  
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleVerifyEmail = async () => {
    if (!isLoaded || !signUp) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }
    
    if (!verificationCode) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }
    
    try {
      setLoading(true);
      
      // Attempt to verify the email code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      });
      
      if (completeSignUp.status === 'complete') {
        // Set this session as active which changes the authentication state
        await setActive({ session: completeSignUp.createdSessionId });
        toast.showToast('Email verified successfully!', 'success');
        // Navigation will be handled by the layout component based on user role
      } else {
        console.log('Verification status:', completeSignUp.status);
        Alert.alert('Verification Error', 'Unable to verify email. Please try again.');
      }
    } catch (error: any) {
      console.error('Email verification error:', error);
      
      if (error.errors && error.errors[0]) {
        Alert.alert('Verification Error', error.errors[0].message);
      } else {
        Alert.alert('Verification Error', 'An error occurred during verification.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!isLoaded || !signUp) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }
    
    try {
      setLoading(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      toast.showToast('Verification code resent!', 'success');
    } catch (error: any) {
      console.error('Error resending code:', error);
      toast.showToast('Failed to resend verification code', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.content}>
        {(loading || !isLoaded) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        )}
        
        <View style={styles.iconContainer}>
          <Ionicons name="mail" size={80} color={colors.tint} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>Verify your email</Text>
        
        <Text style={[styles.description, { color: colors.icon }]}>
          We've sent a verification code to:
        </Text>
        
        <Text style={[styles.email, { color: colors.text }]}>{email}</Text>
        
        <Text style={[styles.instruction, { color: colors.icon }]}>
          Enter the code below to verify your account and continue.
        </Text>
        
        <TextInput
          style={[styles.codeInput, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Verification Code"
          placeholderTextColor={colors.icon}
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
          autoCapitalize="none"
          editable={!loading && isLoaded}
        />
        
        <TouchableOpacity 
          style={[styles.verifyButton, { backgroundColor: colors.tint }]} 
          onPress={handleVerifyEmail}
          disabled={loading || !isLoaded}
        >
          <Text style={styles.verifyButtonText}>Verify Email</Text>
        </TouchableOpacity>
        
        <View style={styles.separator} />
        
        <View style={styles.helpSection}>
          <Text style={[styles.helpTitle, { color: colors.text }]}>Didn't receive the code?</Text>
          
          <Text style={[styles.helpText, { color: colors.icon }]}>
            • Check your spam or junk folder
          </Text>
          
          <Text style={[styles.helpText, { color: colors.icon }]}>
            • Verify you entered the correct email address
          </Text>
          
          <TouchableOpacity 
            style={[styles.resendButton, { borderColor: colors.tint }]}
            onPress={handleResendCode}
            disabled={loading || !isLoaded}
          >
            <Text style={[styles.resendButtonText, { color: colors.tint }]}>
              Resend Verification Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.replace('/(auth)/login')}
        disabled={loading || !isLoaded}
      >
        <Text style={[styles.backButtonText, { color: colors.tint }]}>
          Back to Login
        </Text>
      </TouchableOpacity>
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
    borderRadius: 70,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  codeInput: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  verifyButton: {
    height: 50,
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 32,
  },
  helpSection: {
    width: '100%',
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 8,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 40,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 