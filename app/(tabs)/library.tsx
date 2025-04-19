import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLibraryStore } from '@/store/library-store';
import SongItem from '@/components/SongItem';
import PlaylistCard from '@/components/PlaylistCard';
import AlbumCard from '@/components/AlbumCard';
import Colors from '@/constants/colors';

type LibraryTab = 'playlists' | 'songs' | 'albums' | 'recent';

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('playlists');
  const { likedSongs, likedAlbums, likedPlaylists, recentlyPlayed } = useLibraryStore();
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'playlists':
        return (
          <View style={styles.gridContainer}>
            {likedPlaylists.length > 0 ? (
              likedPlaylists.map((playlist) => (
                <View key={playlist.id} style={styles.gridItem}>
                  <PlaylistCard playlist={playlist} size="medium" />
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No saved playlists yet</Text>
                <Text style={styles.emptySubtext}>
                  Your liked playlists will appear here
                </Text>
              </View>
            )}
          </View>
        );
      
      case 'songs':
        return (
          <View style={styles.listContainer}>
            {likedSongs.length > 0 ? (
              likedSongs.map((song) => (
                <SongItem key={song.id} song={song} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No liked songs yet</Text>
                <Text style={styles.emptySubtext}>
                  Tap the heart icon on any song to save it to your library
                </Text>
              </View>
            )}
          </View>
        );
      
      case 'albums':
        return (
          <View style={styles.gridContainer}>
            {likedAlbums.length > 0 ? (
              likedAlbums.map((album) => (
                <View key={album.id} style={styles.gridItem}>
                  <AlbumCard album={album} size="medium" />
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No saved albums yet</Text>
                <Text style={styles.emptySubtext}>
                  Your liked albums will appear here
                </Text>
              </View>
            )}
          </View>
        );
      
      case 'recent':
        return (
          <View style={styles.listContainer}>
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed.map((song) => (
                <SongItem key={song.id} song={song} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No recently played songs</Text>
                <Text style={styles.emptySubtext}>
                  Songs you play will appear here
                </Text>
              </View>
            )}
          </View>
        );
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'playlists' && styles.activeTab]} 
            onPress={() => setActiveTab('playlists')}
          >
            <Text style={[styles.tabText, activeTab === 'playlists' && styles.activeTabText]}>
              Playlists
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'songs' && styles.activeTab]} 
            onPress={() => setActiveTab('songs')}
          >
            <Text style={[styles.tabText, activeTab === 'songs' && styles.activeTabText]}>
              Songs
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'albums' && styles.activeTab]} 
            onPress={() => setActiveTab('albums')}
          >
            <Text style={[styles.tabText, activeTab === 'albums' && styles.activeTabText]}>
              Albums
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'recent' && styles.activeTab]} 
            onPress={() => setActiveTab('recent')}
          >
            <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
              Recently Played
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardAlt,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.primary,
  },
  tabText: {
    color: Colors.dark.textTertiary,
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.dark.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  emptyText: {
    color: Colors.dark.textSecondary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: Colors.dark.textTertiary,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});