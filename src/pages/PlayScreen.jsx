import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Box, Typography, IconButton, Slider, Icon } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Vibrant from "node-vibrant";
import {
  FastRewindRounded,
  FavoriteBorderOutlined,
  PauseCircleRounded,
} from "@mui/icons-material";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAudioPlayer from "../hooks/useAudioPlayer";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import SongCardMenu from "../components/common/SongCardMenu";


const lyrics = `
Intro: Jung Kook
'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight

Verse 1: Jung Kook
Shoes on, get up in the morn'
Cup of milk, let's rock and roll
King Kong, kick the drum
Rolling on like a Rolling Stone
Sing-song when I'm walkin' home
Jump up to the top, LeBron
Ding-dong, call me on my phone
Ice tea and a game of ping pong

Pre-Chorus: RM, j-hope
This is gettin' heavy, can you hear the bass boom? I'm ready (Woo-hoo)
Life is sweet as honey, yeah, this beat cha-ching like money, huh
Disco overload, I'm into that, I'm good to go
I'm diamond, you know I glow up
Hey, so let's go

Chorus: Jung Kook, Jimin
'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight (Hey)
Shinin' through the city with a little funk and soul
So I'ma light it up like dynamite, woah-oh-oh

Verse 2: V,  V & Jin, RM
Bring a friend, join the crowd, whoever wanna come along
Word up, talk the talk, just move like we off the wall
Day or night, the sky's alight, so we dance to the break of dawn (Hey)
Ladies and gentlemen, I got the medicine, so you should keep ya eyes on the ball (Huh)

Pre-Chorus: SUGA, Jimin, RM
This is gettin' heavy, can you hear the bass boom? I'm ready (Woo-hoo)
Life is sweet as honey, yeah, this beat cha-ching like money, huh
Disco overload, I'm into that, I'm good to go
I'm diamond, you know I glow up
Let's go

Chorus: Jung Kook, V
'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight (Hey)
Shinin' through the city with a little funk and soul
So I'ma light it up like dynamite, woah-oh-oh

Post-Chorus: Jung Kook & Jimin, Jung Kook, Jin
Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite
Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite
Shinin' through the city with a little funk and soul
So I'ma light it up like dynamite, woah-oh-oh

Bridge: Jung Kook, Jimin, Jin,  V
Dyn-na-na-na, na-na, na-na, ayy
Dyn-na-na-na, na-na, na-na, ayy
Dyn-na-na-na, na-na, na-na, ayy
Light it up like dynamite
Dyn-na-na-na, na-na, na-na, ayy
Dyn-na-na-na, na-na, na-na, ayy
Dyn-na-na-na, na-na, na-na, ayy
Light it up like dynamite

Chorus: Jimin, Jung Kook, Jin
'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight
Shinin' through the city with a little funk and soul
So I'ma light it up like dynamite
(This is ah) 'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight (Alight, oh)
Shinin' through the city with a little funk and soul
So I'ma light (Light) it (It) up (Up) like (Like) dynamite (Dynamite), woah-oh-oh

Post-Chorus: Jimin, Jin, V
Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite (Life is dynamite)
Dyn-na-na-na, na-na-na-na-na, na-na-na, life is dynamite (Oh)
Shinin' through the city with a little funk and soul
So I'ma light it up like dynamite, woah-oh-oh`
  .trim()
  .split("\n");

const theme = createTheme();

