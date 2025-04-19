export interface Artist {
    id: string;
    name: string;
    image?: string;
  }
  
  export interface Song {
    id: string;
    title: string;
    artist: Artist;
    duration: string; // Format: "3:45"
    cover: string;
    audio?: string; // URL to audio file
    likes?: number;
    isLiked?: boolean;
  }
  
  export interface Album {
    id: string;
    title: string;
    artist: Artist;
    cover: string;
    songs: Song[];
    releaseYear?: number;
  }
  
  export interface Playlist {
    id: string;
    title: string;
    description?: string;
    cover: string;
    songs: Song[];
    curator?: string;
    followers?: number;
  }
  
  export interface PlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentTime: number;
    duration: number;
    volume: number;
    repeat: 'off' | 'all' | 'one';
    shuffle: boolean;
  }