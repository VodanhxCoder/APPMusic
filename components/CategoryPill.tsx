import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface CategoryPillProps {
  title: string;
  isActive?: boolean;
  onPress: () => void;
}

export default function CategoryPill({ title, isActive = false, onPress }: CategoryPillProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isActive && styles.activeContainer]} 
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark.cardAlt,
    marginRight: 10,
  },
  activeContainer: {
    backgroundColor: Colors.dark.primary,
  },
  text: {
    color: Colors.dark.textTertiary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
});