import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaylistAPI from "../../api/modules/playlist.api";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistInfo } from "../../redux/store";

const UpdatePlaylistPopup = ({ open, onClose, playlist }) => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [fileError, setFileError] = useState("");

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playlist) {
      setPlaylistTitle(playlist.title);
      setDescription(playlist.description || "");
      console.log("playlist", playlist);
    }
  }, [playlist]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setCoverImage(file);
      setFileError("");
    } else {
      setCoverImage(null);
      setFileError("Please upload a valid image file (JPEG, PNG, JPG).");
    }
  };

  const handleUpdate = async () => {
    if (!playlistTitle) {
      alert("Playlist title is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", playlistTitle);
    if (description) formData.append("description", description);
    if (coverImage) formData.append("cover", coverImage);
    formData.append("id", playlist.id); // Include playlist ID

    try {
      const response = await PlaylistAPI.updatePlaylist(formData, playlist.id, token);
      console.log("Update playlist response:", response);

      if (response.message === "Playlist updated") {
        alert("Playlist updated successfully!");
        console.log("coverImage", coverImage);

        // Update playlist information in Redux
        dispatch(
          setPlaylistInfo({
            ...playlist,
            title: playlistTitle,
            description: description || "",
            cover: response.cover,
          })
        );

        onClose(); // Close popup
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
            "& .MuiInputBase-input": { color: "#fff" }, // Make text color white
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
            "& .MuiInputBase-input": { color: "#fff" }, // Make text color white
          }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2, backgroundColor: "#e75565", mt: 2, width: "100%" }}
        >
          Upload Cover Image
          <input
            type="file"
            hidden
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
          />
        </Button>
        {fileError && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {fileError}
          </Typography>
        )}
        {coverImage && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected File: {coverImage.name}
          </Typography>
        )}
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
