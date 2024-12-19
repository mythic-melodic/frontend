import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextAvatar from "./TextAvatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const userId = useSelector((state) => state.auth.user_id);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    handleMenuClose();
    // Xử lý logout tại đây, ví dụ xóa token:
    navigate("/login"); // Điều hướng đến trang đăng nhập.
  };

  const navigateTo = (path) => {
    handleMenuClose();
    navigate(path);
  };
  return (
    <>
      {/* Nút mở menu */}
      <IconButton onClick={handleMenuOpen} size="medium" edge="end">
        <TextAvatar text={"U"} />
      </IconButton>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "black", // Màu nền cho menu
            backdropFilter: "blur(100px)",
            borderRadius: "0.5rem", // Bo tròn các góc
            color: "white", // Màu chữ
          },
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: "gray", // Màu nền khi hover
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        disableScrollLock
      >
        {/* Các mục trong menu */}
        <MenuItem onClick={() => navigateTo(`/profile/${userId}`)}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="medium" sx={{ color: "white" }} />
          </ListItemIcon>
          PROFILE
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigateTo(`/edit-profile/${userId}`)}>
          <ListItemIcon>
            <EditIcon fontSize="medium" sx={{ color: "white" }} />
          </ListItemIcon>
          EDIT PROFILE
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigateTo(`/update-password/${userId}`)}>
          <ListItemIcon>
            <VpnKeyIcon fontSize="medium" sx={{ color: "white" }} />
          </ListItemIcon>
          UPDATE PASSWORD
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="medium" sx={{ color: "red" }} />
          </ListItemIcon>
          LOG OUT
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
