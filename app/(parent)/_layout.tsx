import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ParentLayout() {
  const { user, loading } = useAuth();

  // Protect parent routes
  useEffect(() => {
    if (!loading && user && user.role !== 'parent') {
      console.log('Non-parent tried to access parent routes, redirecting');
      // Redirect non-parents out of this route
      if (user.role === 'admin') {
        router.replace('/(admin)/dashboard');
      } else if (user.role === 'teacher') {
        router.replace('/(teacher)/dashboard');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [user, loading]);

  // Don't render anything until we have checked the user's role
  if (loading) return null;

  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
} 