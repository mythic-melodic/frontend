import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PlaylistAPI from "../../api/modules/playlist.api";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setPlaylistInfo } from '../../redux/store';

const UpdatePlaylistPopup = ({ open, onClose, playlist }) => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playlist) {
      setPlaylistTitle(playlist.title);
      setDescription(playlist.description || "");
    }
  }, [playlist]);

  const handleUpdate = async () => {
    const updatedPlaylist = {
      id: playlist.id,
      name: playlistTitle,
      description: description || null,
    };

    try {
      const response = await PlaylistAPI.updatePlaylist(updatedPlaylist, token);
      console.log("Update playlist response:", response);

      if (response.message === "Playlist updated") {
        alert("Playlist updated successfully!");

        // Cập nhật chỉ thông tin title và description trong Redux, giữ nguyên các thông tin khác
        dispatch(setPlaylistInfo({
            ...playlist, 
            title: playlistTitle, 
            description: description || "",
          }));
        onClose(); // Đóng popup sau khi cập nhật
      } else {
        console.error("Error updating playlist:", response.message || response);
        alert("Failed to update the playlist. Please try again.");
      }
    } catch (error) {
      console.error("API call failed:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1E1E1E", // Dark background
          color: "#fff", // White text color
          padding: "20px",
          borderRadius: "8px",
          width: "20rem",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Update Playlist
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Playlist Title"
          variant="outlined"
          fullWidth
          margin="dense"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FF4B4B" },
              "&:hover fieldset": { borderColor: "#FF4B4B" },
              "&.Mui-focused fieldset": { borderColor: "#FF4B4B" },
            },
            "& .MuiInputLabel-root": { color: "#FF4B4B" },
            '& .MuiInputBase-input': { color: '#fff' },  // Make text color white
          }}
        />
        <TextField
          label="Description (optional)"
          variant="outlined"
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#333" },
              "&:hover fieldset": { borderColor: "#333" },
              "&.Mui-focused fieldset": { borderColor: "#333" },
            },
            "& .MuiInputLabel-root": { color: "#FF4B4B" },
            '& .MuiInputBase-input': { color: '#fff' },  // Make text color white

          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#333",
            "&:hover": { borderColor: "#555" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          sx={{
            backgroundColor: "#FF4B4B",
            color: "#fff",
            "&:hover": { backgroundColor: "#E33E3E" },
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePlaylistPopup;
