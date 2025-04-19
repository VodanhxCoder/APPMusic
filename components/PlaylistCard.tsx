import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Playlist } from '@/types/music';
import Colors from '@/constants/colors';

interface PlaylistCardProps {
  playlist: Playlist;
  size?: 'small' | 'medium' | 'large';
}

export default function PlaylistCard({ playlist, size = 'medium' }: PlaylistCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/playlist/${playlist.id}`);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, styles[`container${size}`]]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: playlist.cover }} 
        style={[styles.cover, styles[`cover${size}`]]} 
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{playlist.title}</Text>
        {size !== 'small' && playlist.description && (
          <Text style={styles.description} numberOfLines={1}>
            {playlist.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 16,
  },
  containersmall: {
    width: 150,
    height: 150,
  },
  containermedium: {
    width: 180,
    height: 180,
  },
  containerlarge: {
    width: 220,
    height: 220,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  coversmall: {},
  covermedium: {},
  coverlarge: {},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: Colors.dark.textTertiary,
    fontSize: 12,
  },
});