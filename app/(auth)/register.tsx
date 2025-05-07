import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

// Secret access codes for restricted roles
// In a real app, these would be validated server-side and not stored in the client
const ACCESS_CODES = {
  teacher: 'TEACHER2024',
  admin: 'ADMIN2024SECRET'
};

export default function RegisterScreen() {
  const params = useLocalSearchParams();
  const initialRole = (params.role as 'student' | 'teacher' | 'parent' | 'admin') || 'student';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [role, setRole] = useState(initialRole);
  
  const { signUp, isLoaded, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !fullName) {
      Alert.alert('Missing fields', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match');
      return;
    }

    // Validate access code for restricted roles
    if (role === 'teacher' && accessCode !== ACCESS_CODES.teacher) {
      // Redirect to auth error screen instead of showing an alert
      router.push({
        pathname: '/(auth)/auth-error',
        params: { 
          type: 'invalid_access_code',
          message: 'The teacher access code you entered is not valid.'
        }
      });
      return;
    }

    if (role === 'admin' && accessCode !== ACCESS_CODES.admin) {
      // Redirect to auth error screen instead of showing an alert
      router.push({
        pathname: '/(auth)/auth-error',
        params: { 
          type: 'invalid_access_code',
          message: 'The admin access code you entered is not valid.'
        }
      });
      return;
    }

    if (!isLoaded || !signUp) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }

    try {
      setLoading(true);
      
      // Split the full name into first and last names
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Create the user with Clerk
      const signUpResponse = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        unsafeMetadata: {
          role,
          fullName
        }
      });
      
      // Prepare verification
      await signUpResponse.prepareEmailAddressVerification({ strategy: "email_code" });
      
      // Navigate to the confirmation email screen
      router.replace({
        pathname: '/(auth)/confirm-email',
        params: { email }
      });
    } catch (error: any) {
      // Handle registration errors with the auth-error screen
      console.error('Sign up error:', error);
      
      if (error.errors && error.errors[0]) {
        const errorMessage = error.errors[0].message;
        if (errorMessage.includes('already exists')) {
          router.push({
            pathname: '/(auth)/auth-error',
            params: { 
              type: 'email_in_use',
              message: 'This email address is already registered.'
            }
          });
        } else {
          router.push({
            pathname: '/(auth)/auth-error',
            params: { 
              type: 'general',
              message: errorMessage || 'An error occurred during registration.'
            }
          });
        }
      } else {
        router.push({
          pathname: '/(auth)/auth-error',
          params: { 
            type: 'general',
            message: 'An error occurred during registration.'
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const requiresAccessCode = role === 'teacher' || role === 'admin';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { color: colors.text }]}>GMV School</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>Create your account</Text>
        </View>
        
        <View style={styles.formContainer}>
          {(loading || !isLoaded) && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.tint} />
            </View>
          )}
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>I am a:</Text>
          <View style={styles.roleSelector}>
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                role === 'student' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
              ]}
              onPress={() => setRole('student')}
              disabled={loading || !isLoaded}
            >
              <Ionicons 
                name="school-outline" 
                size={18} 
                color={role === 'student' ? colors.tint : colors.icon} 
                style={styles.roleIcon} 
              />
              <Text style={[
                styles.roleText, 
                { color: role === 'student' ? colors.tint : colors.icon }
              ]}>
                Student
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                role === 'parent' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
              ]}
              onPress={() => setRole('parent')}
              disabled={loading || !isLoaded}
            >
              <Ionicons 
                name="people-outline" 
                size={18} 
                color={role === 'parent' ? colors.tint : colors.icon} 
                style={styles.roleIcon} 
              />
              <Text style={[
                styles.roleText, 
                { color: role === 'parent' ? colors.tint : colors.icon }
              ]}>
                Parent
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                role === 'teacher' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
              ]}
              onPress={() => setRole('teacher')}
              disabled={loading || !isLoaded}
            >
              <Ionicons 
                name="person-outline" 
                size={18} 
                color={role === 'teacher' ? colors.tint : colors.icon} 
                style={styles.roleIcon} 
              />
              <Text style={[
                styles.roleText, 
                { color: role === 'teacher' ? colors.tint : colors.icon }
              ]}>
                Teacher
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                role === 'admin' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
              ]}
              onPress={() => setRole('admin')}
              disabled={loading || !isLoaded}
            >
              <Ionicons 
                name="shield-outline" 
                size={18} 
                color={role === 'admin' ? colors.tint : colors.icon} 
                style={styles.roleIcon} 
              />
              <Text style={[
                styles.roleText, 
                { color: role === 'admin' ? colors.tint : colors.icon }
              ]}>
                Admin
              </Text>
            </TouchableOpacity>
          </View>
          
          {requiresAccessCode && (
            <View style={styles.securityNotice}>
              <Ionicons name="information-circle" size={20} color={colors.icon} style={styles.infoIcon} />
              <Text style={[styles.securityText, { color: colors.icon }]}>
                {role === 'teacher' 
                  ? 'Teacher accounts require an access code from your school administrator.' 
                  : 'Admin accounts require a special security code.'}
              </Text>
            </View>
          )}
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>Full Name *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Full Name"
            placeholderTextColor={colors.icon}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            editable={!loading}
          />
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>Email *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.icon}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>Password *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.icon}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
          
          <Text style={[styles.inputLabel, { color: colors.text }]}>Confirm Password *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="Confirm Password"
            placeholderTextColor={colors.icon}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />
          
          {requiresAccessCode && (
            <>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Access Code *</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
                placeholder={`${role.charAt(0).toUpperCase() + role.slice(1)} Access Code`}
                placeholderTextColor={colors.icon}
                value={accessCode}
                onChangeText={setAccessCode}
                secureTextEntry
                editable={!loading}
              />
            </>
          )}
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.tint }]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.icon }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')} disabled={loading}>
            <Text style={[styles.link, { color: colors.tint }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  roleSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roleButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    marginBottom: 10,
  },
  roleButtonActive: {
    borderWidth: 1,
  },
  roleIcon: {
    marginRight: 6,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 8,
  },
  securityText: {
    fontSize: 14,
    flex: 1,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 