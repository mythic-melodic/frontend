import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { setBalance } from "../redux/store";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderApi from "../api/modules/order.api";
import AccountApi from "../api/modules/account.api";
import CartApi from "../api/modules/cart.api"
import MerchandiseApi from "../api/modules/merchandise.api"
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createUrl from "../hooks/createUrl";
const CheckOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProducts, total, fromCart  } = location.state || {
    selectedProducts: [],
    total: 0,
    fromCart: false,
  };

  const { user_id, display_name, phone, address, balance } = useSelector(
    (state) => state.auth
  );

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [name, setName] = useState(display_name || "");
  const [phoneNumber, setPhone] = useState(phone || "");
  const [userAddress, setAddress] = useState(address || "");
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const totalCost = total + (deliveryMethod === "express" ? 10 : 5);
      if (totalCost > balance) {
        toast.error("Insufficient balance to complete the purchase.");
        return;
      }

      // Proceed with order placement if balance is sufficient
      const order = {
        user_id,
        deliveryMethod,
        name,
        phone : phoneNumber,
        address: userAddress,
        total: totalCost,
      };

      const createdOrder = await OrderApi.createOrderByUserId(order);

      // Lặp qua từng sản phẩm trong selectedProducts và thêm vào đơn hàng
      await Promise.all(
        selectedProducts.map(async (product) => {
          const productDetails = {
            order_id: createdOrder.data.id, // Lấy order_id trực tiếp từ createdOrder
            id: product.id, // ID của sản phẩm
            quantity: product.quantity, // Số lượng sản phẩm
            price: product.price, // Giá mỗi sản phẩm
          };

          // Gọi API để thêm sản phẩm vào đơn hàng
          await OrderApi.addToOrderMerchandise(productDetails);
          await MerchandiseApi.updateStock(product.id, product.quantity)
          if (fromCart) {
            await CartApi.deleteItem(user_id, product.id)
          }
        })
      );
      const newBalance = balance - totalCost;
      const balanceUpdateResult = await AccountApi.updateBalance(user_id, {
        new_balance: newBalance,
      });
      if (balanceUpdateResult.success) {
        // Update balance in Redux
        dispatch(setBalance(newBalance));
        toast.success("Order placed successfully!");
        setTimeout(() => {
          navigate("/shop", { replace: true });
        }, 3000);
      } else {
        toast.error("Failed to update balance.");
      }
      // Sau khi thêm tất cả sản phẩm vào đơn hàng, cập nhật trạng thái
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place the order. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ width: "90%", margin: "2% 5%" }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
            fontWeight: "Bold",
            fontSize: { md: "3vw", xs: "4vw" },
          }}
        >
          Checkout
        </Typography>

        {selectedProducts.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "2vw",
              fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
            }}
          >
            No items selected for checkout.
          </Typography>
        ) : (
          <Box>
            {/* User Information Section */}
            <Box sx={{ marginBottom: "2vw" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                }}
              >
                Delivery Information
              </Typography>
              {isEditingInfo ? (
                <Box
                  backgroundColor={"white"}
                  padding={{ md: "1vw", xs: "3vw" }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    value={userAddress}
                    onChange={(e) => setAddress(e.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                    sx={{
                      fontSize: { xs: "2vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <Button
                    onClick={() => setIsEditingInfo(false)}
                    sx={{
                      marginTop: { md: "1vw", xs: "2vw" },
                      backgroundColor: "#d0011b",
                      paddingRight: { md: "3vw", xs: "5vw" },
                      paddingLeft: { md: "3vw", xs: "5vw" },
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(208,1,27, 0.9)",
                      },
                      fontSize: { xs: "2vw", sm: "1.5vw", md: "1.1vw" }, // Cập nhật font-size cho responsive
                    }}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Box
                  backgroundColor={"white"}
                  padding={{ md: "1vw", xs: "3vw" }}
                >
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Name:</strong> {name}
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Phone:</strong> {phoneNumber}
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "0.5vw",
                      fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                    }}
                  >
                    <strong>Address:</strong> {userAddress}
                  </Typography>
                  <Button
                    onClick={() => setIsEditingInfo(true)}
                    sx={{
                      marginTop: { md: "1vw", xs: "2vw" },
                      backgroundColor: "#d0011b",
                      paddingRight: { md: "3vw", xs: "5vw" },
                      paddingLeft: { md: "3vw", xs: "5vw" },
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(208,1,27, 0.9)",
                      },
                      fontSize: { xs: "2vw", sm: "1.5vw", md: "1.1vw" },
                    }}
                  >
                    Change
                  </Button>
                </Box>
              )}
            </Box>

            {/* Product Review Section */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                fontSize: { xs: "3.5vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
              }}
            >
              Product Ordered
            </Typography>
            <Box sx={{ marginBottom: "2vw" }}>
              {selectedProducts.map((merchandise, index) => (
                <Link
                  key={index}
                  to={`/shop/merchandise/${
                    merchandise.id || merchandise.merchandise_id
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      padding: { md: "1vw", xs: "3vw" },
                      marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                      borderRadius: "6px",
                    }}
                  >
                    <Box
                      component="img"
                      src={createUrl(merchandise.image)}
                      alt={merchandise.name}
                      sx={{
                        width: { md: "15vw", sm: "22.5vw", xs: " 30vw" },
                        height: { md: "15vw", sm: "22.5vw", xs: "30vw" },
                        objectFit: "cover",
                        marginRight: "2vw",
                        borderRadius: "6px",
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.5vw" },
                          fontWeight: "bold",
                        }}
                      >
                        {merchandise.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "3.5vw", sm: "2.5vw", md: "1.5vw" },
                          color: "gray",
                        }}
                      >
                        {merchandise.quantity} x {merchandise.price}$ ={" "}
                        {merchandise.quantity * merchandise.price}$
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>

            {/* Delivery Method Section */}
            <Box sx={{ marginBottom: "2vw" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: { md: "1vw", sm: "2vw", xs: "3vw" },
                  fontSize: { xs: "3.5vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                }}
              >
                Delivery Method
              </Typography>
              <Box backgroundColor={"white"} padding={{ md: "1vw", xs: "3vw" }}>
                <RadioGroup
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard Delivery (5$)"
                    sx={{
                      fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                  <FormControlLabel
                    value="express"
                    control={<Radio />}
                    label="Express Delivery (10$)"
                    sx={{
                      fontSize: { xs: "4vw", sm: "3vw", md: "2vw" }, // Cập nhật font-size cho responsive
                    }}
                  />
                </RadioGroup>
              </Box>
            </Box>

            {/* Total and Place Order Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                padding: { md: "2vw", xs: "3vw" },
                borderRadius: "6px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "4vw", sm: "3vw", md: "2vw" },
                }}
              >
                Total: {total + (deliveryMethod === "express" ? 10 : 5)}$
              </Typography>

              <Typography
                sx={{
                  color: "gray",

                  fontSize: { xs: "3.5vw", sm: "3vw", md: "1.5vw" },
                }}
              >
                Your balance: {balance}$
              </Typography>

              <Button
                onClick={handlePlaceOrder}
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
                Place Order
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        transition={Slide}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
      />{" "}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        transition={Slide}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
      />
    </Box>
  );
};

export default CheckOutPage;
