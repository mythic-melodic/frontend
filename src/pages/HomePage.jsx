import React, { useEffect, useState } from "react";
import AlbumSlider from "../components/common/AlbumSlider";
import Sidebar from "../components/sidebar/sidebar";
import { Box, Stack, Typography } from "@mui/material";
import Container from "../components/common/Container";
// Removed unused import: AlbumCard
// import AlbumCard from "../components/common/AlbumCard/AlbumCard";

const mockAlbums = [
  {
    id: 1,
    name: "Greatest Hits",
    cover: "https://via.placeholder.com/300x300.png?text=Greatest+Hits",
  },
  {
    id: 2,
    name: "Summer Vibes",
    artist: "long",
    cover: "https://via.placeholder.com/300x300.png?text=Summer+Vibes",
  },
  {
    id: 3,
    name: "Acoustic Sessions",
    cover: "https://via.placeholder.com/300x300.png?text=Acoustic+Sessions",
  },
  {
    id: 4,
    name: "Live in Concert",
    cover: "https://via.placeholder.com/300x300.png?text=Live+in+Concert",
  },
  {
    id: 5,
    name: "Classical Essentials",
    cover: "https://via.placeholder.com/300x300.png?text=Classical+Essentials",
  },
  {
    id: 6,
    name: "Classical Essentials",
    cover: "https://via.placeholder.com/300x300.png?text=Classical+Essentials",
  },
  {
    id: 7,
    name: "Classical Essentials",
    cover: "https://via.placeholder.com/300x300.png?text=Classical+Essentials",
  },
  // You can add more albums as needed
];

function HomePage() {
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [dailyTopHits, setDailyTopHits] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setPopularAlbums(mockAlbums);
    setDailyTopHits(mockAlbums);
    setNewReleases(mockAlbums);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: {
            xs: 200, 
            sm: 240, 
            md: 280, 
          },
          backgroundColor: '#f4f4f4',
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box 
          sx={{ 
            paddingTop:'1em', 
            paddingBottom: '1em',
            height: '20%', 
            width: '100%', 
            backgroundColor:'#f4f4f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #ccc'
          }}
        >
          <Typography variant="h6" align="center">
            Top Section
          </Typography>
        </Box>
          <Stack spacing={7} sx={{ width: '75vw' ,margin: "2rem 0rem 0 2rem" }}>
            {popularAlbums.length > 0 && (
              <Container header="Popular Albums">
                <AlbumSlider AlbumList={popularAlbums}/>
              </Container>
            )}
            {dailyTopHits.length > 0 && (
              <Container header="Daily Top Hits">
                <AlbumSlider AlbumList={dailyTopHits}/>
              </Container>
            )}
            {newReleases.length > 0 && (
              <Container header="New Releases">
                <AlbumSlider AlbumList={newReleases}/>
              </Container>
            )}
          </Stack>
      </Box>
    </Box>
  );
}

export default HomePage;
