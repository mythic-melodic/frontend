import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SongCardMenu from "../common/SongCardMenu";
import { IconButton } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useDispatch } from "react-redux";
import { addTrackToQueue } from "../../redux/store";
import useAudioPlayer from "../../hooks/useAudioPlayer";

const TrackCard = ({ track }) => {
  const dispatch = useDispatch();

  const handleSaveToQueue = () => {
    dispatch(addTrackToQueue({ id: track.id }));
  };


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2px 8px",
        borderTop: "1px solid #333",
        position: "relative", // Để đặt nút play lên trên
        "&:hover .play-button": { // Khi hover vào TrackCard, nút Play sẽ hiện lên
          opacity: 1,
        },
      }}
      onClick={handleSaveToQueue}
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
            src={track.track_cover ? track.track_cover : "https://i.pinimg.com/736x/c6/37/b2/c637b2464e06ad304c90d46f165e6e00.jpg"}
            alt={track.title}
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
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 'inherit'}}/>
          </IconButton>
        </Box>

        {/* Tên bài hát và nghệ sĩ */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", fontSize: "15px" }}
          >
            {track.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#aaa", fontSize: "14px" }}
          >
        {Array.isArray(track.artists) ? track.artists.map((artist, index) => (
              <span key={index}>
                <a href={`/artist/${artist.id}`}>{artist.display_name}</a>
                {index < track.artists.length - 1 ? ", " : ""}
              </span>
            )) : "Unknown Artist"}
             
          </Typography>
        </Box>
      </Box>

      {/* More icon */}
      <SongCardMenu songId={track.id} />
    </Box>
  );
};

export default TrackCard;
