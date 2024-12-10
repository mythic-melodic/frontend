import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  return (
    <Link to={`/artist/${artist.id}`} style={{ textDecoration: "none" }}>
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
        <CardMedia
          component="img"
          image={artist.cover || artist.avatar}
          alt={artist.name || artist.display_name}
          sx={{
            objectFit: "cover",
            borderRadius: "50%",
            aspectRatio: "1 / 1",
          }}
        />
        <CardContent sx={{ padding: "0" }}>
          <Typography variant="h10" component="div" noWrap textAlign={"center"}>
            {artist.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArtistCard;
