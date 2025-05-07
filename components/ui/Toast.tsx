import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onClose
}: ToastProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (visible) {
      // Show the toast with fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    // Hide the toast with fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  // Define toast styles based on type
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#4CD964',
          iconName: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
        };
      case 'error':
        return {
          backgroundColor: '#FF3B30',
          iconName: 'close-circle' as keyof typeof Ionicons.glyphMap,
        };
      case 'warning':
        return {
          backgroundColor: '#FF9500',
          iconName: 'warning' as keyof typeof Ionicons.glyphMap,
        };
      case 'info':
      default:
        return {
          backgroundColor: '#007AFF',
          iconName: 'information-circle' as keyof typeof Ionicons.glyphMap,
        };
    }
  };

  const toastStyles = getToastStyles();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, backgroundColor: toastStyles.backgroundColor },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={toastStyles.iconName} size={24} color="white" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={hideToast}>
        <Ionicons name="close" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  message: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  closeButton: {
    marginLeft: 8,
  },
}); 