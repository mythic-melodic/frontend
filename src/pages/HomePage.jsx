import React, { useEffect, useState } from "react";
import AlbumSlider from "../components/common/Slider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "../components/common/Container";
import PlaylistCard from "../components/common/PlaylistCard";
import TrackSlider from "../components/HomePage/TrackSlider";

import playlistAPI from "../api/modules/playlist.api";
import MusicAPI from "../api/modules/music.api";
import FavoriteAPI from "../api/modules/favorite.api";
import { useSelector, useDispatch } from "react-redux";
import { setListFavorites } from "../redux/store";

function HomePage() {
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [dailyTopHits, setDailyTopHits] = useState([]);
  const [melodicTopTracks, setMelodicTopTracks] = useState([]);
  const [dailyTopFavorites, setDailyTopFavorites] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [moods, setMoods] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteResponse = await FavoriteAPI.getListFavorites(token);
        dispatch(setListFavorites(favoriteResponse));

        const DailyTopHitsPlaylist = await playlistAPI.getPlaylistById(
          1,
          token
        );
        setDailyTopHits(DailyTopHitsPlaylist);

        const topTracks = await playlistAPI.getPlaylistById(2, token);
        setMelodicTopTracks(topTracks);

        const dailyTopFavorites = await playlistAPI.getPlaylistById(47, token);
        setDailyTopFavorites(dailyTopFavorites);

        const newReleases = await MusicAPI.getNewReleases();
        setNewReleases(newReleases);
        console.log(newReleases);

        const popularAlbums = await MusicAPI.getTopAlbums();
        setPopularAlbums(popularAlbums);

        const topArtists = await MusicAPI.getTopArtists();
        setTopArtists(topArtists);

        const publicPlaylists = await MusicAPI.getPublicPlaylists();
        setMoods(publicPlaylists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(dailyTopFavorites)
  return (
    <Stack
      spacing={5}
      sx={{ width: "75vw", margin: "2rem auto", color: "#fff" }}
    >
      <Container
        header="Discover"
        sx={{
          height: "50vh",
        }}
      >
        <Box
          sx={{
            display: "flex", // Sử dụng flexbox để xếp theo hàng ngang
            gap: "10px",
            width: "100%", // Đảm bảo chiều rộng của Box là 100%
          }}
        >
          {dailyTopHits.length > 0 && <Box
            sx={{
              flex: "1", // Chia đều không gian cho hai Card
              maxWidth: "33%", // Đảm bảo mỗi Card không vượt quá 50% chiều rộng
            }}
          >
            <AlbumSlider list={dailyTopHits} type={"Playlist"} />
          </Box>}
          {melodicTopTracks.length > 0 && <Box
            sx={{
              flex: "1",
              maxWidth: "33%",
            }}
          >
            <AlbumSlider list={melodicTopTracks} type={"Playlist"} />
          </Box>}
          {dailyTopFavorites.length > 0 && <Box
            sx={{
              flex: "1",
              maxWidth: "33%",
            }}
          >
            <AlbumSlider list={dailyTopFavorites} type={"Playlist"} />
          </Box>}
        </Box>
      </Container>

      <Container header="New Releases">
        <TrackSlider tracks={newReleases} />
      </Container>

      {popularAlbums.length > 0 && (
        <Container header="Popular Albums">
          <AlbumSlider list={popularAlbums} type={"Album"} />
        </Container>
      )}

      {moods.length > 0 && (
        <Container header="Moods">
          <AlbumSlider list={moods} type={"Album"} />
        </Container>
      )}

      {topArtists.length > 0 && (
        <Container header="Top Artists">
          <AlbumSlider list={topArtists} type={"Artist"} />
        </Container>
      )}
     

     
   
      <Box sx={{ height: "17%", width: "100%" }}></Box>
    </Stack>
  );
}

export default HomePage;
