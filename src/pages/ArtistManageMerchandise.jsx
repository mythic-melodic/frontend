import React, { useState, useEffect } from "react";
import MerchandiseItem from "../components/common/MerchandiseItem";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MerchandiseApi from "../api/modules/merchandise.api";
import { useSelector } from "react-redux";

const StackHeader = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: "0.5rem",
        backgroundColor: "lightgray",
        display: "flex",
        borderRadius: "0",
        borderBottom: "1px solid #ffffff",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Typography fontWeight="bold" flexBasis="40rem">
        Product
      </Typography>
      <Box display="flex" flexGrow={1} textAlign="center">
        <Typography fontWeight="bold" width="5rem">
          Price
        </Typography>
        <Typography fontWeight="bold" width="5rem">
          Stock
        </Typography>
        <Typography fontWeight="bold" width="5rem">
          Total Sold
        </Typography>
      </Box>
    </Paper>
  );
};

const ArtistManageMerchandise = () => {
  const user_id = useSelector((state) => state.auth.user_id);

  const [merchandiseList, setMerchandiseList] = useState([]);
  const [sort, setSort] = useState("newest");

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const handleDeleteMerchandise = (deletedId) => {
    setMerchandiseList((prev) => prev.filter((item) => item.id !== deletedId));
  };

  useEffect(() => {
    const fetchMerchandiseList = async () => {
      try {
        const response = await MerchandiseApi.getAllMerchandiseByArtistId(
          user_id,
          sort
        );
        setMerchandiseList(response || []);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      }
    };
    fetchMerchandiseList();
  }, [user_id, sort]);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Merchandise
      </Typography>

      <Box display="flex" justifyContent="end" alignItems="center" gap={2}>
        {/* Sort By */}
        <Box display="flex" alignItems="center">
          <Typography variant="body1">Sort By:</Typography>
          <Select
            value={sort}
            onChange={handleSortChange}
            size="small"
            variant="standard"
            sx={{ marginLeft: 1, minWidth: 120 }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popularityAscending">Sales Ascending</MenuItem>
            <MenuItem value="popularityDescending">Sales Descending</MenuItem>
            <MenuItem value="priceAscending">Price Ascending</MenuItem>
            <MenuItem value="priceDescending">Price Descending</MenuItem>
            <MenuItem value="stockAscending">Stock Ascending</MenuItem>
            <MenuItem value="stockDescending">Stock Descending</MenuItem>
          </Select>
        </Box>
      </Box>

      <Stack>
        <StackHeader />
        {merchandiseList.map((merchandise) => (
          <MerchandiseItem
            key={merchandise.id}
            merchandise={merchandise}
            onDelete={handleDeleteMerchandise}
          />
        ))}
      </Stack>
      <Stack spacing={2} alignSelf="center">
        <Pagination count={10} />
      </Stack>
    </Box>
  );
};

export default ArtistManageMerchandise;
