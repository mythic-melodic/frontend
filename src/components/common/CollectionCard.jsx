
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import createUrl from "../../hooks/createUrl";
import { useState, useEffect } from "react";

const CollectionCard = ({ collection, type }) => {
  const [coverUrl, setCoverUrl] = useState("");
  useEffect(() => {
    if(collection.cover){
      setCoverUrl(createUrl(collection.cover));
    }else
    {
      setCoverUrl(createUrl("1uPpcuN038RVhwU-IHLHSsCxG61lpCHay"));
    }
  }, [collection.cover]);
  const handlePlay = (event) => {
    event.preventDefault();
    //play
  };
  return type === "Album" ? (
    <Link to={`/album/${collection.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          padding: "10px",
          backgroundColor: "#1f1f1f",
          color: "white",
          maxWidth: "200px",

        }}
      >
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            image={coverUrl}
            alt={collection.title}
            sx={{
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "6px",
              position: "relative",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "90%",
              aspectRatio: "1 / 1",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(231,85,101, 0.8)",
                },
              }}
              onClick={handlePlay}
            >
              <PlayArrowIcon sx={{ color: "white", fontSize: "30px" }} />
            </Box>
          </Box>
        </Box>
        <CardContent sx={{ padding: "0" }}>
          <Typography component="div" noWrap>
            {collection.title}
          </Typography>
          <Typography color="white">{collection.release_date && collection.release_date.substring(0, 4)}</Typography>
        </CardContent>
      </Card>
    </Link>
  ) : (
    <Link to={`/playlist/${collection.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          border: "none",
          boxShadow: "none",
          padding: "10px",
          backgroundColor: "#1f1f1f",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            image={collection.cover}
            alt={collection.name}
            sx={{
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "6px",
              position: "relative",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "90%",
              aspectRatio: "1 / 1",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(231,85,101, 0.8)",
                },
              }}
              onClick={handlePlay}
            >
              <PlayArrowIcon sx={{ color: "white", fontSize: "30px" }} />
            </Box>
          </Box>
        </Box>
        <CardContent sx={{ padding: "0" }}>
          <Typography component="div" noWrap>
           {collection.title}
          </Typography>
          <Typography color="white">{collection.release_date}</Typography>

        </CardContent>
      </Card>
    </Link>
  );
};

export default CollectionCard;