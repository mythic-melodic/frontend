import React, { useState, useRef, useEffect } from 'react';
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdVolumeDown, MdVolumeUp, MdZoomOut, MdZoomOutMap, MdLibraryMusic, MdLibraryAdd, MdLoop, MdShuffle, MdVolumeMute, MdQueueMusic, MdReplay } from 'react-icons/md';
import { Box, duration } from '@mui/material';
const queueSong= [
    {
        id: 1,
        title: "Song 1",
        artist: "Artist 1",
        img: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/8/3/6/c/836cf31f036fb8f89b78cfd07cd77477.jpg",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        desc: "Description 1",
        duration: "372",
    },
    {
        id: 2,
        title: "Song 2",
        artist: "Artist 2",
        img: "https://hips.hearstapps.com/hmg-prod/images/eminem-a-k-a-marshall-bruce-mathers-iii-attends-a-ceremony-news-photo-1698936282.jpg?crop=1.00xw:0.667xh;0,0.0380xh&resize=640:*",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        desc: "Description 2",
        duration: "279",
    },
    {
        id: 3,
        title: "Song 3",
        artist: "Artist 3",
        img: "",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        desc: "Description 3",
        duration: "240",
    }
]

function MusicPlayer() {
    const [isPause, setIsPause] = useState(true);
    const [seekValue, setSeekValue] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const audioRef = useRef(null);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

   
    const togglePlayPause = () => {
        if (isPause) {
            audioRef.current.play().catch((error) => {
                console.log('Playback error:', error);
            }); // Play the audio
        } else {
            audioRef.current.pause(); // Pause the audio
        }
        setIsPause(!isPause);
    };
      const handleNext = () => {
        const nextSongIndex = (currentSongIndex + 1) % queueSong.length; // Loop back to the first song if at the end
        console.log("seekvalue", seekValue);
        console.log(currentSongIndex);
        setCurrentSongIndex(nextSongIndex);
        
        const nextSong = queueSong[nextSongIndex];
        audioRef.current.src = nextSong.file;
    
        // Add an event listener for loadedmetadata to ensure the duration is loaded
        audioRef.current.addEventListener('loadedmetadata', () => {
            //audioRef.current.play();
            setIsPause(true); // Ensure the play/pause state is updated
            setCurrentTime(0); // Reset the current time
            setSeekValue(0); // Reset the seek value
        }, { once: true }); // Use { once: true } to ensure the event listener is removed after it fires
    };
    const handlePrevious = () => {
        const previousSongIndex = (currentSongIndex - 1 + queueSong.length) % queueSong.length; // Loop back to the last song if at the beginning
        setCurrentSongIndex(previousSongIndex);
        const previousSong = queueSong[previousSongIndex];
        audioRef.current.src = previousSong.file;

         // Add an event listener for loadedmetadata to ensure the duration is loaded
        audioRef.current.addEventListener('loadedmetadata', () => {
            //audioRef.current.play();
            setIsPause(true); // Ensure the play/pause state is updated
            setCurrentTime(0); // Reset the current time
            setSeekValue(0); // Reset the seek value
        }, { once: true }); // Use { once: true } to ensure the event listener is removed after it fires
    };

    const handleSeekChange = (event) => {
        const newValue = event.target.value;
        setSeekValue(newValue);
        audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
    };

    const handleTimeUpdate = () => {
        const currentTimeTrack = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setSeekValue((currentTimeTrack / duration) * 100);
        setCurrentTime(currentTimeTrack);
    };
    const handleVolumeChange = (event) => {
        const newValue = event.target.value;
        setCurrentVolume(newValue);
        audioRef.current.volume = newValue / 100;
    }
    const handleReplay = () => {
        console.log(currentTime);
        if(currentTime >= queueSong[currentSongIndex].duration){
            audioRef.current.currentTime = 0;
            setIsPause(true);
        audioRef.current.pause();
        } else{
            audioRef.current.currentTime = currentTime;
        }

        
    }
    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', () => {
            console.log('Audio duration:', audio.duration);
        });
    
        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);
    
    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        
        <Box
            className="playBar"
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'lightgray',
                height: '80px',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex:'1000'
            }}
        >
            <audio ref={audioRef} src={queueSong[currentSongIndex].file} />

            
            {/* Song details */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px'}}>
                <img src={queueSong[currentSongIndex].img} alt="img" style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                }} />
                <Box>
                    <p style={{ margin: 0, fontSize: '20px' }}>{queueSong[currentSongIndex].title}</p>
                    <p style={{ margin: 0, fontSize: '10px' }}>{queueSong[currentSongIndex].artist}</p>
                </Box>
                <MdLibraryAdd size={20} />
            </Box>
            
            {/* Play, pause, and seek controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding:'25px 0px 5px 0px' }}>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <MdShuffle size={20} />
                    <MdSkipPrevious size={24} onClick={handlePrevious}/>
                    <div onClick={togglePlayPause}>
                    {isPause ? <MdPlayArrow size={24} /> : <MdPause size={24} />}
                    </div>
                    <MdSkipNext size={24} onClick={handleNext}/>
                    <div>
                    <MdReplay size={20} onClick={handleReplay}/>
                    </div>
                    
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', width:'500px' }}>
                    <p>{formatDuration(currentTime)}</p>
                    <input
                    type="range"
                    min="0"
                    max="100"
                    value={seekValue}
                    onChange={handleSeekChange}
                    style={{ width: '80%' }}
                    />
                    <p>{Math.floor(queueSong[currentSongIndex].duration/60) } : {queueSong[currentSongIndex].duration%60}</p>
                </Box>

            </Box>

                
            {/* Volume control */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                
                {currentVolume === 0 ? <MdVolumeMute size={20}/> : <MdVolumeUp size={20} />  }
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={handleVolumeChange}
                    style={{ width: '100px' }} />  
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MdQueueMusic size={20} />
                <MdZoomOutMap size={20} />
            </Box>
        </Box>
    );
}

export default MusicPlayer;