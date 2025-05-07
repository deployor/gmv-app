import { Href, router, Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { user, loading, isSignedIn } = useAuth();

  // Redirect away from auth pages if user is already authenticated and profile loaded
  useEffect(() => {
    // Wait for loading to be false
    if (!loading) {
      if (isSignedIn && user) {
        // Determine redirect based on role
        let redirectPath: Href = '/(tabs)' as Href; // Default for students
        
        if (user.role === 'admin') redirectPath = '/(admin)/dashboard' as Href;
        else if (user.role === 'parent') redirectPath = '/(parent)/dashboard' as Href;
        else if (user.role === 'teacher') redirectPath = '/(teacher)/dashboard' as Href;
        
        router.replace(redirectPath);
      } else if (isSignedIn && !user) {
        // Clerk is signed in, but our user profile is not yet loaded/available.
        // The root layout is likely handling the main loading spinner.
        // This layout should probably wait or show minimal UI if needed.
        // For now, returning null is consistent if RootNavigator is showing a spinner.
        console.log('AuthLayout: Signed in, waiting for user profile to determine redirect...');
      }
      // If not signedIn, Slot will render the auth screens (login, signup)
    }
  }, [isSignedIn, user, loading]);

  // If loading (either Clerk or our profile), render nothing - the root layout will show a loader
  if (loading) return null;

  // If not loading, and not signedIn (or signedIn but no profile yet, though root handles this loading state)
  // allow rendering auth screens (login, signup, etc.)
  return <Slot />;
} 