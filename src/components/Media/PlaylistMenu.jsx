import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import MoreMenu from "../common/MoreMenu";
import UpdatePlaylistPopup from "../common/UpdatePlaylistPopUp"; // Import the Popup component
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import PlaylistAPI from "../../api/modules/playlist.api";

const PlaylistMenu = ({ playlist }) => {
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false); // State to control popup visibility
  const [currentPlaylist, setCurrentPlaylist] = useState(null); // State to hold the playlist data
  const navigate = useNavigate();

  const handleUpdate = (playlist) => {
    setCurrentPlaylist(playlist); // Set the current playlist data
    setOpenUpdatePopup(true); // Open the popup
  };

  const handleClosePopup = () => {
    setOpenUpdatePopup(false); // Close the popup
  };

  const handleDelete = async (id) => { // Make the function async
    const confirmDelete = window.confirm("Are you sure you want to delete this playlist?");
    if (confirmDelete) {
      try {
        const response = await PlaylistAPI.deletePlaylist(id); // Await the API call
        console.log("Delete playlist response:", response);
  
        if (response.message === "Playlist deleted successfully") {
          alert("Playlist deleted successfully!");
          navigate("/");  // Redirect to the home page
        } else {
          console.error("Error deleting playlist:", response.message || response);
          alert("Failed to delete the playlist. Please try again.");
        }
      } catch (error) {
        console.error("Error occurred while deleting playlist:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };
  

  const menuItems = [
    {
      text: "Update Playlist",
      onClick: () => handleUpdate(playlist), // Show the update popup
      icon: <Edit />,
    },
    {
      text: "Delete Playlist",
      onClick: () => handleDelete(playlist.id),
      icon: <Delete />,
    },
  ];

  return (
    <>
      <MoreMenu menuItems={menuItems} isVertical={false} />
      {currentPlaylist && (
        <UpdatePlaylistPopup
          open={openUpdatePopup}
          onClose={handleClosePopup}
          playlist={currentPlaylist} // Pass the playlist data to the popup
        />
      )}
    </>
  );
};

export default PlaylistMenu;
