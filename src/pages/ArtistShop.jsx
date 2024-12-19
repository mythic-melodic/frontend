import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Tabs, Tab, Button } from "@mui/material";
import CardGrid from "../components/common/CardGrid";
import { useParams } from "react-router-dom";
import MerchandiseApi from "../api/modules/merchandise.api";
import ArtistApi from "../api/modules/account.api";
import createUrl from "../hooks/createUrl";
const ArtistShop = () => {
  const [artist, setArtist] = useState(null);
  const [merchandises, setMerchandises] = useState([]);
  const [filteredMerchandises, setFilteredMerchandises] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const artist = await ArtistApi.getUserById(id);
        setArtist(artist[0]);
        const allMerchandise = await MerchandiseApi.getAllMerByArtistID(id);
        if (allMerchandise.success) {
          setMerchandises(allMerchandise.data);
          setFilteredMerchandises(allMerchandise.data);
        }

        const topSelling = await MerchandiseApi.getTopSellingByArtistId(id);
        if (topSelling.success) {
          setBestSellers(topSelling.data);
        }
      } catch (error) {
        console.error("Error fetching merchandise data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setFilterStatus(newValue);

    let filtered = [];
    switch (newValue) {
      case "All":
        filtered = merchandises; // Hiển thị tất cả merchandise
        break;
      case "Best Sellers":
        filtered = bestSellers; // Hiển thị best sellers
        break;
      case "Apparel":
        filtered = merchandises.filter((item) => item.category === "apparel");
        break;
      case "Albums":
        filtered = merchandises.filter(
          (item) => item.category === "physical album"
        );
        break;
      case "Others":
        filtered = merchandises.filter((item) => item.category === "other");
        break;
      default:
        filtered = merchandises;
    }

    setFilteredMerchandises(filtered);
    setVisibleCount(8);
  };
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase count to show more items
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        paddingBottom: "5vh",
      }}
    >
      {/* Artist Info */}
      {artist && (
        <Box
          sx={{
            width: "85%",
            margin: "2% 5%",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Avatar
            src={createUrl(artist.avatar)}
            alt={artist.display_name}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {artist.display_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              The Official store
            </Typography>
          </Box>
        </Box>
      )}

      {/* Tabs */}
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1vw" }}
      >
        <Tabs
          value={filterStatus}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: {
              xs: "95%",
              md: "90%",
            },
            margin: "2% 5%",
            "& .MuiTabs-indicator": {
              backgroundColor: "#e75565",
            },
          }}
        >
          <Tab
            label="All"
            value="All"
            disableRipple
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              textTransform: "none",
              color: "#000",
              "&.Mui-selected": {
                color: "#e75565",
              },
            }}
          />
          <Tab
            label="Best Sellers"
            value="Best Sellers"
            disableRipple
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              textTransform: "none",
              color: "#000",
              "&.Mui-selected": {
                color: "#e75565",
              },
            }}
          />
          <Tab
            label="Albums"
            value="Albums"
            disableRipple
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              textTransform: "none",
              color: "#000",
              "&.Mui-selected": {
                color: "#e75565",
              },
            }}
          />
          <Tab
            label="Apparel"
            value="Apparel"
            disableRipple
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              textTransform: "none",
              color: "#000",
              "&.Mui-selected": {
                color: "#e75565",
              },
            }}
          />
          <Tab
            label="Others"
            value="Others"
            disableRipple
            sx={{
              flex: 1,
              textAlign: "center",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              textTransform: "none",
              color: "#000",
              "&.Mui-selected": {
                color: "#e75565",
              },
            }}
          />
        </Tabs>
      </Box>
      {/* Merchandise List */}
      {filteredMerchandises.length > 0 ? (
        <Box
          sx={{
            width: "90%",
            margin: "2% 5%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardGrid List={filteredMerchandises.slice(0, visibleCount)} />
          {visibleCount < filteredMerchandises.length && (
            <Button
              variant="contained"
              onClick={loadMore}
              sx={{
                backgroundColor: "#e75565",
                color: "#fff",
                padding: "0.5rem 2rem",
                marginTop: "1rem",
                "&:hover": {
                  backgroundColor: "#d04757",
                },
              }}
            >
              Load More
            </Button>
          )}
        </Box>
      ) : (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
            fontSize: {
              md: "2vw",
              xs: "4vw",
            },
          }}
        >
          No merchandise found
        </Typography>
      )}
    </Box>
  );
};

export default ArtistShop;
