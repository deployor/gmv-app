import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Href, Slot, SplashScreen, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { user, loading, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
      if (!isSignedIn) {
        router.replace('/(auth)/login' as Href);
      } else if (user) {
        // User is authenticated and profile is loaded, proceed with role-based navigation
        console.log('RootNavigator: User authenticated and profile loaded. Role:', user.role);
        switch (user.role) {
          case 'admin':
            router.replace('/(admin)/dashboard' as Href);
            break;
          case 'parent':
            router.replace('/(parent)/dashboard' as Href);
            break;
          case 'teacher':
            router.replace('/(teacher)/dashboard' as Href);
            break;
          case 'student':
          default:
            router.replace('/(tabs)' as Href);
            break;
        }
      } else if (isSignedIn && !user && !loading) {
        // This case means Clerk authentication was successful, but the application-specific user profile
        // from your database is null after the loading phase.
        // This could indicate an issue with fetching or creating the profile in AuthContext.
        // The application might be in an inconsistent state.
        console.warn(
          'RootNavigator Critical State: User is signed in with Clerk, but no local user profile could be loaded or created. ',
          'The app might not function correctly. Consider redirecting to an error page or forcing a sign-out if a profile is mandatory.'
        );
        // Depending on app requirements, you might want to:
        // router.replace('/(auth)/profile-error' as Href); // Example: Redirect to a profile error page
        // or attempt to sign the user out via useAuth().signOut();
        // For now, it will remain on the current screen or the Slot's default rendering.
      }
    }
  }, [isSignedIn, user, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text} />
        <Text style={{ color: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }}>Authenticating...</Text>
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
});
