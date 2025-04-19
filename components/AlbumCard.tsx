import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Album } from '@/types/music';
import Colors from '@/constants/colors';

interface AlbumCardProps {
  album: Album;
  size?: 'small' | 'medium' | 'large';
}

export default function AlbumCard({ album, size = 'medium' }: AlbumCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/album/${album.id}`);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, styles[`container${size}`]]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: album.cover }} 
        style={[styles.cover, styles[`cover${size}`]]} 
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{album.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{album.artist.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  containersmall: {
    width: 120,
  },
  containermedium: {
    width: 150,
  },
  containerlarge: {
    width: 180,
  },
  cover: {
    borderRadius: 16,
    marginBottom: 8,
  },
  coversmall: {
    width: 120,
    height: 120,
  },
  covermedium: {
    width: 150,
    height: 150,
  },
  coverlarge: {
    width: 180,
    height: 180,
  },
  content: {
    width: '100%',
  },
  title: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  artist: {
    color: Colors.dark.textTertiary,
    fontSize: 12,
  },
});