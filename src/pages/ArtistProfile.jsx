import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import ImageHeader from "../components/common/ImageHeader";
import AlbumSlider from "../components/common/AlbumSlider";
import Container from "../components/common/Container";
import { MdPlayCircle } from "react-icons/md";
const artistData = [
    {
        id: 1,
        name: "Eminem",
        imgPath: "https://wallpapers.com/images/hd/eminem-the-best-rapper-086skjct0fxtuy9h.jpg",
        description: "Marshall Bruce Mathers III, known professionally as Eminem, is an American rapper, songwriter, and record producer. Eminem is among the best-selling music artists of all time, with estimated worldwide sales of over 220 million records.",
        birthDate: "October 17, 1972",
        birthPlace: "St. Joseph, Missouri, U.S.",
        genres: ["Hip hop", "rap"],
        awards: ["15 Grammy Awards", "17 Billboard Music Awards", "1 Academy Award"],
        topSongs: ["Lose Yourself", "Love the Way You Lie", "Stan", "The Real Slim Shady"],
    },
]
const SongData = [
  
    {
        id: 2,
        title: "Song 2",
        artist: "Artist 2",
        img: "https://hips.hearstapps.com/hmg-prod/images/eminem-a-k-a-marshall-bruce-mathers-iii-attends-a-ceremony-news-photo-1698936282.jpg?crop=1.00xw:0.667xh;0,0.0380xh&resize=640:*",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        desc: "Description 2",
        duration: "279",
    },
]
const topSongs = [
    { title: 'Title 1', releaseDate: 'Release date 1' },
    { title: 'Title 2', releaseDate: 'Release date 2' },
    { title: 'Title 3', releaseDate: 'Release date 3' },
    { title: 'Title 4', releaseDate: 'Release date 4' },
    { title: 'Title 5', releaseDate: 'Release date 5' },
    { title: 'Title 6', releaseDate: 'Release date 6' },
    { title: 'Title 7', releaseDate: 'Release date 7' },
    { title: 'Title 8', releaseDate: 'Release date 8' },
    { title: 'Title 9', releaseDate: 'Release date 9' },
    { title: 'Title 10', releaseDate: 'Release date 10' },
];
const listAlbums = [
    {
        id: 1,
        name: "Greatest Hits",
        cover: "https://product.hstatic.net/1000304920/product/queen-greatest-hits-we-will-rock-you-remastered_c2ca3108dd234d658cd24939f444efd0_master.jpg",
    },
    {
        id: 2,
        name: "Summer Vibes",
        artist: "long",
        cover: "https://cdns-images.dzcdn.net/images/cover/7bde1f16fe812d12a11e8388fc1c779d/0x1900-000000-80-0-0.jpg",
    },
    {
        id: 3,
        name: "Acoustic Sessions",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQymVcwi8MHcqdPBvoZIvUBzuvGG5OLCR2pwg&s",
    },
]

function ArtistDashboard() {
    const firstArtist = artistData[0];
    return (
        <div>
        {/* backdrops */}
        <Box sx={{ position: 'relative' }}>
            <ImageHeader imgPath={firstArtist.imgPath} />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            >   
                <Box sx={{ position: 'absolute',padding: '10px', width: '100%' , bottom: '0'}}>
                    <Box sx={{  display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MdPlayCircle size={"40px"}  color = '#d60017' />
                        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                            {firstArtist.name}
                        </Typography>
                    </Box>
                    <Typography variant="h8" sx={{ paddingLeft: '10px' }}>79,123,456 Monthly listeners</Typography>
                </Box>
            </Box>
        </Box>

        {/* Lastest release and top hit */}
        <Box sx={{ 
            display: 'flex',
            height: '250px',
            marginBottom: '30px',
        }}>
            {/* Lastest release */}
            <Box sx ={{
                width: '40%',
            }}>
                
                <Typography variant="h5" sx={{ fontWeight: 'bold', padding: '10px' }}>Lastest release</Typography>
                <Box sx={{ display: 'flex', gap: '10px', padding: '10px' }}>
                    <Box sx={{ width: '200px', height: '200px', backgroundColor: 'gray' }}>
                        <img src={SongData[0].img} alt=""style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Title</Typography>
                        <Typography variant="h8">Release date</Typography>
                        <Typography variant="h8">Description</Typography>
                    </Box>
                </Box>
            </Box>
            {/* Top song */}
            <Box sx ={{
                width: '60%',
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', padding: '10px' }}>Top song</Typography>
                {/* Contents */}
                <Box sx ={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                }}>
                    {/* list 01 */}
                    <Box sx ={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                    }}>
                        {topSongs.map((song, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: '10px', padding: '10px' }}>
                                <Box sx={{ width: '50px', height: '50px', backgroundColor: 'gray' }}></Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{song.title}</Typography>
                                    <Typography variant="h8">{song.releaseDate}</Typography>
                                </Box>
                            </Box>
                        ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* Album */}
            <Box>
                {listAlbums.length > 0 && (
                <Container header="Popular Albums">
                    <AlbumSlider AlbumList={listAlbums}/>
                </Container>
                )}       
            </Box>
            {/* Description */}
            <Box sx={{ padding: '10px' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Description</Typography>
                <Typography variant="h8">{firstArtist.description}</Typography>
            </Box>
        </div>
        );

    
}
export default ArtistDashboard;