import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import { red, grey } from "@mui/material/colors";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MainMenu from "./PlaylistMenu";
import SongCardMenu from "../common/SongCardMenu";
import useTheme from "@mui/material/styles/useTheme";
import { useSelector } from "react-redux";
import {usePlaylistContext} from "../../hooks/PlaylistContext"; // Import the context



const MediaHeader = ({ media, mediaType }) => {
  const [open, setOpen] = useState(false);
  const textColor = red[500];
  const titleColor = grey[400];

  const theme = useTheme();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUserId = useSelector((state) => state.auth.user_id); // Lấy userId của người dùng hiện tại từ Redux store
  const { creatorId, playlistId } = usePlaylistContext();


  const renderMediaContent = () => (
    <>
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        gutterBottom
        color={titleColor}
      >
        {media.title}
      </Typography>

      {media.artist && (
        <Typography variant="h6" sx={{ color: "gray" }}>
          {media.artist}
        </Typography>
      )}

      {media.album && (
        <Typography variant="h5" sx={{ color: textColor }}>
          {media.artist} • {media.album}
        </Typography>
      )}

      <Typography variant="subtitle1" color="white">
        {media.genre && `${media.genre} • `}
        {media.year}
      </Typography>
      {media.description && (
        <Typography
          variant="body2"
          color={titleColor}
          sx={{
            mt: 1,
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
            },
            textAlign: {
              sm: "center",
              md: "left", // Căn trái cho màn hình lớn hơn
            },
            wordWrap: "break-word", // Tự động xuống dòng nếu quá dài
          }}
        >
          {media.description.length > 200
            ? `${media.description.substring(0, 200)}...`
            : media.description}
          {media.description.length > 200 && (
            <Button
              onClick={handleClickOpen}
              sx={{
                textTransform: "none",
                color: textColor,
              }}
            >
              MORE
            </Button>
          )}
        </Typography>
      )}

      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        sx={{
          position: {
            md: "absolute", // Chỉ áp dụng "absolute" từ kích thước md trở lên
          },
          bottom: {
            md: "24px", // Cách đáy 24px từ kích thước md trở lên
          },
          bgcolor: textColor,
          "&:hover": { bgcolor: red[700] },
        }}
      >
        Play
      </Button>
    </>
  );

  const renderDialog = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      keepMounted
      disableScrollLock
    >
      <DialogContent sx={{ bgcolor: "#121212" }}>
        <Typography variant="body1" color={titleColor}>
          {media.description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#121212" }}>
        <Button
          onClick={handleClose}
          sx={{ color: textColor, borderColor: textColor }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
        },
        alignItems: {
          xs: "center",
          sm: "center",
          md: "flex-start",
        },
        bgcolor: "#121212",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* More Options Icon */}
      <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
        {mediaType === "track" ? (
          <SongCardMenu track={media} />
        ) : mediaType === "playlist" && creatorId === currentUserId ? (
          <MainMenu playlist={media} />
        ) : null}
      </Box>

      <CardMedia
        component="img"
        image={media.cover}
        alt="Media Cover"
        sx={{
          width: {
            xs: "70%", // Slightly reduced width for extra small screens
            sm: "80%", // Slightly narrower on small screens
            md: "300px", // Fixed width on medium screens and up
          },
          maxWidth: "370px", // Ensures the image doesn’t exceed this width
          height: {
            xs: "70%", // Matches the width for xs screens
            sm: "80%", // Matches the width for sm screens
            md: "300px", // Matches the width for md screens
          },
          aspectRatio: "1 / 1", // Đảm bảo hình vuông
          borderRadius: mediaType === "track" ? 2 : 1,
          mb: mediaType === "track" ? "1.5rem" : 0,
          boxShadow: 3, // Adds a subtle shadow for aesthetics
          boxShadow: 3, // Tạo bóng nhẹ
          alignSelf: "center", // Căn giữa theo trục dọc
        }}
      />

      <CardContent
        sx={{
          textAlign: {
            xs: "center",
            sm: "center",
            md: "left",
          },
          mt: mediaType === "track" ? "1.5rem" : 0,
        }}
      >
        {renderMediaContent()}
      </CardContent>

      {renderDialog()}
    </Card>
  );
};

export default MediaHeader;
