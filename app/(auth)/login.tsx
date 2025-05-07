import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../context/ToastContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'parent' | 'admin'>('student');
  
  const { signIn, isLoaded, setActive } = useSignIn();
  const { startOAuthFlow: startMicrosoftOAuthFlow } = useOAuth({ strategy: "oauth_microsoft" });
  const [loading, setLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const toast = useToast();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }

    if (!isLoaded || !signIn) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }

    try {
      setLoading(true);
      
      // Log the sign-in attempt
      console.log(`Attempting to sign in with email: ${email} and role: ${role}`);
      
      // Start the sign in process with Clerk
      const signInResponse = await signIn.create({
        identifier: email,
        password,
      });
      
      console.log('Sign in response status:', signInResponse.status);
      
      // This indicates the user was found and authenticated
      if (signInResponse.status === 'complete') {
        if (signInResponse.createdSessionId) {
          console.log('Created session with ID:', signInResponse.createdSessionId);
          
          // Set this session as active which changes the authentication state
          await setActive({ session: signInResponse.createdSessionId });
          toast.showToast('Signed in successfully!', 'success');
          // Navigation will be handled by the layout component when auth state changes
        } else {
          console.error('No session ID in complete response');
          toast.showToast('Authentication error - missing session', 'error');
        }
      } else if (signInResponse.status === 'needs_first_factor' || 
                 signInResponse.status === 'needs_second_factor') {
        // Handle 2FA or other factor requirements
        toast.showToast('Additional verification needed', 'info');
        // You would handle the factor verification flow here
      } else if (signInResponse.status === 'needs_identifier') {
        toast.showToast('Please enter your email address', 'info');
      } else if (signInResponse.status === 'needs_new_password') {
        toast.showToast('Please reset your password', 'info');
        // Handle password reset flow
      } else {
        // The sign in process requires more steps or failed
        console.log('Sign in returned unexpected status:', signInResponse.status);
        Alert.alert('Authentication Error', `Unexpected status: ${signInResponse.status}`);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Handle specific error types
      if (error.errors && error.errors.length > 0) {
        const errorMessage = error.errors[0].message;
        const errorCode = error.errors[0].code;
        
        console.log(`Auth error code: ${errorCode}, message: ${errorMessage}`);
        
        if (errorCode === 'form_identifier_not_found') {
          Alert.alert('Account Not Found', 'No account exists with this email address.');
        } else if (errorCode === 'form_password_incorrect') {
          Alert.alert('Incorrect Password', 'The password you entered is incorrect.');
        } else {
          Alert.alert('Authentication Error', errorMessage);
        }
      } else {
        Alert.alert('Authentication Error', 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    if (!isLoaded) {
      Alert.alert('Error', 'Auth system is not loaded yet');
      return;
    }

    try {
      setMicrosoftLoading(true);
      
      // Start the OAuth flow
      const result = await startMicrosoftOAuthFlow();
      console.log('Microsoft OAuth result:', JSON.stringify(result, null, 2));
      
      // Check if we have a valid result
      if (result && result.createdSessionId) {
        console.log('Successfully created session with ID:', result.createdSessionId);
        
        // Set the session as active
        if (result.setActive) {
          await result.setActive({ session: result.createdSessionId });
          toast.showToast('Signed in with Microsoft successfully!', 'success');
        } else {
          // Fallback to our regular setActive if the OAuth one isn't available
          await setActive({ session: result.createdSessionId });
          toast.showToast('Signed in with Microsoft successfully!', 'success');
        }
      } else {
        console.log('No session created. Full result:', result);
        toast.showToast('Microsoft sign in failed. Please try again.', 'error');
      }
    } catch (error: any) {
      console.error('Microsoft auth error:', error);
      toast.showToast('Failed to sign in with Microsoft', 'error');
    } finally {
      setMicrosoftLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push({
      pathname: '/register',
      params: { role }
    });
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
        {(loading || microsoftLoading || !isLoaded) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.tint} />
          </View>
        )}
        
        <View style={styles.roleSelector}>
          <TouchableOpacity 
            style={[
              styles.roleButton, 
              role === 'student' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
            ]}
            onPress={() => setRole('student')}
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
              role === 'teacher' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
            ]}
            onPress={() => setRole('teacher')}
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
              role === 'parent' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
            ]}
            onPress={() => setRole('parent')}
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
              role === 'admin' && [styles.roleButtonActive, { borderColor: colors.tint, backgroundColor: colors.tint + '10' }]
            ]}
            onPress={() => setRole('admin')}
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
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Email"
          placeholderTextColor={colors.icon}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading && isLoaded}
        />
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Password"
          placeholderTextColor={colors.icon}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading && isLoaded}
        />
        
        <TouchableOpacity 
          style={styles.forgotPasswordLink} 
          onPress={() => router.push('/(auth)/forgot-password')}
          disabled={loading || !isLoaded}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }]} 
          onPress={handleSignIn}
          disabled={loading || microsoftLoading || !isLoaded}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <View style={styles.orContainer}>
          <View style={[styles.divider, { backgroundColor: colors.icon }]} />
          <Text style={[styles.orText, { color: colors.icon }]}>OR</Text>
          <View style={[styles.divider, { backgroundColor: colors.icon }]} />
        </View>
        
        <TouchableOpacity 
          style={[styles.socialButton, { backgroundColor: MICROSOFT_BLUE }]} 
          onPress={handleMicrosoftSignIn}
          disabled={loading || microsoftLoading || !isLoaded}
        >
          <Ionicons name="logo-windows" size={20} color="white" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          Don&apos;t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={navigateToRegister} disabled={loading || !isLoaded}>
          <Text style={[styles.link, { color: colors.tint }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
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
  roleSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  roleButtonActive: {
    borderWidth: 1,
  },
  roleIcon: {
    marginRight: 6,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
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
}); 