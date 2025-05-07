import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function TeacherLayout() {
  const { user, loading } = useAuth();

  // Protect teacher routes
  useEffect(() => {
    if (!loading && user && user.role !== 'teacher') {
      console.log('Non-teacher tried to access teacher routes, redirecting');
      // Redirect non-teachers out of this route
      if (user.role === 'admin') {
        router.replace('/(admin)/dashboard');
      } else if (user.role === 'parent') {
        router.replace('/(parent)/dashboard');
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