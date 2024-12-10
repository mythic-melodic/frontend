import React, { useState, useEffect } from "react";
import PlaylistHeader from "../components/Media/Header";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import TrackList from "../components/Media/TrackList";
import PlaylistAPI from "../api/modules/playlist.api";
import { useSelector } from "react-redux";
import TrackAPI from "../api/modules/track.api";
import { PlaylistProvider } from "../../src/hooks/PlaylistContext"; // Import the context provider
import usePlaylist from "../hooks/usePlaylist";
import { setPlaylistInfo } from '../redux/store';
import { useDispatch } from 'react-redux';


const Playlist = () => {
//  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const playlist = useSelector((state) => state.playlist.playlistInfo);  // Lấy thông tin playlist từ Redux
  console.log("playlist", playlist);
  const tracksInPlaylist = useSelector(
    (state) => state.playlist.tracksInPlaylist
  );
  const { id } = useParams();
  const { fetchTracksInPlaylist } = usePlaylist(token);
  const dispatch = useDispatch();

  useEffect(() => {
      const fetchPlaylist = async () => {
        try {
          const response = await PlaylistAPI.getPlaylistById(id, token);
          if (response && response.id) {
            const year = new Date(response.date_created).getFullYear();
            // Lưu thông tin playlist vào Redux
            dispatch(setPlaylistInfo({
              id: response.id,
              title: response.name,
              cover: response.cover,
              description: response.description,
              year: year,
              creatorId: response.creator_id,
            }));
          } else {
            console.error("Invalid playlist data:", response);
          }
        } catch (error) {
          console.error("Error fetching playlist:", error);
        }
      };
      fetchPlaylist();
    fetchTracksInPlaylist(id)
  }, [id, token]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
       //await fetchTracksInPlaylist(); // Cập nhật tracksInPlaylist từ Redux
        const tracks = await Promise.all(
          tracksInPlaylist.map(async (track, index) => {
            try {
              const trackDetails = await TrackAPI.getTrackById(track.track_id);
              return {
                ...trackDetails,
                track_order: track.track_order ?? index + 1,
              };
            } catch (error) {
              console.error(`Failed to fetch track with ID: ${track.track_id}`, error);
              return null;
            }
          })
        );

        setSongs(tracks.filter((track) => track !== null));
      } catch (error) {
        console.error("Error fetching songs or tracks:", error);
      }
    };
    fetchSongs();
  }, [tracksInPlaylist]);

  return (
    <PlaylistProvider creatorId={playlist.creatorId} playlistId={id}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: 5,
          bgcolor: "black",
          color: "text.primary",
        }}
      >
        <Stack spacing={5} sx={{ maxWidth: 1200, width: "100%" }}>
          <PlaylistHeader media={playlist} mediaType="playlist" />
          <TrackList songs={songs} type="playlist" />
        </Stack>
      </Box>
    </PlaylistProvider>
  );
};

export default Playlist;
