import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTrackToQueue } from "../../redux/store";
import useAudioPlayer from "../../hooks/useAudioPlayer";
const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();

  const handleSaveToQueue = () => {
    dispatch(addTrackToQueue({ id: album.id }));
  };

  const handlePlayNow = () => {
    console.log(`Playing album: ${album.title}`);
    useAudioPlayer.playTrack();
  };

  return (
    <Card
      sx={{
        overflow: "hidden",
        border: "none",
        boxShadow: "none",
        padding: "10px",
        backgroundColor: "#1f1f1f",
        color: "white",
      }}
    >
      <Link to={`/album/${album.id}`} style={{ textDecoration: "none" }} onClick={handleSaveToQueue}>
        <CardMedia
          component="img"
          image={album.cover}
          alt={album.title}
          sx={{
            height: {
              xs: "30vw",
              sm: "20vw",
              md: "15vw",
              lg: "10vw",
              xl: "8vw",
            },
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      </Link>
      <CardContent sx={{ padding: "0" }}>
        <Typography variant="h10" component="div" noWrap>
          {album.title}
        </Typography>
        <Typography variant="body2" color="white">
          {album.artist}
        </Typography>
        <Box mt={1}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#3f51b5",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#2c387e",
              },
            }}
            onClick={handlePlayNow}
          >
            Play
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
