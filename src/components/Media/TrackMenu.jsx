import React from "react";
import MoreMenu from "../common/MoreMenu";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import useFavorite from "../../hooks/useFavorite"; // Import the custom hook
import {usePlaylistContext} from "../../hooks/PlaylistContext"; // Import the context
import { useSelector } from "react-redux";
import usePlaylist from "../../hooks/usePlaylist";

const TrackMenu = ({ TrackId, bgColor, moreColor }) => {
  const token = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.user_id); // Lấy userId của người dùng hiện tại từ Redux store
  
  // Use the custom hook for managing favorites
  const { isFavorite, addToFavorite, removeFromFavorite } = useFavorite(
    TrackId,
    token
  );
  const { creatorId, playlistId } = usePlaylistContext();

  const { removeTrackFromPlaylist } = usePlaylist(token, playlistId); // Sử dụng custom

  // Get creatorId from context

  const handleDeleteTrack = async (trackId) => {
    console.log(`Deleting track ${trackId}`);
    // Call the API to delete the track
    try {
      const response = await removeTrackFromPlaylist(playlistId, trackId);
      console.log(response);
    } catch (err) {
      console.error("Error deleting track", err);
    }    
  }




  const menuItems = [
    ...(creatorId === currentUserId // Chỉ thêm nếu người tạo là người dùng hiện tại
      ? [
          {
            text: "Delete from Playlist",
            onClick: () => handleDeleteTrack(TrackId),
            icon: <DeleteIcon />,
          },
        ]
      : []),
    {
      text: "Add to Playlist",
      onClick: () => addTrackToPlaylist(TrackId),
      icon: <AddIcon />,
    },
    {
      text: isFavorite ? "Remove from Favorites" : "Add to Favorites",
      onClick: () => {
        if (isFavorite) {
          removeFromFavorite();
        } else {
          addToFavorite();
        }
      },
      icon: isFavorite ? <FavoriteIcon /> : <FavoriteIcon sx={{ color: "gray" }} />,
    },
  ];

  return (
    <MoreMenu menuItems={menuItems} bgColor={bgColor} MoreColor={moreColor} trackId={TrackId} />
  );
};

export default TrackMenu;
