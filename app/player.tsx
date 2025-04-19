import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Share2, MoreVertical } from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import { useLibraryStore } from '@/store/library-store';
import PlayerControls from '@/components/PlayerControls';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';

export default function PlayerScreen() {
  const { currentSong, isPlaying } = usePlayerStore();
  const { toggleLikeSong, isSongLiked, addToRecentlyPlayed } = useLibraryStore();
  
  useEffect(() => {
    if (currentSong) {
      addToRecentlyPlayed(currentSong);
    }
  }, [currentSong]);
  
  if (!currentSong) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No song is currently playing</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const isLiked = isSongLiked(currentSong.id);
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.coverContainer}>
          <Image source={{ uri: currentSong.cover }} style={styles.cover} />
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentSong.title}</Text>
            <Text style={styles.artist}>{currentSong.artist.name}</Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => toggleLikeSong(currentSong)}
            >
              <Heart 
                size={24} 
                color={isLiked ? Colors.dark.primary : Colors.dark.textTertiary} 
                fill={isLiked ? Colors.dark.primary : 'transparent'} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={24} color={Colors.dark.textTertiary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MoreVertical size={24} color={Colors.dark.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <ProgressBar />
        
        <PlayerControls />
        
        <View style={styles.upNextContainer}>
          <Text style={styles.upNextTitle}>Up Next</Text>
          {usePlayerStore.getState().queue.length > 0 ? (
            usePlayerStore.getState().queue.slice(0, 3).map((song) => (
              <View key={song.id} style={styles.upNextItem}>
                <Image source={{ uri: song.cover }} style={styles.upNextCover} />
                <View style={styles.upNextInfo}>
                  <Text style={styles.upNextSongTitle}>{song.title}</Text>
                  <Text style={styles.upNextArtist}>{song.artist.name}</Text>
                </View>
                <Text style={styles.upNextDuration}>{song.duration}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyQueueText}>No songs in queue</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  coverContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  cover: {
    width: 280,
    height: 280,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 4,
  },
  artist: {
    fontSize: 16,
    color: Colors.dark.textTertiary,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  upNextContainer: {
    marginTop: 32,
  },
  upNextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 16,
  },
  upNextItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardAlt,
  },
  upNextCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  upNextInfo: {
    flex: 1,
  },
  upNextSongTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },
  upNextArtist: {
    fontSize: 12,
    color: Colors.dark.textTertiary,
  },
  upNextDuration: {
    fontSize: 12,
    color: Colors.dark.textTertiary,
  },
  emptyQueueText: {
    color: Colors.dark.textTertiary,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: Colors.dark.textTertiary,
    fontSize: 16,
  },
});