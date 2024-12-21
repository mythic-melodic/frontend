import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SongCardMenu from "../common/SongCardMenu";
import { IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTrackToQueue } from "../../redux/store";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { Link } from "react-router-dom";
import createURL from "../../hooks/createUrl"

const TrackCard = ({ track }) => {
  const defaultCover = "../../default/track_cover.png";
  // console.log(track.id);
  // console.log("Track Artists:", track.artists);
  const dispatch = useDispatch();

  const handleSaveToQueue = () => {
    console.log("Add to queue:", track.id);
    dispatch(addTrackToQueue({ id: track.id }));
  };

  const defaultCover = "../../default/track_cover.png";


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px 8px",
        borderTop: "1px solid #333",
        position: "relative",
        "&:hover .play-button": {
          opacity: 1,
        },
      }}
    >
      {/* Album cover + Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Hình ảnh và nút Play */}
        <Box
          sx={{
            position: "relative", // Để chứa nút Play
          }}
        >
          <Box
            component="img"

            src={
              track.track_cover ? createURL(track.track_cover) : defaultCover
            }
            // alt={track.title}

            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              objectFit: "cover",
            }}
          />

          {/* Nút Play */}
          <IconButton
            className="play-button"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0, // Mặc định là ẩn
              transition: "opacity 0.3s ease-in-out", // Thêm hiệu ứng chuyển động mượt mà
              color: "#ccc", // Đảm bảo màu trắng cho nút Play
              fontSize: "32px", // Kích thước của nút Play
            }}
            onClick={handleSaveToQueue}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
        </Box>

        {/* Tên bài hát và nghệ sĩ */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", fontSize: "15px" }}
            component={Link}
            to={`/track/${track.id}`}
            style={{ textDecoration: "none" }}
            key={track.id}
          >
            {track.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontSize: "14px" }}
          >
            {/* {Array.isArray(track.artists) ? track.artists.map((artist, index) => (
              <span key={index}>
                <a href={`/artist/${artist.id}`} style={{textDecoration: 'none', color: 'white' }}>{artist.display_name}</a>
                {index < track.artists.length - 1 ? ", " : ""}
              </span>

            )) : "Unknown Artist"} */}

            {track.artists &&
              track.artists.map((artist, index) => (
                <React.Fragment key={artist.id}>
                  <Link
                    to={`/artist/${artist.id}`}
                    style={{ color: "#aaa", textDecoration: "none" }}
                    key={artist.id}
                  >
                    {artist.display_name}
                  </Link>
                  {index < track.artists.length - 1 && ", "}
                </React.Fragment>
              ))}
          </Typography>
        </Box>
      </Box>

      {/* More icon */}
      <SongCardMenu songId={track.id} />
    </Box>
  );
};

export default TrackCard;
