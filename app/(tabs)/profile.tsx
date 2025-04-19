import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, Music, Clock, Heart, User as UserIcon } from 'lucide-react-native';
import { useLibraryStore } from '@/store/library-store';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const { likedSongs, likedPlaylists, likedAlbums, recentlyPlayed } = useLibraryStore();
  
  const profileStats = [
    {
      title: 'Liked Songs',
      count: likedSongs.length,
      icon: <Heart size={20} color={Colors.dark.primary} />,
    },
    {
      title: 'Playlists',
      count: likedPlaylists.length,
      icon: <Music size={20} color={Colors.dark.primary} />,
    },
    {
      title: 'Albums',
      count: likedAlbums.length,
      icon: <Music size={20} color={Colors.dark.primary} />,
    },
    {
      title: 'Recently Played',
      count: recentlyPlayed.length,
      icon: <Clock size={20} color={Colors.dark.primary} />,
    },
  ];
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000' }} 
              style={styles.profileImage} 
            />
            <View style={styles.editButton}>
              <UserIcon size={16} color={Colors.dark.background} />
            </View>
          </View>
          
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={styles.statIconContainer}>
                {stat.icon}
              </View>
              <Text style={styles.statCount}>{stat.count}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color={Colors.dark.textSecondary} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <LogOut size={20} color={Colors.dark.textSecondary} />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Musica v1.0.0</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.dark.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.dark.textTertiary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  statItem: {
    width: '48%',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(250, 205, 102, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.textSecondary,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: Colors.dark.textTertiary,
  },
  menuContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.cardAlt,
  },
  menuText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 12,
    color: Colors.dark.textTertiary,
  },
});