import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontRoundedIcon from "@mui/icons-material/Storefront";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import TextAvatar from "../common/TextAvatar";
import { useSelector, useDispatch } from "react-redux";
function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user_name = useSelector((state) => state.auth.display_name);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSticky, setIsSticky] = React.useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/shop/merch-search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleToCart = () => {
    navigate("/shop/cart");
  };

  const handleToShop = () => {
    navigate("/shop");
  };

  const handToHome = () => {
    navigate("/");
  };

  const handleToOrderHistory = () => {
    navigate("/shop/order-history");
  };
  React.useEffect(() => {
    if (location.pathname !== "/shop/merch-search") {
      setSearchTerm("");
    }
  }, [location]);
  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 85;
      if (window.scrollY > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        color: "black",
        padding: "1em",
        borderBottom: "0.1vw gray solid",
        position: isSticky ? "sticky" : "relative", // Chỉ sticky khi vượt ngưỡng
        top: isSticky ? 0 : "unset",
        zIndex: isSticky ? 1000 : "auto",
        transition: "0.3s ease-in-out", // Hiệu ứng mượt
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: {
            xs: "50%",
            md: "60%",
          },
        }}
      >
        <IconButton sx={{ color: "black" }} onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          sx={{
            width: "90%",
            backgroundColor: "#f0f0f0",
            borderRadius: "6px",
            "& .MuiOutlinedInput-root": {
              border: "none",
            },
            color: "black",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "black" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box width="10%"></Box>
      <Box
        sx={{ width: "30%", display: "flex", justifyContent: "space-evenly" }}
      >
        <IconButton
          sx={{ color: "#000000", display: "flex" }}
          onClick={handToHome}
        >
          <MusicVideoIcon
            sx={{
              width: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
              height: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
            }}
          />
        </IconButton>
        <IconButton sx={{ color: "#000000" }} onClick={handleToShop}>
          <StorefrontRoundedIcon
            sx={{
              width: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
              height: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
            }}
          />
        </IconButton>
        <IconButton sx={{ color: "#000000" }} onClick={handleToCart}>
          <ShoppingCartIcon
            sx={{
              width: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
              height: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
            }}
          />
        </IconButton>
        <IconButton sx={{ color: "#000000" }} onClick={handleToOrderHistory}>
          <MenuIcon
            sx={{
              width: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
              height: {
                xs: "23px",
                sm: "23px",
                md: "25px",
                lg: "30px",
                xl: "35px",
              },
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            color: "#000000",
          }}
        >
          <TextAvatar text={user_name} />
        </IconButton>
      </Box>
      <Box width={"3%"}></Box>
    </Box>
  );
}

export default TopBar;
