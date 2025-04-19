import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Heart, MoreVertical } from 'lucide-react-native';
import { albums } from '@/mocks/music-data';
import { Album } from '@/types/music';
import { usePlayerStore } from '@/store/player-store';
import { useLibraryStore } from '@/store/library-store';
import SongItem from '@/components/SongItem';
import Colors from '@/constants/colors';

export default function AlbumScreen() {
  const { id } = useLocalSearchParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const { setCurrentSong } = usePlayerStore();
  const { toggleLikeAlbum, isAlbumLiked } = useLibraryStore();
  
  useEffect(() => {
    const foundAlbum = albums.find((a) => a.id === id);
    if (foundAlbum) {
      setAlbum(foundAlbum);
    }
  }, [id]);
  
  if (!album) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading album...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const isLiked = isAlbumLiked(album.id);
  
  const playAll = () => {
    if (album.songs.length > 0) {
      // Set the first song as current and add all songs to queue
      setCurrentSong(album.songs[0]);
      
      // Add all songs to queue
      const store = usePlayerStore.getState();
      store.queue = [...album.songs];
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={album.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongItem song={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Image source={{ uri: album.cover }} style={styles.cover} />
            
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{album.title}</Text>
              <Text style={styles.artist}>{album.artist.name}</Text>
              <Text style={styles.stats}>
                {album.releaseYear} • {album.songs.length} songs
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
                  onPress={() => toggleLikeAlbum(album)}
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
    width: 180,
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  infoContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    fontSize: 16,
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