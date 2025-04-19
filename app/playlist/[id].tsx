import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Heart, MoreVertical } from 'lucide-react-native';
import { playlists } from '@/mocks/music-data';
import { Playlist } from '@/types/music';
import { usePlayerStore } from '@/store/player-store';
import { useLibraryStore } from '@/store/library-store';
import SongItem from '@/components/SongItem';
import Colors from '@/constants/colors';

export default function PlaylistScreen() {
  const { id } = useLocalSearchParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const { setCurrentSong } = usePlayerStore();
  const { toggleLikePlaylist, isPlaylistLiked } = useLibraryStore();
  
  useEffect(() => {
    const foundPlaylist = playlists.find((p) => p.id === id);
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
    }
  }, [id]);
  
  if (!playlist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading playlist...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const isLiked = isPlaylistLiked(playlist.id);
  
  const playAll = () => {
    if (playlist.songs.length > 0) {
      // Set the first song as current and add all songs to queue
      setCurrentSong(playlist.songs[0]);
      
      // Add all songs to queue
      const store = usePlayerStore.getState();
      store.queue = [...playlist.songs];
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongItem song={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Image source={{ uri: playlist.cover }} style={styles.cover} />
            
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{playlist.title}</Text>
              {playlist.description && (
                <Text style={styles.description}>{playlist.description}</Text>
              )}
              <Text style={styles.stats}>
                {playlist.songs.length} songs • {playlist.followers?.toLocaleString()} followers
              </Text>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity 
                  style={styles.playButton} 
                  onPress={playAll}
                >
                  <Play size={20} color={Colors.dark.background} fill={Colors.dark.background} />
                  <Text style={styles.playButtonText}>Play All</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => toggleLikePlaylist(playlist)}
                >
                  <Heart 
                    size={24} 
                    color={isLiked ? Colors.dark.primary : Colors.dark.textTertiary} 
                    fill={isLiked ? Colors.dark.primary : 'transparent'} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <MoreVertical size={24} color={Colors.dark.textTertiary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.songsTitle}>Songs</Text>
          </View>
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.dark.textTertiary,
    fontSize: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.textTertiary,
    marginBottom: 8,
  },
  stats: {
    fontSize: 12,
    color: Colors.dark.textTertiary,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 16,
  },
  playButtonText: {
    color: Colors.dark.background,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginRight: 8,
  },
  songsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 16,
  },
});