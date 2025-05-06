import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export default function AuthLayout() {
  const { session } = useAuth();

  // If user is already authenticated, redirect to the tabs
  useEffect(() => {
    // Only redirect in browser environment
    if (!isBrowser) return;
    
    if (session) {
      setTimeout(() => {
        router.replace('../(tabs)');
      }, 0);
    }
  }, [session]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
} 