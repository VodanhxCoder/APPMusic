import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Play, Pause, SkipForward } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import Colors from '@/constants/colors';

export default function MiniPlayer() {
  const router = useRouter();
  const { currentSong, isPlaying, togglePlay } = usePlayerStore();
  
  if (!currentSong) return null;
  
  return (
    <Pressable 
      style={styles.container}
      onPress={() => router.push('/player')}
    >
      <View style={styles.songInfo}>
        <Image source={{ uri: currentSong.cover }} style={styles.cover} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentSong.artist.name}</Text>
        </View>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {isPlaying ? (
            <Pause size={20} color={Colors.dark.background} />
          ) : (
            <Play size={20} color={Colors.dark.background} fill={Colors.dark.background} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={(e) => {
            e.stopPropagation();
            usePlayerStore.getState().skipNext();
          }}
        >
          <SkipForward size={20} color={Colors.dark.textSecondary} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70, // Above tab bar
    left: 0,
    right: 0,
    backgroundColor: Colors.dark.cardAlt,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: Colors.dark.textTertiary,
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  skipButton: {
    padding: 4,
  },
});