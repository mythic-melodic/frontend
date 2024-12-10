import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import TrackCard from "../HomePage/TrackCard";

function TopSongs({ topSongs }) {
  const [currentPage, setCurrentPage] = useState(0);
  const songsPerPage = 8; // Số bài hát mỗi trang

  // Tổng số trang
  const totalPages = Math.ceil(topSongs.length / songsPerPage);

  // Xử lý Next Page
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // Xử lý Previous Page
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // Tính toán danh sách bài hát hiển thị
  const startIndex = currentPage * songsPerPage;
  const visibleSongs = topSongs.slice(startIndex, startIndex + songsPerPage);

  return (
    <Box sx={{ width: "100%" , height: "100%"}}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "10px" }}>
        Top Songs
      </Typography>

      {/* Song Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          position: "relative",
        }}
      >
        {/* Left Column */}
        <Box sx={{ width: "48%", display: "flex", flexDirection: "column", gap: "10px" }}>
          {visibleSongs.slice(0, 4).map((song, index) => (
            <TrackCard key={index} track={song} />
          ))}
        </Box>

        {/* Right Column */}
        <Box sx={{ width: "48%", display: "flex", flexDirection: "column", gap: "10px" }}>
          {visibleSongs.slice(4, 8).map((song, index) => (
            <TrackCard key={index} track={song} />
          ))}
        </Box>

        {/* Previous Button */}
        {currentPage > 0 && (
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "relative",
              top: "50%",
              bottom: "-5px",
              left: "-20px",
              // transform: "translateY(-50%)",
              backgroundColor: "white",
              color: "black",
              ":hover": { backgroundColor: "#ddd" },
            }}
          >
            <MdNavigateBefore size={24} />
          </IconButton>
        )}

        {/* Next Button */}
        {currentPage < totalPages - 1 && (
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "-20px",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              color: "black",
              ":hover": { backgroundColor: "#ddd" },
            }}
          >
            <MdNavigateNext size={24} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export default TopSongs;
