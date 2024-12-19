import Grid from "@mui/material/Grid2";
import MerchandiseCard from "./MerchandiseCard";
import CollectionCard from "./CollectionCard";
import ArtistCard from "./ArtistCard";  // Assuming you have an ArtistCard component

const CardGrid = ({ List, Type = "albums" }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "left",
        alignItems: "flex-start",
      }}
      columns={{ md: 4, xs: 2 }}
    >
      {List.map((child, index) => (
        <Grid key={index} size={1}>
          {Type === "Albums" ? (
            <CollectionCard type={'Album'} collection={child} />
          ) : Type === "Artists" ? (
            <ArtistCard artist={child} />
          ) : (
            <MerchandiseCard merchandise={child} hoverEffect={"scale"} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
