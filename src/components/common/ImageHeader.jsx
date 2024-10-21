import { Box, useTheme } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";

const ImageHeader = ({ imgPath, height }) => {
    const theme = useTheme();

    return (
        <Box sx={{
            height: height || { xs: "50vh", sm: "40vh", md: "40vh" }, // Default heights if height prop is not provided
            zIndex: "-1",
            position: "relative",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundImage: `url(${imgPath})`,
            backgroundAttachment: "fixed",
            "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                ...uiConfigs.style.gradientBgImage[theme.palette.mode]
            }
        }} />
    );
};

export default ImageHeader;