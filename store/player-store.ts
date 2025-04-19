import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerState, Song } from '@/types/music';

interface PlayerStore extends PlayerState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setCurrentSong: (song: Song) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  updateCurrentTime: (time: number) => void;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentTime: 0,
  duration: 0,
  volume: 1,
  repeat: 'off',
  shuffle: false,
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      play: () => set({ isPlaying: true }),
      
      pause: () => set({ isPlaying: false }),
      
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      
      setCurrentSong: (song: Song) => {
        set({
          currentSong: song,
          isPlaying: true,
          currentTime: 0,
          duration: parseFloat(song.duration.split(':')[0]) * 60 + parseFloat(song.duration.split(':')[1])
        });
      },
      
      addToQueue: (song: Song) => {
        set((state) => ({
          queue: [...state.queue, song]
        }));
      },
      
      removeFromQueue: (songId: string) => {
        set((state) => ({
          queue: state.queue.filter((song) => song.id !== songId)
        }));
      },
      
      skipNext: () => {
        const { queue, currentSong, shuffle } = get();
        if (queue.length === 0) return;
        
        let nextIndex = 0;
        if (currentSong) {
          const currentIndex = queue.findIndex((song) => song.id === currentSong.id);
          if (shuffle) {
            // Get random song excluding current
            const availableIndices = Array.from({ length: queue.length }, (_, i) => i)
              .filter(i => i !== currentIndex);
            if (availableIndices.length > 0) {
              const randomIndex = Math.floor(Math.random() * availableIndices.length);
              nextIndex = availableIndices[randomIndex];
            }
          } else {
            nextIndex = (currentIndex + 1) % queue.length;
          }
        }
        
        set({
          currentSong: queue[nextIndex],
          currentTime: 0,
          isPlaying: true,
          duration: parseFloat(queue[nextIndex].duration.split(':')[0]) * 60 + 
                   parseFloat(queue[nextIndex].duration.split(':')[1])
        });
      },
      
      skipPrevious: () => {
        const { queue, currentSong, currentTime } = get();
        if (queue.length === 0 || !currentSong) return;
        
        // If current time is more than 3 seconds, restart the song
        if (currentTime > 3) {
          set({ currentTime: 0 });
          return;
        }
        
        const currentIndex = queue.findIndex((song) => song.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
        
        set({
          currentSong: queue[prevIndex],
          currentTime: 0,
          isPlaying: true,
          duration: parseFloat(queue[prevIndex].duration.split(':')[0]) * 60 + 
                   parseFloat(queue[prevIndex].duration.split(':')[1])
        });
      },
      
      seekTo: (time: number) => {
        set({ currentTime: time });
      },
      
      setVolume: (volume: number) => {
        set({ volume: Math.max(0, Math.min(1, volume)) });
      },
      
      toggleRepeat: () => {
        set((state) => {
          const modes: PlayerState['repeat'][] = ['off', 'all', 'one'];
          const currentIndex = modes.indexOf(state.repeat);
          const nextIndex = (currentIndex + 1) % modes.length;
          return { repeat: modes[nextIndex] };
        });
      },
      
      toggleShuffle: () => {
        set((state) => ({ shuffle: !state.shuffle }));
      },
      
      updateCurrentTime: (time: number) => {
        set({ currentTime: time });
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        volume: state.volume,
        repeat: state.repeat,
        shuffle: state.shuffle,
      }),
    }
  )
);