import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Href, Slot, SplashScreen, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { user, loading, isSignedIn, refreshUserProfile } = useAuth();
  const colorScheme = useColorScheme();
  const [profileRetryCount, setProfileRetryCount] = useState(0);
  const [showProfileError, setShowProfileError] = useState(false);
  
  // Handle missing profile retry
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    // If signed in but no profile, try to refresh after a delay
    if (isSignedIn && !user && !loading && profileRetryCount < 3) {
      console.log(`Attempting to refresh user profile (attempt ${profileRetryCount + 1}/3)...`);
      
      timeoutId = setTimeout(() => {
        refreshUserProfile();
        setProfileRetryCount(prev => prev + 1);
      }, 2000); // Wait 2 seconds between retries
    }
    
    // Show error UI after 3 failed attempts
    if (profileRetryCount >= 3 && isSignedIn && !user && !loading) {
      setShowProfileError(true);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSignedIn, user, loading, profileRetryCount, refreshUserProfile]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
      
      console.log('Auth state:', { isSignedIn, userExists: !!user, loading, profileRetryCount });
      
      if (isSignedIn && user) {
        // User is authenticated and profile is loaded, proceed with role-based navigation
        console.log('RootNavigator: User authenticated and profile loaded. Role:', user.role);
        setProfileRetryCount(0); // Reset retry count
        setShowProfileError(false); // Hide error UI
        
        let targetRoute: Href;
        switch (user.role) {
          case 'admin':
            targetRoute = '/(admin)/dashboard' as Href;
            break;
          case 'parent':
            targetRoute = '/(parent)/dashboard' as Href;
            break;
          case 'teacher':
            targetRoute = '/(teacher)/dashboard' as Href;
            break;
          case 'student':
          default:
            targetRoute = '/(tabs)' as Href;
            break;
        }
        
        // Just navigate to the target route directly
        router.replace(targetRoute);
      } else if (!isSignedIn) {
        // User not signed in, go to login
        router.replace('/(auth)/login' as Href);
      }
      // The isSignedIn && !user case is handled by the retry mechanism
    }
  }, [isSignedIn, user, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text} />
        <Text style={{ color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text, marginTop: 12 }}>Authenticating...</Text>
      </View>
    );
  }
  
  // Show error UI if we failed to create/load the profile after multiple attempts
  if (showProfileError && isSignedIn && !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text, fontSize: 18, marginBottom: 16 }}>
          Couldn't load your profile
        </Text>
        <Text style={{ color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text, marginBottom: 24, textAlign: 'center' }}>
          You're signed in, but we couldn't find or create your profile. This might happen if your account was just created.
        </Text>
        <Button 
          title="Try Again" 
          onPress={() => {
            setProfileRetryCount(0);
            setShowProfileError(false);
            refreshUserProfile();
          }} 
        />
      </View>
    );
  }

  // Slot will render the current matched route (e.g., login screen, or the target dashboard after redirect)
  return <Slot />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !error) {
      // Fonts are loaded, auth will handle SplashScreen hide after its checks
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Return null or a basic loader while fonts are loading, SplashScreen is visible
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
