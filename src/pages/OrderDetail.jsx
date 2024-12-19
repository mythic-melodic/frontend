import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import OrderApi from "../api/modules/order.api";
import createUrl from "../hooks/createUrl";
const OrderDetail = () => {
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
  return (
    <Box
      sx={{ padding: "2vw", backgroundColor: "#f5f5f5", borderRadius: "8px" }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "1vw",
          fontWeight: "Bold",
          fontSize: {
            md: "3vw",
            xs: "4vw",
          },
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

          {/* Shipping Information */}
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
              Shipping Information
            </Typography>
            <Typography>
              Shipping Method: {orderData[0].delivery_method}
            </Typography>
            <Typography>
              Estimated Delivery:{" "}
              {(() => {
                const orderDate = new Date(orderData[0]?.order_date);
                const deliveryMethod =
                  orderData[0]?.delivery_method?.toLowerCase();
                let deliveryDate = new Date(orderDate);

                if (deliveryMethod === "standard") {
                  deliveryDate.setDate(orderDate.getDate() + 10);
                } else if (deliveryMethod === "express") {
                  deliveryDate.setDate(orderDate.getDate() + 5);
                }

                const currentDate = new Date();
                const daysLeft = Math.ceil(
                  (deliveryDate - currentDate) / (1000 * 60 * 60 * 24)
                );
                if (orderData[0].status.toLowerCase() === "cancelled") {
                  return "Cancelled";
                }

                if (daysLeft > 0) {
                  return `${daysLeft} days remaining`;
                } else if (
                  daysLeft < 0 &&
                  orderData[0].status.toLowerCase() === "completed"
                ) {
                  return "Delivered";
                } else {
                  return "Delivery expected today";
                }
              })()}
            </Typography>

            <Typography>
              Tracking Number: {orderData[0].trackingNumber || "N/A"}
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
                <Link
                  to={`/shop/merchandise/${product.merchandise_id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1vw",
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
                </Link>
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
        </Box>
      ) : (
        <Typography>No order data available.</Typography>
      )}
    </Box>
  );
};

export default OrderDetail;
