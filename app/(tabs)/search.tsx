import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList ,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { songs, albums, artists } from '@/mocks/music-data';
import SearchBar from '@/components/SearchBar';
import SongItem from '@/components/SongItem';
import AlbumCard from '@/components/AlbumCard';
import Colors from '@/constants/colors';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
      setFilteredAlbums(albums);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    const matchedSongs = songs.filter(
      (song) => 
        song.title.toLowerCase().includes(query) || 
        song.artist.name.toLowerCase().includes(query)
    );
    
    const matchedAlbums = albums.filter(
      (album) => 
        album.title.toLowerCase().includes(query) || 
        album.artist.name.toLowerCase().includes(query)
    );
    
    setFilteredSongs(matchedSongs);
    setFilteredAlbums(matchedAlbums);
  }, [searchQuery]);
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
        
        {searchQuery.trim() === '' ? (
          <View style={styles.initialContent}>
            <Text style={styles.sectionTitle}>Browse All</Text>
            <FlatList
              data={albums}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <View style={styles.albumCardContainer}>
                  <AlbumCard album={item} size="medium" />
                </View>
              )}
              contentContainerStyle={styles.albumsGrid}
            />
          </View>
        ) : (
          <FlatList
            data={filteredSongs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SongItem song={item} />}
            ListHeaderComponent={() => (
              <>
                {filteredAlbums.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Albums</Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.horizontalList}
                    >
                      {filteredAlbums.map((album) => (
                        <AlbumCard key={album.id} album={album} size="small" />
                      ))}
                    </ScrollView>
                  </View>
                )}
                {filteredSongs.length > 0 && (
                  <Text style={styles.sectionTitle}>Songs</Text>
                )}
              </>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
              </View>
            )}
            contentContainerStyle={styles.songsList}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  initialContent: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 16,
  },
  horizontalList: {
    paddingBottom: 8,
  },
  songsList: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: Colors.dark.textTertiary,
    fontSize: 16,
    textAlign: 'center',
  },
  albumsGrid: {
    paddingBottom: 16,
  },
  albumCardContainer: {
    width: '50%',
    paddingBottom: 16,
  },
});