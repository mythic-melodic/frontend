import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumCard from "./AlbumCard.jsx";
import CollectionCard from "./CollectionCard.jsx";
import MerchandiseCard from "./MerchandiseCard.jsx";
import ArtistCard from "./ArtistCard.jsx";
import { Box } from "@mui/material";
import "swiper/swiper-bundle.css";

const Slider = ({ list, type }) => {
  const [slidesConfig, setSlidesConfig] = useState({
    slidesPerView: 6,
    slidesPerGroup: 6,
  });

  const updateSlidesConfig = () => {
    if (type === "Artist") {
      if (window.innerWidth >= 1320) {
        setSlidesConfig({ slidesPerView: 8, slidesPerGroup: 8 });
      } else if (window.innerWidth >= 960) {
        setSlidesConfig({ slidesPerView: 7, slidesPerGroup: 7 });
      } else if (window.innerWidth >= 600) {
        setSlidesConfig({ slidesPerView: 5, slidesPerGroup: 5 });
      } else {
        setSlidesConfig({ slidesPerView: 3, slidesPerGroup: 3 });
      }
    } else {
      if (window.innerWidth >= 960) {
        setSlidesConfig({ slidesPerView: 6, slidesPerGroup: 6 });
      } else if (window.innerWidth >= 600) {
        setSlidesConfig({ slidesPerView: 4, slidesPerGroup: 4 });
      } else {
        setSlidesConfig({ slidesPerView: 2, slidesPerGroup: 2 });
      }
    }
  };

  useEffect(() => {
    updateSlidesConfig();
    window.addEventListener("resize", updateSlidesConfig);
    return () => window.removeEventListener("resize", updateSlidesConfig);
  }, []);

  return (
    <Box style={{ maxWidth: "1150px", width: "100%", margin: "0 auto", overflow: "hidden" }}>
      <Swiper
        spaceBetween={1}
        slidesPerView={slidesConfig.slidesPerView}
        slidesPerGroup={slidesConfig.slidesPerGroup}
        grabCursor={true}
        direction="horizontal"
        observer={true}
      >
        {list?.map((item) => (
          <SwiperSlide key={item.id}>
            {type === "Album" ? (
              <CollectionCard collection={item} type={"Album"} />
            ) : type === "Artist" ? (
              <ArtistCard artist={item} />
            ) : (
              <MerchandiseCard merchandise={item} hoverEffect={"blur"} />
            )}
          </SwiperSlide>
        ))}

      </Swiper>
    </Box>
  );
};

export default Slider;