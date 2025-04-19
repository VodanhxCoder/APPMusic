import { Album, Artist, Playlist, Song } from "@/types/music";

export const artists: Artist[] = [
  {
    id: "1",
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
  },
  {
    id: "2",
    name: "Doja Cat",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000",
  },
  {
    id: "3",
    name: "Drake",
    image: "https://images.unsplash.com/photo-1522196772883-393d879eb14d?q=80&w=1000",
  },
  {
    id: "4",
    name: "Billie Eilish",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000",
  },
  {
    id: "5",
    name: "Kendrick Lamar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
  },
];

export const songs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: artists[0],
    duration: "3:20",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000",
    likes: 2340,
    isLiked: true,
  },
  {
    id: "2",
    title: "Say So",
    artist: artists[1],
    duration: "3:58",
    cover: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=1000",
    likes: 1890,
    isLiked: false,
  },
  {
    id: "3",
    title: "God's Plan",
    artist: artists[2],
    duration: "3:18",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000",
    likes: 3210,
    isLiked: true,
  },
  {
    id: "4",
    title: "Bad Guy",
    artist: artists[3],
    duration: "3:14",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=1000",
    likes: 2780,
    isLiked: false,
  },
  {
    id: "5",
    title: "HUMBLE.",
    artist: artists[4],
    duration: "2:57",
    cover: "https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=1000",
    likes: 2560,
    isLiked: true,
  },
  {
    id: "6",
    title: "Starboy",
    artist: artists[0],
    duration: "3:50",
    cover: "https://images.unsplash.com/photo-1614613535697-1d895a0c3f3d?q=80&w=1000",
    likes: 2100,
    isLiked: false,
  },
  {
    id: "7",
    title: "Streets",
    artist: artists[1],
    duration: "3:47",
    cover: "https://images.unsplash.com/photo-1598387994940-20975a17704d?q=80&w=1000",
    likes: 1750,
    isLiked: true,
  },
  {
    id: "8",
    title: "In My Feelings",
    artist: artists[2],
    duration: "3:37",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=1000",
    likes: 2890,
    isLiked: false,
  },
];

export const albums: Album[] = [
  {
    id: "1",
    title: "After Hours",
    artist: artists[0],
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000",
    songs: [songs[0], songs[5]],
    releaseYear: 2020,
  },
  {
    id: "2",
    title: "Hot Pink",
    artist: artists[1],
    cover: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=1000",
    songs: [songs[1], songs[6]],
    releaseYear: 2019,
  },
  {
    id: "3",
    title: "Scorpion",
    artist: artists[2],
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000",
    songs: [songs[2], songs[7]],
    releaseYear: 2018,
  },
  {
    id: "4",
    title: "When We All Fall Asleep, Where Do We Go?",
    artist: artists[3],
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=1000",
    songs: [songs[3]],
    releaseYear: 2019,
  },
  {
    id: "5",
    title: "DAMN.",
    artist: artists[4],
    cover: "https://images.unsplash.com/photo-1618609377864-68609b857e90?q=80&w=1000",
    songs: [songs[4]],
    releaseYear: 2017,
  },
];

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Today's Top Hits",
    description: "The most popular tracks right now",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    songs: [songs[0], songs[1], songs[2], songs[3]],
    curator: "Musica",
    followers: 12500000,
  },
  {
    id: "2",
    title: "Chill Vibes",
    description: "Relaxing beats to unwind",
    cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1000",
    songs: [songs[5], songs[6], songs[7]],
    curator: "Musica",
    followers: 8700000,
  },
  {
    id: "3",
    title: "Workout Energy",
    description: "Pump up your workout with these tracks",
    cover: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000",
    songs: [songs[2], songs[4], songs[0]],
    curator: "Musica",
    followers: 5300000,
  },
  {
    id: "4",
    title: "R&B Mix",
    description: "The best of R&B",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    songs: [songs[0], songs[5], songs[1], songs[6]],
    curator: "Musica",
    followers: 4200000,
  },
  {
    id: "5",
    title: "Hip Hop Essentials",
    description: "Essential tracks from hip hop's finest",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    songs: [songs[2], songs[4], songs[7]],
    curator: "Musica",
    followers: 7800000,
  },
];

export const featuredPlaylists = [playlists[0], playlists[2], playlists[4]];
export const newReleases = [albums[0], albums[1], albums[2]];
export const popularSongs = [songs[0], songs[2], songs[3], songs[4], songs[5]];