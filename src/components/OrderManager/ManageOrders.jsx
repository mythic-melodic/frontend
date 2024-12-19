import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Tabs, Tab, Divider } from "@mui/material";
import OrderApi from "../../api/modules/order.api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import createUrl from "../../hooks/createUrl";
const ManageOrder = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
  const [Orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const userId = useSelector((state) => state.auth.user_id);
  const groupOrders = (orders) => {
    return orders.reduce((acc, order) => {
      // Find the order group with the same order_id
      const existingOrder = acc.find((o) => o.order_id === order.order_id);
      // If the order already exists, add the merchandise to the existing order
      if (existingOrder) {
        existingOrder.merchandises.push({
          merchandise_id: order.merchandise_id,
          quantity: order.quantity,
          price_each: order.price_each,
          name: order.name,
          artist_id: order.artist_id,
          stock: order.stock,
          album_id: order.album_id,
          price: order.price,
          description: order.description,
          image: order.image,
          created_at: order.created_at,
          category: order.category,
        });
      } else {
        // If the order doesn't exist, create a new group for this order
        acc.push({
          order_id: order.order_id,
          status: order.status,
          merchandises: [
            {
              merchandise_id: order.merchandise_id,
              quantity: order.quantity,
              price_each: order.price_each,
              name: order.name,
              artist_id: order.artist_id,
              stock: order.stock,
              album_id: order.album_id,
              price: order.price,
              description: order.description,
              image: order.image,
              created_at: order.created_at,
              category: order.category,
            },
          ],
        });
      }
      return acc;
    }, []);
  };
  // Fetch orders when the component is mounted or when the userId changes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderApi.getAllOrder();
        if (response.success) {
          const groupedOrders = groupOrders(response.data);
          setOrders(groupedOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // If there's an error, set empty array
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setFilterStatus(newValue);
  };

  useEffect(() => {
    if (Orders) {
      setFilteredOrders(
        filterStatus === "All"
          ? Orders
          : Orders.filter(
              (order) =>
                order.status.toLowerCase() === filterStatus.toLowerCase()
            )
      );
    }
  }, [Orders, filterStatus]);
  // Xử lý khi nhấn nút "Buy Again"
  const handleBuyAgain = (order) => {
    const orderData = {
      selectedProducts: order.merchandises,
      total: order.merchandises.reduce(
        (total, merchandise) =>
          total + merchandise.price * merchandise.quantity,
        0
      ),
    };
    navigate("/shop/checkout", { state: orderData });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        paddingBottom: "5vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: "90%", margin: "2% 5%" }}>
        {/* tabs */}
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
              width: "100%",
              "& .MuiTabs-indicator": {
                backgroundColor: "#e75565", // Đổi màu dấu gạch chân thành đỏ
              },
            }}
          >
            <Tab
              label="All"
              value="All"
              disableRipple
              sx={{
                width: "20%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="To Ship"
              value="To Ship"
              disableRipple
              sx={{
                width: "20%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="To Receive"
              value="To Receive"
              disableRipple
              sx={{
                width: "20%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="Completed"
              value="Completed"
              disableRipple
              sx={{
                width: "20%",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                textTransform: "none",
                color: "#000",
                "&.Mui-selected": {
                  color: "#e75565",
                },
              }}
            />
            <Tab
              label="Cancelled"
              value="Cancelled"
              disableRipple
              sx={{
                width: "20%",
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

        {/* Danh sách đơn hàng */}
        <Box position={"relative"}>
          {filteredOrders.map((order, index) => {
            const orderTotal = order.merchandises.reduce(
              (total, merchandise) =>
                total + merchandise.price * merchandise.quantity,
              0
            );
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  padding: "1vw",
                  marginBottom: "1vw",
                  borderRadius: "6px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "2.7vw", sm: "2vw", md: "1.3vw" },
                    marginBottom: "1vw",
                    position: "absolute",
                    right: 20,
                    textTransform: "uppercase",
                    color: "#e75565",
                  }}
                >
                  {order.status}
                </Typography>

                <Link
                  key={order.order_id}
                  to={`/order_manage/order/${order.order_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {order.merchandises.map((merchandise, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1vw",
                      }}
                    >
                      <Link
                        to={`/shop/merchandise/${merchandise.merchandise_id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "1vw",
                        }}
                      >
                        <img
                          src={createUrl(merchandise.image)}
                          alt={merchandise.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            marginRight: "1vw",
                            borderRadius: "6px",
                          }}
                        />

                        <Box>
                          <Typography
                            sx={{
                              fontSize: { xs: "3.5vw", sm: "2vw", md: "1.2vw" },
                            }}
                          >
                            {merchandise.name}{" "}
                            <Typography
                              component="span"
                              sx={{ fontSize: "0.9em", color: "gray" }}
                            >
                              x{merchandise.quantity}
                            </Typography>
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: "3vw", sm: "1.8vw", md: "1vw" },
                              color: "gray",
                            }}
                          >
                            {merchandise.price * merchandise.quantity} $
                          </Typography>
                        </Box>
                      </Link>
                    </Box>
                  ))}
                </Link>
                <Divider sx={{ margin: "1vw 0" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "3vw", sm: "2vw", md: "1.2vw" },
                      color: "#000",
                      marginRight: "3vw",
                    }}
                  >
                    Order Total: {orderTotal} $
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {filteredOrders.length === 0 && (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "3.5vw", sm: "2vw", md: "1.2vw" },
              color: "gray",
            }}
          >
            No orders found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManageOrder;
