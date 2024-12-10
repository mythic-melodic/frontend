import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { MoreVert as MoreVertIcon, MoreHoriz as MoreHorizIcon } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import CreatePlaylistPopup from "./CreatePlaylistPopup";
import PlaylistAPI from "../../api/modules/playlist.api";
import usePlaylist from "../../hooks/usePlaylist";
import { useSelector } from "react-redux";

const MoreMenu = ({
  isVertical = true,
  MoreColor = "white",
  bgColor = "rgba(40, 35, 36, 0.5)",
  menuItems = [],
  trackId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(submenuAnchorEl);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!token) return;
      const response = await PlaylistAPI.getPlaylistByUser(token);
      if (response?.length > 0) {
        setPlaylists(response);
      }
    };
    fetchPlaylists();
  }, [token]);

  const { addTrackToPlaylist } = usePlaylist(token);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleSubmenuOpen = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  const handleAddToPlaylist = (playlistId) => {
    addTrackToPlaylist(playlistId, trackId);
    console.log("Add to playlist", playlistId, trackId);
  //  handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        {isVertical ? (
          <MoreVertIcon sx={{ color: MoreColor }} />
        ) : (
          <MoreHorizIcon sx={{ color: MoreColor }} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: bgColor,
            backdropFilter: "blur(100px)",
            borderRadius: "0.5rem",
          },
          "& .MuiMenuItem-root": {
            "&:hover": { backgroundColor: "gray" },
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        disableScrollLock
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.onClick}
            onMouseEnter={
              item.text === "Add to Playlist" ? handleSubmenuOpen : null
            }
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "1rem",
              borderBottom:
                index < menuItems.length - 1 ? "2px solid grey" : "none",
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{ color: "white", marginRight: "2rem" }}
              primaryTypographyProps={{ fontSize: "13px" }}
            />
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
          </MenuItem>
        ))}

        <Menu
          open={submenuOpen}
          anchorEl={submenuAnchorEl}
          onClose={handleSubmenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: bgColor,
              backdropFilter: "blur(100px)",
              borderRadius: "0.6rem",
            },
            "& .MuiMenuItem-root": {
              "&:hover": { backgroundColor: "gray" },
            },
            overflowY: "auto",
          }}
          onMouseLeave={handleSubmenuClose}
        >
          <MenuItem
            onClick={() => setIsPopupOpen(true)}
            sx={{ borderBottom: "1px solid gray" }}
          >
            <ListItemText
              sx={{ color: "white", marginRight: "2rem" }}
              primaryTypographyProps={{ fontSize: "13px" }}
            >
              New Playlist
            </ListItemText>
            <ListItemIcon sx={{ color: "white" }}>{<Add />}</ListItemIcon>
          </MenuItem>
          <CreatePlaylistPopup
            open={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            trackId={trackId}
          />
          <Box
            sx={{
              maxHeight: "100px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#555",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#777",
              },
            }}
          >
            {playlists.map((playlist) => (
              <MenuItem
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: "1rem",
                }}
              >
                <ListItemText
                  primary={playlist.name}
                  sx={{ color: "white", marginRight: "2rem" }}
                  primaryTypographyProps={{ fontSize: "13px" }}
                />
              </MenuItem>
            ))}
          </Box>
        </Menu>
      </Menu>
    </>
  );
};

export default MoreMenu;
