import React, { useEffect, useState } from "react";
import MerchandiseSlider from "../components/common/Slider";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import Container from "../components/common/Container";
import MerchandiseApi from "../api/modules/merchandise.api";
import { useSelector } from "react-redux";

function ShopPage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [artistStore, setArtistStore] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const userId = useSelector((state) => state.auth.user_id);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await MerchandiseApi.getNewArrivals();
        if (!response.data.message) {
          setNewArrivals(response.data);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    const fetchTrendingNow = async () => {
      try {
        const response = await MerchandiseApi.getTrendingNow();
        if (!response.data.message) {
          setTrendingNow(response.data);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    const fetchFavArtistStore = async () => {
      try {
        const response = await MerchandiseApi.getFavArtistStore(userId);
        if (!response.data.message) {
          setArtistStore(response.data);
          setArtistName(response.data[0].display_name);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
    fetchTrendingNow();
    fetchFavArtistStore();
  }, []);
  return (
    <Stack
      spacing={7}
      sx={{ width: "90vw", margin: "2rem auto", color: "#fff" }}
    >
      {newArrivals.length > 0 && (
        <Container color="black" header="New Arrivals">
          <MerchandiseSlider list={newArrivals} type={"merchandise"} />
        </Container>
      )}
      {trendingNow.length > 0 && (
        <Container color="black" header="Trending Now">
          <MerchandiseSlider list={trendingNow} type={"merchandise"} />
        </Container>
      )}
      {artistStore.length > 0 && (
        <Container color="black" header={`${artistName}'s store`}>
          <MerchandiseSlider list={artistStore} type={"merchandise"} />
        </Container>
      )}
    </Stack>
  );
}

export default ShopPage;
