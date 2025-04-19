import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { featuredPlaylists, newReleases, popularSongs } from '@/mocks/music-data';
import PlaylistCard from '@/components/PlaylistCard';
import AlbumCard from '@/components/AlbumCard';
import SongItem from '@/components/SongItem';
import CategoryPill from '@/components/CategoryPill';
import Colors from '@/constants/colors';

const categories = ['All', 'Pop', 'Hip Hop', 'R&B', 'Rock', 'Electronic', 'Jazz'];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryPill
              key={category}
              title={category}
              isActive={activeCategory === category}
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>
        
        {/* Featured Playlists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Playlists</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {featuredPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} size="large" />
            ))}
          </ScrollView>
        </View>
        
        {/* New Releases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {newReleases.map((album) => (
              <AlbumCard key={album.id} album={album} size="medium" />
            ))}
          </ScrollView>
        </View>
        
        {/* Popular Songs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Songs</Text>
          <View style={styles.songsList}>
            {popularSongs.map((song) => (
              <SongItem key={song.id} song={song} />
            ))}
          </View>
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
  categoriesContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  songsList: {
    paddingHorizontal: 16,
  },
});