import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumCard from "./AlbumCard/AlbumCard.jsx";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";

const AlbumSlider = ({ AlbumList}) => {
  return (
    <Box style={{ maxWidth: "100%" }}>
      <Swiper
        spaceBetween={1}
        slidesPerView={7}
        slidesPerGroup={7}
        grabCursor={true}
        direction="horizontal"
        observer={true}
      >
        {AlbumList.map((album) => (
          <SwiperSlide key={album.id}>
            <AlbumCard album={album}  />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AlbumSlider;
