import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AuthCallback() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();
  const { isSignedIn, user } = useAuth();

  useEffect(() => {
    async function handleOAuthCallback() {
      try {
        // Clerk handles the OAuth callback automatically
        // We just need to check if the user is signed in and redirect accordingly
        if (isSignedIn) {
          // Choose the appropriate redirect based on user role
          if (user) {
            switch (user.role) {
              case 'admin':
                router.replace('/(admin)/dashboard');
                break;
              case 'teacher':
                router.replace('/(teacher)/dashboard');
                break;
              case 'parent':
                router.replace('/(parent)/dashboard');
                break;
              default:
                router.replace('/(tabs)');
                break;
            }
          } else {
            // Default to tabs if user data is not available yet
            router.replace('/(tabs)');
          }
        } else {
          // If not signed in, redirect to login page
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Error processing OAuth redirect:', error);
        router.replace('/(auth)/login?error=Authentication failed');
      }
    }

    handleOAuthCallback();
  }, [isSignedIn, user]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.tint} />
      <Text style={[styles.text, { color: colors.text }]}>
        Finalizing login...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
}); 