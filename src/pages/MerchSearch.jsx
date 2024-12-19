import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import CardGrid from "../components/common/CardGrid";
import MerchandiseApi from "../api/modules/merchandise.api";
function MerchSearch() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  useEffect(() => {
    // Kiểm tra nếu có searchQuery
    if (searchQuery) {
      const fetchData = async () => {
        try {
          // Gọi API để lấy kết quả tìm kiếm
          const response = await MerchandiseApi.getBySearch(searchQuery);

          // Kiểm tra nếu API trả về dữ liệu hợp lệ
          if (response && response.data) {
            setSearchResults(response.data); // Cập nhật kết quả tìm kiếm
          } else {
            setSearchResults([]); // Nếu không có kết quả, trả về mảng rỗng
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]); // Nếu có lỗi, trả về mảng rỗng
        }
      };

      fetchData();
    }
  }, [searchQuery]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20); // Hiển thị thêm 20 sản phẩm
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
      <Box sx={{ paddingTop: "2em", marginLeft: "2vw" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "4vw",
              sm: "3vw",
              md: "2vw",
            },
          }}
          gutterBottom
        >
          Search Results for: "{searchQuery}"
        </Typography>
      </Box>
      {searchResults.length > 0 ? (
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
          {/* Hiển thị các sản phẩm với số lượng đã giới hạn */}
          <CardGrid List={searchResults.slice(0, visibleCount)} />
          {/* Hiển thị nút "Load More" nếu còn sản phẩm chưa được hiển thị */}
          {visibleCount < searchResults.length && (
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
        <Box sx={{ fontWeight: "bold", fontSize: "1.5vw", marginLeft: "2vw" }}>
          No result found
        </Box>
      )}
    </Box>
  );
}

export default MerchSearch;
