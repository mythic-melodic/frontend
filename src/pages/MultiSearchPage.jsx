import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Slider from "../components/common/Slider";
import TrackSlider from "../components/HomePage/TrackSlider";
import Container from "../components/common/Container";
import SearchAPI from "../api/modules/search.api";

function MultiSearch() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  const [tracksSearch, setTracksSearch] = useState([]);
  const [artistSearch, setArtistSearch] = useState([]);
  const [albumSearch, setAlbumSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchQuery) return;
    console.log(searchQuery);

    const fetchSearchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const [tracksRes, artistsRes, albumsRes] = await Promise.all([
          SearchAPI.searchTracks(searchQuery),
          SearchAPI.searchArtists(searchQuery),
          SearchAPI.searchAlbums(searchQuery),
        ]);

        setTracksSearch(tracksRes || []);
        setArtistSearch(artistsRes || []);
        setAlbumSearch(albumsRes || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        paddingBottom: "5vh",
        backgroundColor: "#121212",
        color: "#fff",
      }}
    >
      <Stack
        spacing={7}
        sx={{ width: "75vw", margin: "2rem auto", color: "#fff" }}
      >
        {loading && <p>Loading search results...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            {tracksSearch.length > 0 && (
              <Container header="Tracks" background="#1f1f1f">
                <TrackSlider tracks={tracksSearch} />
              </Container>
            )}

            {artistSearch.length > 0 && (
              <Container header="Artists" background="#1f1f1f">
                <Slider list={artistSearch} type="Artist" />
              </Container>
            )}

            {albumSearch.length > 0 && (
              <Container header="Albums" background="#1f1f1f">
                <Slider list={albumSearch} type="Album" />
              </Container>
            )}

            {tracksSearch.length === 0 &&
              artistSearch.length === 0 &&
              albumSearch.length === 0 && <p>No results found for "{searchQuery}".</p>}
          </>
        )}
      </Stack>
    </Box>
  );
}

export default MultiSearch;
