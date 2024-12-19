import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import OrderApi from "../../api/modules/order.api";
import createUrl from "../../hooks/createUrl";
import AccountApi from "../../api/modules/account.api";
import Merchandise from "../../api/modules/merchandise.api";
const OrderManageDetail = () => {
  const [orderData, setOrderData] = useState(null);
  const { id } = useParams();

  const total = orderData
    ? orderData.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      )
    : 0;

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await OrderApi.getOrderDetail(id);
        if (response.success) {
          setOrderData(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrderDetail();
  }, [id]);
  // Hàm xử lý chuyển đổi trạng thái khi nhấn nút
  const handleNextStatus = async () => {
    try {
      let newStatus = "";
      let buttonLabel = "";

      if (orderData[0].status.toLowerCase() === "to ship") {
        newStatus = "shipping";
        buttonLabel = "Mark as Shipping";
      } else if (orderData[0].status.toLowerCase() === "shipping") {
        newStatus = "to receive";
        buttonLabel = "Mark as ready to receive";
      } else if (orderData[0].status.toLowerCase() === "to receive") {
        newStatus = "completed";
        buttonLabel = "Confirm Delivery";
      }

      // Cập nhật trạng thái đơn hàng
      const response = await OrderApi.updateStatus(id, newStatus);
      if (response.success) {
        setOrderData((prev) => {
          const updatedOrder = prev.map((item) => ({
            ...item,
            status: newStatus,
          }));
          return updatedOrder;
        });

        if (newStatus === "completed") {
          for (const product of orderData) {
            if (product.artist_id) {
              const artistId = product.artist_id;
              const amountToAdd = product.quantity * product.price_each;
              const balanceResponse = await AccountApi.addToBalance(artistId, {
                amount: amountToAdd,
              });

              if (!balanceResponse.success) {
                console.error(
                  `Failed to update balance for artist ID: ${artistId}`
                );
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Box
      sx={{ padding: "2vw", backgroundColor: "#f5f5f5", borderRadius: "8px" }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "1vw",
          fontWeight: "Bold",
          fontSize: { md: "3vw", xs: "4vw" },
        }}
      >
        Order Detail
      </Typography>
      {orderData ? (
        <Box>
          {/* Customer Information */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2vw",
              borderRadius: "8px",
              marginBottom: "2vw",
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: "1vw", fontWeight: "bold" }}
            >
              Customer Information
            </Typography>
            <Typography>Name: {orderData[0].user_name}</Typography>
            <Typography>Phone: {orderData[0].phone}</Typography>
            <Typography>Address: {orderData[0].address}</Typography>
            <Typography>
              Order Date:{" "}
              {new Date(orderData[0].order_date).toLocaleDateString()}
            </Typography>
          </Box>
          {/* Order Status */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2vw",
              borderRadius: "8px",
              marginBottom: "2vw",
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: "1vw", fontWeight: "bold" }}
            >
              Order Status
            </Typography>
            <Typography>Status: {orderData[0].status}</Typography>
            <Typography>Payment Status: Paid</Typography>
          </Box>

          {/* Product List */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2vw",
              borderRadius: "8px",
              marginBottom: "2vw",
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: "1vw", fontWeight: "bold" }}
            >
              Products Ordered
            </Typography>
            {orderData.map((product, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  marginBottom: "1vw",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "1vw",
                }}
              >
                <img
                  src={createUrl(product.image)}
                  alt={product.name}
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
                    sx={{ fontSize: { xs: "3.5vw", sm: "2vw", md: "1.3vw" } }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    color="gray"
                    sx={{ fontSize: { xs: "3vw", sm: "2vw", md: "1vw" } }}
                  >
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography
                    color="gray"
                    sx={{ fontSize: { xs: "3vw", sm: "2vw", md: "1vw" } }}
                  >
                    Price per item: {product.price} $
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginTop: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "2vw", md: "1.3vw" },
                    }}
                  >
                    Total: {product.price * product.quantity} $
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Order Summary */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: "2vw",
              borderRadius: "8px",
              textAlign: "right",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "1vw" }}
            >
              Order Summary
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total Amount: {total} $
            </Typography>
          </Box>

          {/* Action Button */}
          <Box sx={{ textAlign: "center", marginTop: "2vw" }}>
            {orderData[0].status.toLowerCase() === "to ship" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStatus}
                sx={{
                  backgroundColor: "#d0011b",
                  color: "white",
                  fontSize: { xs: "3vw", sm: "2vw", md: "1.3vw" },
                  paddingRight: { md: "3vw", xs: "5vw" },
                  paddingLeft: { md: "3vw", xs: "5vw" },
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                Mark as Shipping
              </Button>
            )}

            {orderData[0].status.toLowerCase() === "shipping" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextStatus}
                sx={{
                  backgroundColor: "#d0011b",
                  color: "white",
                  fontSize: { xs: "3vw", sm: "2vw", md: "1.3vw" },
                  paddingRight: { md: "3vw", xs: "5vw" },
                  paddingLeft: { md: "3vw", xs: "5vw" },
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                Mark as ready ro receive
              </Button>
            )}

            {orderData[0].status.toLowerCase() === "to receive" && (
              <Button
                variant="contained"
                onClick={handleNextStatus}
                sx={{
                  backgroundColor: "#d0011b",
                  color: "white",
                  fontSize: { xs: "3vw", sm: "2vw", md: "1.3vw" },
                  paddingRight: { md: "3vw", xs: "5vw" },
                  paddingLeft: { md: "3vw", xs: "5vw" },
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                Confirm Delivery
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Typography>No order data available.</Typography>
      )}
    </Box>
  );
};

export default OrderManageDetail;
