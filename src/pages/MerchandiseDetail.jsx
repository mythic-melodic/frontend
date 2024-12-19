import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MerchandiseApi from "../api/modules/merchandise.api";
import CartApi from "../api/modules/cart.api";
import createUrl from "../hooks/createUrl";
import { useSelector } from "react-redux";
import { ToastContainer, toast, Slide,Zoom  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MerchandiseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [sold, setSold] = useState(null);
  const [count, setCount] = useState(1);
  const userId = useSelector((state) => state.auth.user_id);
  const handleFetchImage = (link) => {
    return createUrl(link);
  };
  useEffect(() => {
    // Simulate fetching product data by ID
    const fetchProduct = async () => {
      try {
        const response = await MerchandiseApi.getMerchandiseDetailById(id);
        if (response) {
          setProduct(response);
        } else {
          console.error("Failed to fetch merchandise:", response.message);
        }
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      }
    };

    const fetchTotalSold = async () => {
      try {
        const response = await MerchandiseApi.getMerchandiseTotalSoldById(id);
        if (response) {
          setSold(response);
        } else {
          console.error("Failed to fetch :", response.message);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchProduct();
    fetchTotalSold();
  }, [id]);

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Hàm xử lý tăng giá trị
  const increase = () => {
    if (count < product.stock) setCount(count + 1);
  };

  const handleAddToCart = async () => {
    const cartItem = {
      userId: userId,
      merchandiseId: product.id,
      quantity: count,
    };
    try {
      const response = await CartApi.addToCart(cartItem);
      if (response.success) {
        toast.success("Item has been added to shopping cart");
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An unexpected error occurred while adding to cart.");
    }
  };

  const handleBuyNow = () => {
    const orderData = {
      selectedProducts: [{ ...product, quantity: count }],
      total: count * product.price,
      fromtCart: false
    };
    navigate("/shop/checkout", { state: orderData });
  };
  const handleShop = (id) => {
    navigate(`/shop/artist/${id}`);
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return product.id ? (
    <Box
      sx={{ width: "100%", backgroundColor: "#f5f5f5", paddingBottom: "5vh" }}
    >
      <Box
        sx={{
          display: "flex",
          width: "90%",
          margin: "1% 5%",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          alignItems: { md: "stretch", sm: "center", xs: "center" },
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: {
              md: "45%",
              xs: "100%",
            },
            height: {
              md: "50vw",
              xs: "100vw",
            },
            backgroundColor: "white",
            display: "flex",
            alignItems: {
              md: "flex-start",
              xs: "center",
            },
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={createUrl(product.image)}
            alt={product.name}
            sx={{
              marginTop: "1.3vw",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              width: { md: "60vw", sm: "80vw", xs: "90vw" },
              aspectRatio: 1 / 1,
            }}
          />
        </Box>
        <Box
          sx={{
            width: {
              md: "60%",
              xs: "100%",
            },
            backgroundColor: "#white",
            color: "black",
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                md: "1.75vw",
                sm: "4vw",
                xs: "5vw",
              },
              fontWeight: "bold",
              marginBottom: "0.5em",
              marginLeft: { xs: "2vw", md: 0 },
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ color: "black", width: { xs: "100%" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",

                gap: "1em",
                marginLeft: "2vw",
              }}
            >
              <Typography
                sx={{
                  color: "black",
                  fontSize: {
                    md: "3vw",
                    xs: "5vw",
                  },
                  fontWeight: "bold",
                }}
              >
                ${product.price}
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: {
                    md: "1.2vw",
                    xs: "3vw",
                  },
                }}
              >
                Sold: {sold}
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "2vw", marginTop: "1.5vw", width: "90%" }}>
              <Typography
                sx={{
                  fontSize: { md: "1.5vw", xs: "3vw" },
                  color: "gray",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                }}
              >
                {product.description}
              </Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "2vw",
                marginTop: "8vw",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: "1.5vw", xs: "3vw" },
                  fontWeight: "Bold",
                }}
              >
                Related Album:
              </Typography>
              <Link
                to={`/album/${product.album_id}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                <Box
                  component="img"
                  src={handleFetchImage(product.album_cover)}
                  alt={product.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginLeft: "2vw",
                    width: { md: "5vw", xs: " 10vw" },
                    aspectRatio: 1 / 1,
                    border: "0.1vw gray solid",
                  }}
                />
              </Link>
            </Box>
            <Box
              sx={{
                marginTop: { md: "3vw", xs: "6vw" },
                marginBottom: "4vw",
                marginLeft: "2vw",
                display: "flex",
                height: "3vw",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { md: "1.5vw", xs: "3vw" },
                  fontWeight: "Bold",
                }}
              >
                Quantity:
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
                    onClick={decrease}
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
                  {count}
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
                    onClick={increase}
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
              <Box marginLeft={{ xs: "2vw", md: "1vw" }}>
                {" "}
                {product.stock} pieces available
              </Box>
            </Box>
            <Box
              sx={{
                position: {
                  xs: "relative",
                },
                marginTop: {
                  md: "0",
                  xs: "8vw",
                },
                display: "flex",
                alignItems: "center",
                flexDirection: {
                  md: "row",
                  xs: "column",
                },
                width: {
                  md: "28vw",
                  xs: "100%",
                },
              }}
            >
              <Button
                onClick={handleAddToCart}
                sx={{
                  margin: "2vw",
                  padding: {
                    md: "0",
                    sm: "3vw",
                    xs: "4vw",
                  },
                  backgroundColor: "#e6d8d9",
                  minWidth: "0",
                  color: "#d0011b",
                  fontSize: "0.9vw",
                  width: {
                    md: "13vw",
                    xs: "90%",
                  },
                  height: "4vw",
                  border: "0.1vw #d0011b solid",
                  "&:hover": {
                    backgroundColor: "rgba(230,216,217, 0.9)",
                  },
                }}
              >
                <AddShoppingCartIcon
                  sx={{
                    marginRight: "0.75vw",
                    width: {
                      md: "1.5vw",
                      xs: "3vw",
                    },
                    height: {
                      md: "1.5vw",
                      xs: "3vw",
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      md: "1vw",
                      xs: "2vw",
                    },
                  }}
                >
                  {" "}
                  ADD TO CART
                </Typography>
              </Button>
              <Button
                onClick={handleBuyNow}
                sx={{
                  backgroundColor: "#d0011b",
                  padding: {
                    md: "0",
                    sm: "3vw",
                    xs: "4vw",
                  },
                  width: {
                    md: "13vw",
                    xs: "90%",
                  },
                  minWidth: "0",
                  color: "white",
                  fontSize: "0.9vw",
                  height: "4vw",
                  "&:hover": {
                    backgroundColor: "rgba(208,1,27, 0.9)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      md: "1vw",
                      xs: "2vw",
                    },
                  }}
                >
                  {" "}
                  BUY NOW{" "}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {product.artist_name && (
        <Box
          sx={{
            backgroundColor: "white",
            width: "90%",
            margin: "2% 5% -1% 5%",
            paddingBottom: { xs: "5%" },
            display: "flex",
          }}
        >
          <Link
            to={`/shop/artist/${product.artist_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={createUrl(product.artist_avatar)}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                border: "0.1vw gray solid",
                width: {
                  md: "7vw",
                  xs: "13vw",
                },
                height: {
                  md: "7vw",
                  xs: "13vw",
                },
                marginLeft: "2vw",
                marginTop: "2vw",
              }}
            />
          </Link>

          <Box sx={{ margin: "2vw 2vw 0vw 2vw", color: "black" }}>
            <Typography
              sx={{
                fontSize: {
                  md: "2vw",
                  sm: "3vw",
                  xs: "4vw",
                },
              }}
            >
              {product.artist_name}'s Store
            </Typography>
            <Button
              disableRipple
              sx={{
                width: {
                  md: "12vw",
                  sm: "16vw",
                  xs: "20vw",
                },
                minWidth: "0",
                height: {
                  md: "2.5vw",
                  xs: "5vw",
                },
                border: "0.12vw gray solid",
                marginTop: "2vw",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 1,
                },
                "&:focus": {
                  color: "black",
                  backgroundColor: "transparent",
                  opacity: 1,
                },
                "&:active": {
                  color: "black",
                  backgroundColor: "transparent",
                  opacity: 1,
                },
              }}
              onClick={() => handleShop(product.artist_id)}
            >
              <RemoveRedEyeIcon
                sx={{
                  marginRight: "0.75vw",
                  width: {
                    md: "1.5vw",
                    xs: "3vw",
                  },
                  aspectRatio: 1 / 1,
                  color: "black",
                }}
              />{" "}
              <Typography
                sx={{
                  fontWeight: "medium",
                  fontSize: {
                    md: "1vw",
                    sm: "1.5vw",
                    xs: "2vw",
                  },
                  color: "black",
                }}
              >
                VIEW SHOP
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
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
  ) : (
    <Typography
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        fontSize: {
          md: "2vw",
          xs: "4vw",
        },
      }}
    >
      No product available
    </Typography>
  );
};

export default MerchandiseDetail;
