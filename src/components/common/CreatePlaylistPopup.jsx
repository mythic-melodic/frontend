import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlaylistAPI from '../../api/modules/playlist.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usePlaylist from "../../hooks/usePlaylist";

const CreatePlaylistPopup = ({ open, onClose, trackId }) => {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileError, setFileError] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { addTrackToPlaylist } = usePlaylist(token);

  const handleAddTrackToPlaylist = async (playlistId) => {
    try {
      await addTrackToPlaylist(playlistId, trackId); // Add track to the new playlist
      console.log('Added track to playlist', playlistId, trackId);
    } catch (error) {
      console.error("Failed to add track to playlist:", error);
      alert("Failed to add track to playlist.");
    }
  };

  const handleCreate = async () => {
    if (!playlistTitle) {
      alert('Playlist title is required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', playlistTitle);
    if (description) formData.append('description', description);
    if (coverImage) formData.append('cover', coverImage);

    try {
      const response = await PlaylistAPI.createPlaylist(formData, token);
      console.log('Create playlist response:', response);

      if (response.message === 'Playlist created') {
        alert('Playlist created successfully!');
        setPlaylistTitle(''); // Reset the title
        setDescription(''); // Reset the description
        setCoverImage(null); // Reset the cover image

        // Add track to the newly created playlist
        handleAddTrackToPlaylist(response.playlist_id);

        onClose(); // Close the popup
        navigate(`/playlist/${response.playlist_id}`); // Redirect to the new playlist
      } else {
        console.error('Error creating playlist:', response.message || response);
        alert('Failed to create the playlist. Please try again.');
      }
    } catch (error) {
      console.error('API call failed:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setCoverImage(file);
      setFileError('');
    } else {
      setCoverImage(null);
      setFileError('Please upload a valid image file (JPEG, PNG, JPG).');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1E1E1E', // Dark background
          color: '#fff', // White text color
          padding: '20px',
          borderRadius: '8px',
          width: '20rem',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        New Playlist
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Playlist Title"
          variant="outlined"
          fullWidth
          margin="dense"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#FF4B4B' },
              '&:hover fieldset': { borderColor: '#FF4B4B' },
              '&.Mui-focused fieldset': { borderColor: '#FF4B4B' },
            },
            '& .MuiInputLabel-root': { color: '#FF4B4B' },
            '& .MuiInputBase-input': { color: '#fff' }, // Make text color white
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
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#333' },
              '&:hover fieldset': { borderColor: '#333' },
              '&.Mui-focused fieldset': { borderColor: '#333' },
            },
            '& .MuiInputLabel-root': { color: '#FF4B4B' },
            '& .MuiInputBase-input': { color: '#fff' }, // Make text color white
          }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2, backgroundColor: '#e75565', mt: 2, width: '100%' }}>
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
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#fff',
            borderColor: '#333',
            '&:hover': { borderColor: '#555' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          sx={{
            backgroundColor: '#FF4B4B',
            color: '#fff',
            '&:hover': { backgroundColor: '#E33E3E' },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlaylistPopup;
