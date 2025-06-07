import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import AuthService from '@/services/authService';

export default function LoginScreen() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleMicrosoftLogin = async () => {
    try {
      setLoading(true);
      await AuthService.loginWithMicrosoft();
      
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        'Unable to sign in with Microsoft. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 40,
      borderRadius: 60,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 40,
      textAlign: 'center',
      lineHeight: 22,
    },
    loginButton: {
      backgroundColor: '#0078D4', // Microsoft blue!
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 250,
      marginBottom: 20,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
    },
    microsoftIcon: {
      width: 20,
      height: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>GMV</Text>
      </View>
      
      <Text style={styles.title}>Welcome to GMV School</Text>
      <Text style={styles.subtitle}>
        Sign in with your Microsoft account to access school resources, news, and announcements.
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleMicrosoftLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <>
            <View style={[styles.microsoftIcon, { backgroundColor: 'white', borderRadius: 2 }]} />
            <Text style={styles.loginButtonText}>Sign in with Microsoft</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing in, you agree to our Terms of Service{'\n'}
          and Privacy Policy
        </Text>
      </View>
    </View>
  );
} 