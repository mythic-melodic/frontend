// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null, // Add role to the state
        user_id: localStorage.getItem('user_id') || null,
        queueSongs: [],
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            state.role = null; // Clear role when token is cleared
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem('role', action.payload); // Persist role in localStorage
        },
        setUserID: (state, action) => {
            state.user_id = action.payload;
            localStorage.setItem('user_id', action.payload);
        },
        addTrackToQueue: (state, action) => {
            if (action.payload && action.payload.id) {
                state.queueSongs.push(action.payload.id);
            } else {
                console.error("Invalid payload for addTrackToQueue:", action.payload);
            }
        },
       
        clearQueue: (state) => {
            state.queueSongs = [];
        },
    },
});

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        listFavorites: [],
    },
    reducers: {
        setListFavorites: (state, action) => {
            state.listFavorites = action.payload;
        },
        removeFavorite: (state, action) => {
            const track_id = action.payload;
            if (!track_id) return; // Bỏ qua nếu track_id không hợp lệ
            state.listFavorites = state.listFavorites.filter(e => e.track_id !== track_id);
        },
        addFavorite: (state, action) => {
            state.listFavorites = [...state.listFavorites, { track_id: action.payload }];
        },
    },
});
const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlists: [],
        tracksInPlaylist: [],
        playlistInfo: {},
    },
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        addPlaylist: (state, action) => {
            state.playlists = [...state.playlists, action.payload];
        },
        removePlaylist: (state, action) => {
            const playlist_id = action.payload;
            if (!playlist_id) return;
            state.playlists = state.playlists.filter(e => e.id !== playlist_id);
        },
        setTracksInPlaylist: (state, action) => {
            state.tracksInPlaylist = action.payload;
        },
        setPlaylistInfo: (state, action) => {
            state.playlistInfo = action.payload;
        },
        
    },
});
export const { setListFavorites, removeFavorite, addFavorite } = favoriteSlice.actions;

export const { setToken, clearToken, setRole, setUserID, addTrackToQueue,clearQueue } = authSlice.actions;

export const { setPlaylists, addPlaylist, removePlaylist, setTracksInPlaylist, setPlaylistInfo } = playlistSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        favorite: favoriteSlice.reducer,
        playlist: playlistSlice.reducer,
    },
});

export default store;
