import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function LoginScreen() {
  const [superUserPassword, setSuperUserPassword] = useState('');
  const [superUserMode, setSuperUserMode] = useState(false);
  
  const { user, isSignedIn, loading, signInWithMicrosoft, signInSuperUser } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  // Check if user is already signed in and redirect to appropriate screen
  useEffect(() => {
    if (isSignedIn && user) {
      console.log('LoginScreen: User already signed in, redirecting to appropriate dashboard');
      
      let redirectPath;
      switch (user.role) {
        case 'admin':
          redirectPath = '/(admin)/dashboard' as const;
          break;
        case 'parent':
          redirectPath = '/(parent)/dashboard' as const;
          break;
        case 'teacher':
          redirectPath = '/(teacher)/dashboard' as const;
          break;
        default:
          redirectPath = '/(tabs)' as const;
          break;
      }
      
      router.replace(redirectPath);
    }
  }, [isSignedIn, user]);

  const handleMicrosoftSignIn = async () => {
    if (loading) {
      return;
    }

    try {
      setLocalLoading(true);
      await signInWithMicrosoft();
    } catch (error) {
      console.error('Microsoft auth error:', error);
      toast.showToast('Failed to sign in with Microsoft', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleSuperUserSignIn = async () => {
    if (!superUserPassword) {
      Alert.alert('Missing Password', 'Please enter the super user password');
      return;
    }

    try {
      setLocalLoading(true);
      const success = await signInSuperUser(superUserPassword);
      
      if (!success) {
        Alert.alert('Authentication Failed', 'The super user password is incorrect');
      }
    } catch (error) {
      console.error('Super user auth error:', error);
      toast.showToast('Failed to sign in as super user', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  // Microsoft logo color: #0078D4
  const MICROSOFT_BLUE = '#0078D4';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.logoContainer}>
        <Text style={[styles.logo, { color: colors.text }]}>GMV School</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>Welcome back to your learning journey</Text>
      </View>
      
      <View style={styles.formContainer}>
        {(localLoading || loading) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        )}
        
        {superUserMode ? (
          <>
            <Text style={[styles.modeTitle, { color: colors.text }]}>Super User Login</Text>
            
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Super User Password"
              placeholderTextColor={colors.icon}
              value={superUserPassword}
              onChangeText={setSuperUserPassword}
              secureTextEntry
              editable={!localLoading && !loading}
            />
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.tint }]} 
              onPress={handleSuperUserSignIn}
              disabled={localLoading || loading}
            >
              <Text style={styles.buttonText}>Sign In as Super User</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.switchModeButton} 
              onPress={() => setSuperUserMode(false)}
            >
              <Text style={[styles.switchModeText, { color: colors.tint }]}>
                Return to Regular Login
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.modeTitle, { color: colors.text }]}>Sign in with your account</Text>
            
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: MICROSOFT_BLUE }]} 
              onPress={handleMicrosoftSignIn}
              disabled={localLoading || loading}
            >
              <Ionicons name="logo-windows" size={20} color="white" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Sign in with Microsoft</Text>
            </TouchableOpacity>
            
            <View style={styles.orContainer}>
              <View style={[styles.divider, { backgroundColor: colors.icon }]} />
              <Text style={[styles.orText, { color: colors.icon }]}>OR</Text>
              <View style={[styles.divider, { backgroundColor: colors.icon }]} />
            </View>
            
            <TouchableOpacity 
              style={styles.superUserButton} 
              onPress={() => setSuperUserMode(true)}
            >
              <Ionicons name="shield-outline" size={20} color={colors.tint} style={styles.socialIcon} />
              <Text style={[styles.superUserButtonText, { color: colors.tint }]}>
                Super User Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
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
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
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
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  superUserButton: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  superUserButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  switchModeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 