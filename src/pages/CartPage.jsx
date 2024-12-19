import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartApi from "../api/modules/cart.api";
import DeleteIcon from "@mui/icons-material/Delete";
import createUrl from "../hooks/createUrl";
const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const userId = useSelector((state) => state.auth.user_id);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSm, setIsSm] = useState(windowWidth < 960);

  // Theo dõi kích thước màn hình và cập nhật isXs, isSm
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Cập nhật chiều rộng cửa sổ
      setIsSm(window.innerWidth < 960); // Kiểm tra và cập nhật trạng thái "small screen"
    };

    // Thêm sự kiện lắng nghe thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSm]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await CartApi.getCartById(userId);
        if (response) {
          setCart(response);
          // Loop through each item to check and update quantity if necessary
          for (const item of response) {
            if (item.quantity > item.stock) {
              // Update the quantity in the database
              await updateQuantity(item.merchandise_id, item.stock); // Ensure quantity is updated in the database

              // Update the local cart state as well
              setCart((prevCart) =>
                prevCart.map((prevItem) =>
                  prevItem.merchandise_id === item.merchandise_id
                    ? { ...prevItem, quantity: item.stock }
                    : prevItem
                )
              );
            }
          }
        } else {
          console.error("Failed to fetch merchandise:", response.message);
        }
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      }
    };

    fetchCart();
  }, [userId]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(cart.map((item) => item.merchandise_id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelection = (merchandise_id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(merchandise_id)
        ? prevSelected.filter((id) => id !== merchandise_id)
        : [...prevSelected, merchandise_id]
    );
  };
  const handletoShop = () => {
    navigate("/shop");
  };
  // Hàm xử lý thay đổi số lượng
  const updateQuantity = async (merchandise_id, newQuantity) => {
    try {
      const response = await CartApi.updateQuantity({
        userId: userId,
        merchandiseId: merchandise_id,
        quantity: newQuantity,
      });
      if (response.success) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.merchandise_id === merchandise_id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        console.error("Failed to update quantity:", response.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const removeItemFromCart = async (merchandise_id) => {
    try {
      const response = await CartApi.deleteItem(userId, merchandise_id);
      if (response.success) {
        // Cập nhật lại danh sách giỏ hàng sau khi xóa thành công
        setCart((prevCart) =>
          prevCart.filter((item) => item.merchandise_id !== merchandise_id)
        );
        setSelectedItems((prevSelected) =>
          prevSelected.filter((id) => id !== merchandise_id)
        );
      } else {
        console.error("Failed to delete item:", response.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => {
      return selectedItems.includes(item.merchandise_id)
        ? total + item.price * item.quantity
        : total;
    }, 0);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        paddingBottom: "5vh",
      }}
    >
      <Box sx={{ width: "90%", margin: "2% 5%" }}>
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
          Your Cart
        </Typography>

        {!isSm && cart.length !== 0 && (
          <Box
            sx={{
              padding: "1vw",
              backgroundColor: "white",
              marginBottom: "1vw",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControlLabel
              sx={{ width: "5%", marginLeft: "0", marginRight: "0" }}
              control={
                <Box
                  sx={{
                    width: "3vw",
                    height: "3vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    checked={selectedItems.length === cart.length}
                    onChange={handleSelectAll}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2vw", // Adjust the checkbox icon size within its container
                      },
                    }}
                  />
                </Box>
              }
            />

            <Box sx={{ width: "35%" }}>
              <Typography
                sx={{
                  fontWeight: "Medium",
                  fontSize: "1.25vw",
                  marginLeft: "0vw",
                }}
              >
                Product
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex -start",
              }}
            >
              <Typography
                sx={{ fontSize: "1.25vw", width: "25%", textAlign: "center" }}
              >
                Unit Price
              </Typography>
              <Typography
                sx={{ fontSize: "1.25vw", width: "35%", textAlign: "center" }}
              >
                Quantity
              </Typography>
              <Typography
                sx={{ fontSize: "1.25vw", width: "25%", textAlign: "center" }}
              >
                Total Price
              </Typography>
              <Typography
                sx={{ fontSize: "1.25vw", width: "15%", textAlign: "center" }}
              >
                Action
              </Typography>
            </Box>
          </Box>
        )}

        {cart.length === 0 ? (
          <>
            <Typography sx={{ fontWeight: "Bold", fontSize: "1vw" }}>
              Your cart is currently empty.
            </Typography>
            <Button
              onClick={() => {
                handletoShop();
              }}
              disableRipple
              sx={{
                width: "15%",
                minWidth: "0",
                height: "3vw",
                color: "black",
                "&:hover": {
                  color: "red",
                  backgroundColor: "transparent",
                  opacity: 1,
                },
                "&:focus": {
                  backgroundColor: "transparent",
                  opacity: 1,
                },
                "&:active": {
                  backgroundColor: "transparent",
                  opacity: 1,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1vw",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                GO SHOPPING NOW
              </Typography>
            </Button>
          </>
        ) : (
          cart.map((item, index) =>
            isSm ? (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "1vw",
                  marginBottom: "1vw",
                  borderRadius: "6px",
                  width: "100%",
                }}
              >
                <Box sx={{ width: "5%" }}>
                  <Box
                    sx={{
                      width: "3vw",
                      aspectRatio: 1 / 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      disableRipple
                      checked={selectedItems.includes(item.merchandise_id)}
                      onChange={() => handleItemSelection(item.merchandise_id)}
                      sx={{
                        marginLeft: "2vw",
                        "& .MuiSvgIcon-root": {
                          fontSize: "5vw",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Link
                  to={`/shop/merchandise/${item.merchandise_id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                    width: "35%",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <img
                      src={createUrl(item.image)}
                      alt={item.name}
                      style={{
                        width: "25vw",
                        aspectRatio: 1 / 1,
                        objectFit: "cover",
                        marginRight: "2vw",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "20vw",
                    width: "55%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "3.0vw" }}>
                      {item.name}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        removeItemFromCart(item.merchandise_id);
                      }}
                      disableRipple
                      sx={{
                        width: "15%",
                        minWidth: "0",
                        color: "gray",
                        "&:hover": {
                          color: "red",
                          backgroundColor: "transparent",
                          opacity: 1,
                        },
                        "&:focus": {
                          backgroundColor: "transparent",
                          opacity: 1,
                        },
                        "&:active": {
                          backgroundColor: "transparent",
                          opacity: 1,
                        },
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          width: "4vw",
                          aspectRatio: 1 / 1,
                        }}
                      />
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "3vw",
                        width: "25%",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity * item.price}$
                    </Typography>

                    <Box
                      display="flex"
                      alignItems="center"
                      marginLeft="2vw"
                      border="0.1vw gray solid"
                      sx={{
                        width: { md: "10vw", xs: "20vw" },
                        height: { md: "2vw", xs: "4vw" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "30%",
                          borderRight: "0.1vw gray solid",
                        }}
                      >
                        <IconButton
                          disableRipple
                          disabled={item.quantity < 2}
                          onClick={() => {
                            updateQuantity(
                              item.merchandise_id,
                              item.quantity - 1
                            );
                          }}
                          sx={{
                            "& :hover": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:focus": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:active": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                          }}
                        >
                          <RemoveIcon
                            sx={{
                              width: {
                                xs: "20px",
                                sm: "23px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                              height: {
                                xs: "20px",
                                sm: "23px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                            }}
                          ></RemoveIcon>
                        </IconButton>
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: {
                            md: "1.25vw",
                            xs: "2.5vw",
                          },
                          width: "40%",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          width: "30%",
                          borderLeft: "0.1vw gray solid",
                        }}
                      >
                        <IconButton
                          disableRipple
                          disabled={item.quantity > item.stock - 1}
                          onClick={() => {
                            updateQuantity(
                              item.merchandise_id,
                              item.quantity + 1
                            );
                          }}
                          sx={{
                            "& :hover": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:focus": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:active": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                          }}
                        >
                          <AddIcon
                            sx={{
                              width: {
                                xs: "20px",
                                sm: "23px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                              height: {
                                xs: "20px",
                                sm: "23px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                            }}
                          ></AddIcon>
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "1vw",
                  marginBottom: "1vw",
                  borderRadius: "6px",
                  width: "100%",
                }}
              >
                <Box sx={{ width: "5%" }}>
                  <Box
                    sx={{
                      width: "3vw",
                      height: "3vw",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.merchandise_id)}
                      onChange={() => handleItemSelection(item.merchandise_id)}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: "2vw", // Adjust the checkbox icon size within its container
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ width: "35%" }}>
                  <Link
                    to={`/shop/merchandise/${item.merchandise_id}`}
                    style={{
                      display: "flex", // Duy trì bố cục ngang
                      alignItems: "center",
                      textDecoration: "none", // Xóa gạch chân mặc định
                      color: "inherit", // Giữ màu sắc hiện tại
                      width: "100%", // Đảm bảo link bao phủ toàn bộ nội dung
                    }}
                  >
                    <img
                      src={createUrl(item.image)}
                      alt={item.name}
                      style={{
                        width: "8vw",
                        height: "8vw",
                        objectFit: "cover",
                        marginRight: "2vw",
                        borderRadius: "6px",
                      }}
                    />
                    <Typography sx={{ fontSize: "1.5vw" }}>
                      {item.name}
                    </Typography>
                  </Link>
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "gray",
                      fontSize: "1vw",
                      width: "25%",
                      textAlign: "center",
                    }}
                  >
                    {item.price} $
                  </Typography>

                  <Box
                    sx={{
                      width: "35%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      border="0.1vw gray solid"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "2vw",
                          width: "3vw",
                          borderRight: "0.1vw gray solid",
                        }}
                      >
                        <IconButton
                          disableRipple
                          disabled={item.quantity < 2}
                          onClick={() => {
                            updateQuantity(
                              item.merchandise_id,
                              item.quantity - 1
                            );
                          }}
                          sx={{
                            "& :hover": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:focus": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:active": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                          }}
                        >
                          <RemoveIcon
                            sx={{
                              width: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                              height: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                            }}
                          ></RemoveIcon>
                        </IconButton>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "1vw",
                          fontWeight: "bold",
                          width: "4vw",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "2vw",
                          width: "3vw",
                          borderLeft: "0.1vw gray solid",
                        }}
                      >
                        <IconButton
                          disableRipple
                          disabled={item.quantity > item.stock - 1}
                          onClick={() => {
                            updateQuantity(
                              item.merchandise_id,
                              item.quantity + 1
                            );
                          }}
                          sx={{
                            "& :hover": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:focus": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                            "&:active": {
                              backgroundColor: "transparent",
                              opacity: 1,
                            },
                          }}
                        >
                          <AddIcon
                            sx={{
                              width: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                              height: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px",
                                lg: "25px",
                                xl: "30px",
                              },
                            }}
                          ></AddIcon>
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  <Typography
                    sx={{ fontSize: "1vw", width: "25%", textAlign: "center" }}
                  >
                    {item.quantity * item.price}$
                  </Typography>

                  <Button
                    onClick={() => {
                      removeItemFromCart(item.merchandise_id);
                    }}
                    disableRipple
                    sx={{
                      width: "15%",
                      minWidth: "0",
                      height: "3vw",
                      color: "black",
                      "&:hover": {
                        color: "red",
                        backgroundColor: "transparent",
                        opacity: 1,
                      },
                      "&:focus": {
                        backgroundColor: "transparent",
                        opacity: 1,
                      },
                      "&:active": {
                        backgroundColor: "transparent",
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "1vw", textTransform: "capitalize" }}
                    >
                      Delete
                    </Typography>
                  </Button>
                </Box>
              </Box>
            )
          )
        )}
        <Box
          sx={{
            height: "6vw",
          }}
        />

        {cart.length > 0 && (
          <Box
            sx={{
              padding: "1vw 1vw 1vw 0",
              backgroundColor: "white",
              marginBottom: "0vw",
              display: "flex",
              alignItems: "center",
              width: "91%",
              position: "fixed",
              zIndex: "1000",
              bottom: "0",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              sx={{
                width: "5%",
                marginLeft: "1vw",
                marginRight: "0",
              }}
              control={
                <Box
                  sx={{
                    width: "3vw",
                    height: "3vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    checked={selectedItems.length === cart.length}
                    onChange={handleSelectAll}
                    sx={{
                      marginLeft: { xs: "2vw", md: "0" },
                      "& .MuiSvgIcon-root": {
                        fontSize: { md: "2vw", xs: "5vw" }, // Adjust the checkbox icon size within its container
                      },
                    }}
                  />
                </Box>
              }
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: "1.5vw", xs: "5vw", sm: "3vw" },
                  fontWeight: "Bold",
                  margin: "3vw",
                }}
              >
                Total: {calculateTotal()} $
              </Typography>
              <Button
                onClick={() =>
                  navigate("/shop/checkout", {
                    state: {
                      selectedProducts: cart.filter((item) =>
                        selectedItems.includes(item.merchandise_id)
                      ),
                      total: calculateTotal(),
                      fromCart: true,
                    },
                  })
                }
                sx={{
                  backgroundColor: "#d0011b",
                  height: { md: "5vw", xs: "8vw" },
                  color: "white",
                  fontSize: { md: "1.1vw", xs: "3vw" },
                  padding: { md: "1vw 2vw", xs: "3vw" },
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                Check Out
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
