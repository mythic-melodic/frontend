import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteAPI from "../../src/api/modules/favorite.api";
import { addFavorite, removeFavorite } from "../../src/redux/store";

const useFavorite = (songId, token) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.listFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the song is already in the favorites list
  useEffect(() => {
    const favorite = favorites.some((favorite) => favorite.track_id === songId);
    setIsFavorite(favorite);
  }, [favorites, songId]);

  const addToFavorite = async () => {
    try {
      const data = { track_id: songId };
      const result = await FavoriteAPI.addFavorite(data, token);
      
      if (!result || !result.track_id) {
        throw new Error("Failed to add favorite");
      }

      dispatch(addFavorite(result.track_id)); // Add to Redux
      setIsFavorite(true); // Update local state
      console.log("Added to favorites successfully");
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const removeFromFavorite = async () => {
    try {
      const data = { track_id: songId };
      const result = await FavoriteAPI.removeFavorite(data, token);

      if (result.message === "Favorite removed") {
        dispatch(removeFavorite(songId)); // Remove from Redux
        setIsFavorite(false); // Update local state
        console.log("Removed from favorites successfully");
      } else {
        throw new Error("Failed to remove favorite");
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return {
    isFavorite,
    addToFavorite,
    removeFromFavorite,
  };
};

export default useFavorite;
