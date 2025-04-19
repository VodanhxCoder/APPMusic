import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heart, MoreVertical, Play } from 'lucide-react-native';
import { Song } from '@/types/music';
import { usePlayerStore } from '@/store/player-store';
import { useLibraryStore } from '@/store/library-store';
import Colors from '@/constants/colors';

interface SongItemProps {
  song: Song;
  showCover?: boolean;
  onOptionsPress?: () => void;
}

export default function SongItem({ song, showCover = true, onOptionsPress }: SongItemProps) {
  const { setCurrentSong, currentSong, isPlaying, togglePlay } = usePlayerStore();
  const { toggleLikeSong, isSongLiked } = useLibraryStore();
  
  const isActive = currentSong?.id === song.id;
  const isLiked = isSongLiked(song.id);
  
  const handlePlay = () => {
    if (isActive) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };
  
  return (
    <View style={styles.container}>
      {showCover && (
        <Image source={{ uri: song.cover }} style={styles.cover} />
      )}
      
      <View style={styles.info}>
        <Text style={[styles.title, isActive && styles.activeText]} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist.name}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => toggleLikeSong(song)}
        >
          <Heart 
            size={18} 
            color={isLiked ? Colors.dark.primary : Colors.dark.textTertiary} 
            fill={isLiked ? Colors.dark.primary : 'transparent'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Play 
            size={16} 
            color={Colors.dark.background} 
            fill={Colors.dark.background} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onOptionsPress}
        >
          <MoreVertical size={18} color={Colors.dark.textTertiary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 10,
    marginBottom: 8,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeText: {
    color: Colors.dark.primary,
  },
  artist: {
    color: Colors.dark.textTertiary,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});