import { Href, router, Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { user, loading, isSignedIn } = useAuth();

  // Redirect away from auth pages if user is already authenticated and profile loaded
  useEffect(() => {
    // Wait for loading to be false
    if (!loading) {
      // Log status to help debug
      console.log('AuthLayout: Auth state -', { isSignedIn, hasUser: !!user, loading });
      
      if (isSignedIn && user) {
        console.log('AuthLayout: Signed in user detected in auth layout, redirecting to appropriate dashboard');
        
        // Determine redirect based on role
        let redirectPath: Href = '/(tabs)' as Href; // Default for students
        
        if (user.role === 'admin') redirectPath = '/(admin)/dashboard' as Href;
        else if (user.role === 'parent') redirectPath = '/(parent)/dashboard' as Href;
        else if (user.role === 'teacher') redirectPath = '/(teacher)/dashboard' as Href;
        
        router.replace(redirectPath);
      } else if (isSignedIn && !user) {
        // Clerk is signed in, but our user profile is not yet loaded/available.
        console.log('AuthLayout: Signed in, waiting for user profile to determine redirect...');
        // No need to redirect - the root layout will handle this case with its retry mechanism
      }
      // If not signedIn, Slot will render the auth screens (login, signup)
    }
  }, [isSignedIn, user, loading]);

  // If loading (either Clerk or our profile), render a loader
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading authentication...</Text>
      </View>
    );
  }
  
  // If signed in but no profile yet, show a message
  if (isSignedIn && !user && !loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Creating your profile...</Text>
        <Text style={styles.subText}>This may take a moment</Text>
      </View>
    );
  }

  // If not loading, and not signedIn (or signedIn but no profile yet, though root handles this loading state)
  // allow rendering auth screens (login, signup, etc.)
  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  subText: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
  },
}); 