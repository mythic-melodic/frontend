import TrackCard from "../components/HomePage/TrackCard";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteAPI from "../api/modules/favorite.api";
import TrackAPI from "../api/modules/track.api";
import { setListFavorites } from "../redux/store";

const Favorite = () => {
  const [tracks, setTracks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();

  // Get the token and favorites from the Redux store
  const token = useSelector((state) => state.auth.token);
  const favorites = useSelector((state) => state.favorite.listFavorites);

  // Fetch favorites from the API and update Redux store
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteResponse = await FavoriteAPI.getListFavorites(token, 1);

        if (favoriteResponse.length === 0) {
          setHasMore(false);
          return;
        }

        dispatch(setListFavorites(favoriteResponse)); // Dispatch to Redux store
      } catch (error) {
        console.error("Error fetching favorite tracks:", error);
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    if (favorites.length === 0) {
      fetchFavorites();
    }
  }, [dispatch, token, favorites.length]);

  // Fetch track details when `favorites` changes
  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        setLoading(true); // Set loading state to true when fetching data
        const trackIds = favorites.map((item) => item.track_id);
        const trackDetails = await Promise.all(
          trackIds.map((id) => TrackAPI.getTrackById(id))
        );
        setTracks(trackDetails);
      } catch (error) {
        console.error("Error fetching track details:", error);
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    if (favorites.length > 0) {
      fetchTrackDetails();
    }
  }, [favorites]);

  // Slice the tracks list based on pagination
  const tracksPerPage = 10; // Adjust this value based on your requirements
  const displayedTracks = tracks.slice(0, page * tracksPerPage);

  // Handle Load More button click
  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);

      if (nextPage * tracksPerPage >= tracks.length) {
        setHasMore(false);
      }
      setLoadingMore(false);
    }
  };

  return (
    <Box mt={5}>
      <Typography
        variant="h4"
        sx={{ color: "gray", fontWeight: "bold", paddingLeft: "10px" }}
      >
        Your Favorite Tracks
      </Typography>

      <Stack spacing={2} sx={{ marginTop: 2 }} paddingLeft={2}>
        {loading && <CircularProgress sx={{ alignSelf: "center" }} />}{" "}
        {/* Show the loading spinner while fetching data */}
        {!loading && displayedTracks.length === 0 ? (
          <Typography variant="body2" color="red" ml={2}>
            You have no favorite tracks yet.
          </Typography>
        ) : (
          <>
            {displayedTracks.map((track) => (
              <Box key={track.id} sx={{ width: "100%" }}>
                <TrackCard track={track} />
              </Box>
            ))}
            {loadingMore && (
              <Typography variant="body2">Loading more tracks...</Typography>
            )}
            {hasMore && !loadingMore && !loading && (
              <Button
                variant="contained"
                onClick={handleLoadMore}
                sx={{
                  alignSelf: "center",
                  marginTop: 2,
                  color: "white",
                  backgroundColor: "darkred",
                }}
              >
                Load More
              </Button>
            )}
            {!hasMore && (
              <Typography variant="body2" color="red" ml={2}>
                No more tracks to load.
              </Typography>
            )}
          </>
        )}
        <Box height={100}></Box>
      </Stack>
    </Box>
  );
};

export default Favorite;
