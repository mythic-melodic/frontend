import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
const drawerWidth = 240;
import accountApi from "../api/modules/account.api";
import ManageOrder from "../components/OrderManager/ManageOrders";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";


function OrderManagerDashboard() {
    const user_id = useSelector((state) => state.auth.user_id);
    const [user, setUser] = useState([]);

    const navigate = useNavigate();
    const handleNavigate = (path, item) => {
      navigate(path);
      setSelectedItem(item);
    }
    const fetchUsers = async () => {
      try {
        const res = await accountApi.getUserById(user_id);
        if (res && res.length > 0) {
          setUser(res[0]);
          console.log("Users found:", res[0]);
        } else {
          console.error("No users found");
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    useEffect(() => {
      fetchUsers();
      navigate("/order_manage");
    }, []);
    return (
      <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", height: "100vh" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f1f1f1",
              borderRight: "1px solid #e0e0e0",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            <Avatar
              src="https://images.squarespace-cdn.com/content/v1/5911f44b9de4bb1465b0417a/1517949216805-IX2GVKMUU3KIUTZU6C8Z/image-asset.jpeg"
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{user.display_name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.user_role}</Typography>
          </Box>
          <Divider />
        </Drawer>
  
        <Box component="main" sx={{ flexGrow: 1 }} >
        <ManageOrder/>
        </Box>
      </Box>
    );
}

export default OrderManagerDashboard;
