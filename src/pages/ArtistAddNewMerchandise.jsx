import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MerchandiseCard from "../components/common/MerchandiseCard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ArtistAddNewMerchandise = () => {
  const [merchandise, setMerchandise] = useState({
    name: "",
    category: "",
    price: "",
    quantityInStock: "",
    description: "",
    image:
      "https://shop.thenbhd.com/cdn/shop/products/TheNBHD_ILoveYouD2C_1024x1024@2x.png?v=1681914792",
    relatedAlbum: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMerchandise((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add API call to add new merchandise
    console.log(merchandise);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Add new merchandise
      </Typography>
      <Box display="flex" flexflow="row wrap">
        <Grid
          component="form"
          onSubmit={handleSubmit}
          flex="1 1 50%"
          container
          columns={2}
          p={2}
          columnSpacing={2}
          rowSpacing={1}
          mr={5}
          sx={{ "& .MuiFormLabel-root": { color: "black" } }}
        >
          {/* {Merchandise Form} */}
          <Grid size={2}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel component="h2" variant="h2">
                Merchandise Name
              </FormLabel>
              <OutlinedInput
                name="name"
                value={merchandise.name}
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl fullWidth required>
              <FormLabel>Category</FormLabel>
              <Select
                id="category"
                name="category"
                onChange={handleChange}
                value={merchandise.category ?? ""}
              >
                <MenuItem value="Digital Album">Digital Album</MenuItem>
                <MenuItem value="Physical Album">Physical Album</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl fullWidth required>
              <FormLabel>Related Album</FormLabel>
              <Select
                id="relatedAlbum"
                name="relatedAlbum"
                onChange={handleChange}
                value={merchandise.relatedAlbum ?? ""}
              >
                <MenuItem value="Chip Chrome">Chip Chrome</MenuItem>
                <MenuItem value="Sweater Weather">Sweater Weather</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 1 }}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel>Price</FormLabel>
              <OutlinedInput
                name="price"
                type="number"
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 2, sm: 2, md: 1 }}>
            <FormControl variant="filled" fullWidth required>
              <FormLabel>Quantity In Stock</FormLabel>
              <OutlinedInput
                name="quantityInStock"
                type="number"
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl variant="filled" fullWidth>
              <FormLabel>Description</FormLabel>
              <OutlinedInput
                value={merchandise.description ?? ""}
                name="description"
                multiline
                minRows={4}
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={2}>
            <FormControl variant="filled" fullWidth>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ backgroundColor: "#564c4d" }}
              >
                Upload image
              </Button>
            </FormControl>
          </Grid>
          <Grid size={2} variant="filled">
            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              gap={2}
            >
              <FormControl fullWidth>
                <Button type="submit" variant="contained">
                  Publish
                </Button>
              </FormControl>
              <FormControl fullWidth>
                <Button type="reset" variant="outlined">
                  Cancel
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Box
          flex="1 1 50%"
          display={{ xs: "none", sm: "none", md: "flex" }}
          alignItems="center"
          flexDirection="column"
          p={4}
        >
          {/* {Preview} */}
          <Typography variant="h4" component="h2" alignSelf="start">
            Preview
          </Typography>
          <Typography component="p" alignSelf="start">
            This is how your merchandise appears in Artist Shop.
          </Typography>
          <MerchandiseCard merchandise={merchandise} />
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistAddNewMerchandise;
