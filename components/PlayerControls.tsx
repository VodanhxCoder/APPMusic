import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Repeat1, 
  Shuffle 
} from 'lucide-react-native';
import { usePlayerStore } from '@/store/player-store';
import Colors from '@/constants/colors';

export default function PlayerControls() {
  const { 
    isPlaying, 
    togglePlay, 
    skipNext, 
    skipPrevious, 
    repeat, 
    toggleRepeat, 
    shuffle, 
    toggleShuffle 
  } = usePlayerStore();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.sideButton} 
        onPress={toggleShuffle}
      >
        <Shuffle 
          size={20} 
          color={shuffle ? Colors.dark.primary : Colors.dark.textTertiary} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={skipPrevious}
      >
        <SkipBack size={24} color={Colors.dark.textSecondary} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={togglePlay}
      >
        {isPlaying ? (
          <Pause size={28} color={Colors.dark.background} />
        ) : (
          <Play 
            size={28} 
            color={Colors.dark.background} 
            fill={Colors.dark.background} 
          />
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={skipNext}
      >
        <SkipForward size={24} color={Colors.dark.textSecondary} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.sideButton} 
        onPress={toggleRepeat}
      >
        {repeat === 'one' ? (
          <Repeat1 size={20} color={Colors.dark.primary} />
        ) : (
          <Repeat 
            size={20} 
            color={repeat === 'all' ? Colors.dark.primary : Colors.dark.textTertiary} 
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  sideButton: {
    padding: 8,
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});