import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher' | 'parent' | 'admin'>('student');
  const { signIn, signInWithMicrosoft, loading: authLoading } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();
  
  const loading = localLoading || authLoading;

  // Handle error message from query params
  useEffect(() => {
    if (params.error) {
      Alert.alert('Error', params.error as string);
    }
  }, [params.error]);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }

    try {
      setLocalLoading(true);
      await signIn(email, password);
      
      // Admin users will be automatically redirected to the admin section
      // by the AuthContext once their role is determined
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred during sign in');
    } finally {
      setLocalLoading(false);
    }
  };
  
  const handleMicrosoftSignIn = async () => {
    try {
      setLocalLoading(true);
      // Pass the selected role as metadata for new users
      await signInWithMicrosoft(role);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred during Microsoft sign in');
    } finally {
      setLocalLoading(false);
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
        {loading && (
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
          editable={!loading}
        />
        
        <TextInput
          style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
          placeholder="Password"
          placeholderTextColor={colors.icon}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }]} 
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: colors.icon }]} />
          <Text style={[styles.dividerText, { color: colors.icon }]}>OR</Text>
          <View style={[styles.divider, { backgroundColor: colors.icon }]} />
        </View>
        
        <TouchableOpacity 
          style={[styles.microsoftButton, { borderColor: MICROSOFT_BLUE }]} 
          onPress={handleMicrosoftSignIn}
          disabled={loading}
        >
          <View style={styles.microsoftButtonContent}>
            {/* Microsoft Logo representation */}
            <View style={styles.microsoftLogoContainer}>
              <View style={[styles.microsoftLogoPart, { backgroundColor: '#f25022' }]} />
              <View style={[styles.microsoftLogoPart, { backgroundColor: '#7fba00' }]} />
              <View style={[styles.microsoftLogoPart, { backgroundColor: '#00a4ef' }]} />
              <View style={[styles.microsoftLogoPart, { backgroundColor: '#ffb900' }]} />
            </View>
            <Text style={[styles.microsoftButtonText, { color: MICROSOFT_BLUE }]}>
              Sign in with Microsoft
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.icon }]}>
          Don&apos;t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={navigateToRegister} disabled={loading}>
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 14,
  },
  microsoftButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  microsoftButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  microsoftLogoContainer: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 10,
  },
  microsoftLogoPart: {
    width: 9,
    height: 9,
    margin: 0.5,
  },
  microsoftButtonText: {
    fontSize: 16,
    fontWeight: '500',
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