const PlayScreen = ({
  onClose,
  audioPlayerProps,
  queueSong,
}) => {

  const [showLyrics, setShowLyrics] = useState(false);
  const [gradient, setGradient] = useState(
    "linear-gradient(45deg, #000000, #333333)"
  );
  const imageRef = useRef(null);

  const isWindowSizeLarge = useMediaQuery(theme.breakpoints.up("md"));

  const {
    isPause,
        seekValue,
        currentTime,
        currentVolume,
        audioRef,
        togglePlayPause,
        handleSeekChange,
        handleVolumeChange,
        formatDuration,
        currentSongIndex,
        handleNext,
        handlePrevious,
        handleReplay,
  } = audioPlayerProps;

  // Function to extract colors and create gradient
  const extractColors = async () => {
    const imgSrc = imageRef.current.src;
    try {
      const vibrant = new Vibrant(imgSrc);
      const palette = await vibrant.getPalette();

      // Check if colors exist before accessing
      const vibrantColor = palette.Vibrant ? palette.Vibrant.rgb : [0, 0, 0];
      const mutedColor = palette.Muted ? palette.Muted.rgb : [50, 50, 50];

      setGradient(
        `linear-gradient(90deg, rgb(${vibrantColor.join(
          ","
        )}), rgb(${mutedColor.join(",")}))`
      );
    } catch (error) {
      console.error("Error extracting colors:", error);
    }
  };

  // Extract colors once the image loads
  useEffect(() => {
    const img = imageRef.current;
    console.log(img);
    if (img.complete) {
      extractColors();
    } else {
      img.addEventListener("load", extractColors);
    }
    return () => {
      if (img) {
        img.removeEventListener("load", extractColors);
      }
    };
  }, [currentSongIndex]);
  const toggleLyrics = () => {
    setShowLyrics((prev) => !prev);
  };
  // console.log("Seek Value in Play Screen:", seekValue);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: gradient,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.5s ease",
        }}
      >
        {/* Close Icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "white",
            fontSize: "100px",
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Box
          sx={{
            width: isWindowSizeLarge && showLyrics ? "33%" : 500,
            borderRadius: "16px",
            padding: "none",
            marginRight: isWindowSizeLarge && showLyrics ? 80 : 0,
            transition: "margin-right 1s ease",
          }}
        >
          {/* Image */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 2 }}>
            <img
              ref={imageRef}
              src={queueSong[currentSongIndex].img ? queueSong[currentSongIndex].img : "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/8/3/6/c/836cf31f036fb8f89b78cfd07cd77477.jpg"}
              alt="Song cover"
              style={{
                width: "100%",
                borderRadius: "16px",
              }}
            />
          </Box>
          {/* <audio ref={audioRef} src={queueSong[currentSongIndex].file} /> */}
          {/* Song Info */}
          <Box sx={{ display: "flex", mb: 2 }}>
            <Box>
              {/* Song Info */}
              <Typography
                variant="h5"
                color="white"
                textAlign="left"
                sx={{
                  fontWeight: 600,
                  fontFamily: "Arial",
                  fontSize: "18px",
                  letterSpacing: "0px",
                }}
              >
                {queueSong[currentSongIndex].title}
              </Typography>
              <Typography
                variant="h5"
                color="#a5bfd2"
                textAlign="left"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  fontFamily: "Arial",
                  fontSize: "18px",
                  letterSpacing: "0px",
                }}
              >
                {queueSong[currentSongIndex].artist}
              </Typography>
            </Box>
            {/* Action Buttons */}
            <Box
              sx={{
                ml: "auto",
                display: "flex",
              }}
            >
              {/* <IconButton>
                <FavoriteBorderOutlined
                  sx={{ color: "white" }}
                ></FavoriteBorderOutlined>
              </IconButton> */}
              <IconButton>
                <SongCardMenu songId={queueSong[currentSongIndex].id} />
              </IconButton>
            </Box>
          </Box>

          <Slider
            aria-label="time-indicator"
            size="15px"
            value={isNaN(seekValue) ? 0 : seekValue}
            onChange={handleSeekChange}
            sx={{
              color: "#a5bfd2",
              height: 5,
              "& .MuiSlider-thumb": { display: "none" },
            }}
          />

          {/* Time*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#a5bfd2",
              fontSize: "0.85rem",
              mt: -1,
              fontFamily: "Arial",
            }}
          >
            <span>{formatDuration(currentTime)}</span>
            <span>
              {Math.floor(queueSong[currentSongIndex].duration / 60)} :{" "}
              {queueSong[currentSongIndex].duration % 60}
            </span>
          </Box>

          {/* Playback Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 0.5,
            }}
          >
            <IconButton onClick={handlePrevious}>
              <FastRewindRounded sx={{ color: "white", fontSize: 50 }} />
            </IconButton>
            <IconButton sx={{ mx: 2 }} onClick={togglePlayPause}>
              {isPause ? (
                <PlayArrowRoundedIcon sx={{ color: "white", fontSize: 50 }} />
              ) : (
                <PauseCircleRounded sx={{ color: "white", fontSize: 50 }} />
              )}
            </IconButton>
            <IconButton onClick={handleNext}>
              <FastForwardRoundedIcon
                sx={{ color: "white", fontSize: 50 }}
              ></FastForwardRoundedIcon>
            </IconButton>
          </Box>
        </Box>
        {/* Lyrics Display */}
        {showLyrics && isWindowSizeLarge && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              bottom: 8,
              right: 100,
              padding: 2,
              borderRadius: 2,
              overflowY: "scroll",
              maxWidth: "35%",
              opacity: 1,
              transition: "opacity 0.5s ease",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {lyrics.map((line, index) => (
              <Typography
                key={index}
                fontSize={35}
                fontWeight="bold"
                color="white"
                sx={{
                  textShadow: "2px 2px 4px rgba(128, 128, 128, 0.7)", // Đổ bóng màu đen nhẹ

                  mb: 1,
                }}
              >
                {line}
              </Typography>
            ))}
          </Box>
        )}
        {/* Lyrics Icon */}
        {isWindowSizeLarge && (
          <IconButton
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              color: "white",
              fontSize: "100px",
            }}
            onClick={toggleLyrics}
          >
            <LyricsRoundedIcon />
          </IconButton>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default PlayScreen;
