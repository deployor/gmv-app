import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.replace('/(tabs)');
    }
  }, [user]);

  // Show loading or access denied while checking authentication
  if (!user || user.role !== 'admin') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.centerContent}>
          {!user ? (
            <Text style={[styles.message, { color: colors.text }]}>Loading...</Text>
          ) : (
            <Text style={[styles.message, { color: colors.text }]}>
              Access Denied: Admin privileges required
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={24} name="chart.pie.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={24} name="person.2.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={24} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="parents"
        options={{
          title: 'Parents',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={24} name="person.3.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={24} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
}); 