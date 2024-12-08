import { useState } from "react";
import PlaylistAPI from "../api/modules/playlist.api"; // Adjust based on your API module
import { useDispatch, useSelector } from "react-redux";
import { setTracksInPlaylist } from "../redux/store"; // Redux action to set playlists
import {useNavigate} from "react-router-dom";

const usePlaylist = (token) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlists = useSelector((state) => state.playlist.playlists); // Assuming playlists are stored in Redux
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all playlists
  const fetchTracksInPlaylist = async (id) => {
    setLoading(true);
    try {
      const response = await PlaylistAPI.getTracksInPlaylist(id); // API call to get all tracks in playlist
      console.log("fetchTracksInPlaylist response", response);
      
      // Sort tracks by track_order before dispatching to Redux
      const sortedTracks = response.sort((a, b) => a.track_order - b.track_order);
      
      dispatch(setTracksInPlaylist(sortedTracks)); // Dispatch sorted tracks to Redux store
      setLoading(false);
    } catch (err) {
      setError("Error fetching tracks");
      setLoading(false);
    }
  };

  // Add song to playlist
  const addTrackToPlaylist = async (playlistId, songId) => {
    setLoading(true);
    const data = {
      track_id: songId,
      playlist_id: playlistId,
    }
    try {
      const response = await PlaylistAPI.addTrackToPlaylist(data, token);
      console.log(response);
      if (response.message === "Track added to playlist") {
        console.log(`Song ${songId} added to playlist ${playlistId}`);
       fetchTracksInPlaylist(playlistId); // Re-fetch the playlists after adding
        navigate(`/playlist/${playlistId}`); // Redirect to the playlist page
      }
      setLoading(false);

    } catch (err) {
      console.log(err);
      setError("Error adding song to playlist", err);
      setLoading(false);
    }
  };

  // Remove song from playlist
  const removeTrackFromPlaylist = async (playlistId, songId) => {
    setLoading(true);
    try {
      const response = await PlaylistAPI.deleteTrackFromPlaylist(playlistId,songId, token);
      console.log(response);
      if (response.message === "Track deleted from playlist") {
        console.log(`Song ${songId} removed from playlist ${playlistId}`);
        fetchTracksInPlaylist(playlistId);
      }
      setLoading(false);
    } catch (err) {
      setError("Error removing song from playlist");
      setLoading(false);
    }
  };



  return {
    playlists,
    loading,
    error,
    fetchTracksInPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  };
};

export default usePlaylist;
