import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import UserRoleFixer from '../../components/UserRoleFixer';

export default function AdminRolesPage() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: 'User Role Management',
        headerBackTitle: 'Admin'
      }} />
      
      <UserRoleFixer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 