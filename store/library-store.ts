import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Album, Playlist, Song } from '@/types/music';
interface LibraryState {
  likedSongs: Song[];
  likedAlbums: Album[];
  likedPlaylists: Playlist[];
  recentlyPlayed: Song[];
}

interface LibraryStore extends LibraryState {
  toggleLikeSong: (song: Song) => void;
  toggleLikeAlbum: (album: Album) => void;
  toggleLikePlaylist: (playlist: Playlist) => void;
  addToRecentlyPlayed: (song: Song) => void;
  isSongLiked: (songId: string) => boolean;
  isAlbumLiked: (albumId: string) => boolean;
  isPlaylistLiked: (playlistId: string) => boolean;
}

const initialState: LibraryState = {
  likedSongs: [],
  likedAlbums: [],
  likedPlaylists: [],
  recentlyPlayed: [],
};

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      toggleLikeSong: (song: Song) => {
        set((state) => {
          const isLiked = state.likedSongs.some((s) => s.id === song.id);
          return {
            likedSongs: isLiked
              ? state.likedSongs.filter((s) => s.id !== song.id)
              : [...state.likedSongs, song],
          };
        });
      },
      
      toggleLikeAlbum: (album: Album) => {
        set((state) => {
          const isLiked = state.likedAlbums.some((a) => a.id === album.id);
          return {
            likedAlbums: isLiked
              ? state.likedAlbums.filter((a) => a.id !== album.id)
              : [...state.likedAlbums, album],
          };
        });
      },
      
      toggleLikePlaylist: (playlist: Playlist) => {
        set((state) => {
          const isLiked = state.likedPlaylists.some((p) => p.id === playlist.id);
          return {
            likedPlaylists: isLiked
              ? state.likedPlaylists.filter((p) => p.id !== playlist.id)
              : [...state.likedPlaylists, playlist],
          };
        });
      },
      
      addToRecentlyPlayed: (song: Song) => {
        set((state) => {
          // Remove the song if it already exists in the list
          const filteredRecent = state.recentlyPlayed.filter((s) => s.id !== song.id);
          // Add the song to the beginning of the list
          const newRecentlyPlayed = [song, ...filteredRecent].slice(0, 20); // Keep only the 20 most recent
          return { recentlyPlayed: newRecentlyPlayed };
        });
      },
      
      isSongLiked: (songId: string) => {
        return get().likedSongs.some((s) => s.id === songId);
      },
      
      isAlbumLiked: (albumId: string) => {
        return get().likedAlbums.some((a) => a.id === albumId);
      },
      
      isPlaylistLiked: (playlistId: string) => {
        return get().likedPlaylists.some((p) => p.id === playlistId);
      },
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);