import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '../../context/AuthContext';

const isBrowser = typeof window !== 'undefined';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session, userProfile } = useAuth();

  useEffect(() => {
    if (!isBrowser) return;
    
    if (!session) {
      setTimeout(() => {
        router.replace('../(auth)/login');
      }, 0);
    }
  }, [session]);

  // Determine if the parent dashboard should be shown
  const isParent = userProfile?.role === 'parent';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {isParent ? (
        <Tabs.Screen
          name="parent-dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
      ) : (
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
      )}
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          title: 'Assignments',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
        }}
      />
      {isParent && (
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Resources',
            tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
          }}
        />
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
