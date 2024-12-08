import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlaylistAPI from '../../api/modules/playlist.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usePlaylist from "../../hooks/usePlaylist";

const CreatePlaylistPopup = ({ open, onClose, trackId }) => {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [description, setDescription] = useState('');

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

    const playlist = {
      name: playlistTitle,
      description: description || null,
    };

    try {
      const response = await PlaylistAPI.createPlaylist(playlist, token);
      console.log('Create playlist response:', response);

      if (response.message === 'Playlist created') {
        alert('Playlist created successfully!');
        setPlaylistTitle(''); // Reset the title
        setDescription(''); // Reset the description

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
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#333' },
              '&:hover fieldset': { borderColor: '#333' },
              '&.Mui-focused fieldset': { borderColor: '#333' },
            },
            '& .MuiInputLabel-root': { color: '#FF4B4B' },
            '& .MuiInputBase-input': { color: '#fff' },  // Make text color white
          }}
        />
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
