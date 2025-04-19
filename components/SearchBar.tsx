import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  onClear,
  placeholder = 'Search for songs, artists...'
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.dark.textTertiary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark.textTertiary}
        selectionColor={Colors.dark.primary}
      />
      {value.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
        >
          <X size={18} color={Colors.dark.textTertiary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.dark.textSecondary,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
});