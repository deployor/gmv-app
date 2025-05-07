import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function AuthCallback() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const params = useLocalSearchParams();

  useEffect(() => {
    async function handleOAuthCallback() {
      try {
        // For web, the session is automatically set by Supabase Auth
        if (typeof window !== 'undefined') {
          const { error } = await supabase.auth.getSession();
          if (error) throw error;
        } 
        // For native platforms, we should handle the URL params
        else {
          // Processing OAuth redirect on native platforms
          if (params.access_token && params.refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token: params.access_token as string,
              refresh_token: params.refresh_token as string,
            });
            if (error) throw error;
          }
        }

        // Navigate to the home screen
        router.replace('/(tabs)');
      } catch (error) {
        console.error('Error processing OAuth redirect:', error);
        router.replace('/(auth)/login?error=Authentication failed');
      }
    }

    handleOAuthCallback();
  }, [params]);

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